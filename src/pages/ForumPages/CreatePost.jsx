import {useState, useContext} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';


function CreatePost(){

    const {user} = useContext(AuthContext)

        const navigate = useNavigate();

        const [title, setTitle] = useState('')
        const [body, setBody] = useState('')
        const [imgUrl, setImgUrl] = useState('')
        const [fileUrl, setFileUrl] = useState("");
        const [loading, setLoading] = useState(false);
    
        const handleTitle = (e) => setTitle(e.target.value)
        const handleBody = (e) => setBody(e.target.value)
        const handleImgUrl = (e) => setImgUrl(e.target.value) 


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
    
        const handleSubmit = (e) => {
            e.preventDefault();
            //gather the values to create the project
            const requestBody = {title, body, imgUrl, userId: user._id};
            //axios.post(`url`, information sent)
            axios.post(`${process.env.REACT_APP_API_URL}/forum/create-post`, requestBody)
            .then(() => {
                setTitle('')
                setBody('')
                setImgUrl('')
                navigate('/forum')
                
            })
            .catch((err) => console.log(err))
        }
        
      return (
        <div className='AddPost'>
            <h3>Add Post</h3>
            <Link to="/forum">Back</Link>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                    <input type="text" name='title' id='title' value={title} onChange={handleTitle} />
    
                <label htmlFor="body">Body</label>
                    <input type="text" name='body' id='body' value={body} onChange={handleBody} />
                
                <label htmlFor="fileUrl">Post Picture</label>
                    <input type="file" name='imgUrl' id='imgUrl' value={fileUrl} onChange={handleFileUpload}/> 
    
                <button type="submit">Add Post</button>
            </form>
        </div>
      )
    }

export default CreatePost