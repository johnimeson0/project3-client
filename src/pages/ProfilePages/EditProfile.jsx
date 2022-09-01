    import {useState, useEffect} from 'react';
    import axios from 'axios';
    import {useParams, useNavigate} from 'react-router-dom';
    //useNavigate is needed to redirect once editing is done
function EditProfile(){
    
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [favoriteCar, setFavoriteCar] = useState('')
    const [fileUrl, setFileUrl] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleFileUpload = (e) => {
        setLoading(true);
      
        const uploadData = new FormData();
      
        uploadData.append("fileUrl", e.target.files[0]);
      
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
          .then((response) => {
            console.log(response.data.fileUrl)
          
            setLoading(false);
          
              setImgUrl(response.data.fileUrl)
    
          
            })
            .catch((err) => {
                setLoading(false);
                console.log("Error while uploading the file: ", err);
            });
  }

        const {id} = useParams();
        const navigate = useNavigate()
    
        const getProfile = async () => {
            const token = localStorage.getItem("authToken")

            try {
                let response = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/view-profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setName(response.data.name)
                setBio(response.data.bio)
                setImgUrl(response.data.imgUrl)
                setFavoriteCar(response.data.favoriteCar)
    
            } catch (error) {
                console.log(error)
            }
        }
    
        useEffect(() => {
            getProfile()
        }, [])
    

        const handleName = (e) => setName(e.target.value)
        const handleBio = (e) => setBio(e.target.value)
        const handleImgUrl = (e) => setImgUrl(e.target.value)
        const handleFavoriteCar = (e) => setFavoriteCar(e.target.value)
        
    
        const handleSubmit = (e) => {
            e.preventDefault()
            const token = localStorage.getItem("authToken")
            const body = {name, bio, imgUrl, favoriteCar};
    
            axios.put(`${process.env.REACT_APP_API_URL}/profiles/edit-profile/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setName('')
                setBio('')
                setImgUrl('')
                navigate(`/profile/${id}`)
            })
        };
        
        const deleteProfile = () => {
            axios
            .delete(`${process.env.REACT_APP_API_URL}/profile/${id}`)
            .then(() => {
                navigate(`/`)
            })
        }
    
        return (
            <div className='EditProfile'>
                <h3>Edit Profile</h3>
        
                <form onSubmit={handleSubmit} className="edit-form">
                    <label htmlFor="name">Name</label>
                        <input type="text" name='name' id='name' value={name} onChange={handleName} />
        
                    <label htmlFor="bio">Bio</label>
                        <input type="text" name='bio' id='bio' value={bio} onChange={handleBio} />
            
                    <label htmlFor="fileUrl">Profile Picture</label>
                        <input type="file" name='imgUrl' id='imgUrl' value={fileUrl} onChange={handleFileUpload}/> 

                    <label htmlFor="favoriteCar">Favorite Car **for verification purposes**</label>
                        <input type="text" name='favoriteCar' id='favoriteCar' value={favoriteCar} onChange={handleFavoriteCar} />
        
                    <button type="submit">Submit</button>
                </form>
                <button onClick={deleteProfile} id="delete">Delete Account</button>
            </div>
          )
    }

export default EditProfile