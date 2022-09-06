import {useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
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
        <>
        {/* <div className='AddPost'>
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
        </div> */}
         <body class="antialiased">
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Add Post</h1>
        {/* <p class="text-slate-500"> Welcome 👋</p> */}

        <form onSubmit={handleSubmit} class="my-10">
            <div class="flex flex-col space-y-5">
                <label for="title">
                    <p class="font-medium text-slate-700 pb-2">Title</p>
                    <input id="title" name="title" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter title" value={title} onChange={handleTitle}/>
                </label>
                <label for="body">
                    <p class="font-medium text-slate-700 pb-2">Body</p>
                    <input id="body" name="body" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter a short description about yourself" value={body} onChange={handleBody} />
                </label>
                <label for="fileUrl">
                    <p class="font-medium text-slate-700 pb-2">Image **optional**</p>
                    <input id="fileUrl" name="fileUrl" type="file" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" value={fileUrl} onChange={handleFileUpload} />
                </label>

                <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Create Post</span>
                </button>
            </div>
        </form>
    </div>
    
</body>
        </>
      )
    }

export default CreatePost