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
            <>
            {/* <div className='EditProfile'>
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
            </div> */}
            <body class="antialiased">
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Edit Profile</h1>
        {/* <p class="text-slate-500"> Welcome 👋</p> */}

        <form onSubmit={handleSubmit} class="my-10">
            <div class="flex flex-col space-y-5">
                <label for="name">
                    <p class="font-medium text-slate-700 pb-2">Name</p>
                    <input id="name" name="name" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your name" value={name} onChange={handleName}/>
                </label>
                <label for="bio">
                    <p class="font-medium text-slate-700 pb-2">Bio</p>
                    <input id="bio" name="bio" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter a short description about yourself" value={bio} onChange={handleBio} />
                </label>
                <label for="fileUrl">
                    <p class="font-medium text-slate-700 pb-2">Profile Picture</p>
                    <input id="fileUrl" name="fileUrl" type="file" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" value={fileUrl} onChange={handleFileUpload} />
                </label>
                <label for="favoriteCar">
                    <p class="font-medium text-red-700 pb-2">Favorite Car **required for authentication**</p>
                    <input id="favoriteCar" name="favoriteCar" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter a short description about yourself" value={favoriteCar} onChange={handleFavoriteCar} />
                </label>

                <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Submit</span>
                </button>
                <button onClick={deleteProfile} id="delete" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Delete Account</span>
                </button>
            </div>
        </form>
    </div>
    
</body>
            </>
          )
    }

export default EditProfile