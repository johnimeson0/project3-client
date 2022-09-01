import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';
import LikeButton from '../../components/LikeButton/LikeButton';

function ViewPost() {

    const [post, setPost] = useState(null);

    const {user} = useContext(AuthContext)

    const { id } = useParams();

    const getPost = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/forum/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                setPost(response.data)
                console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost();
    }, []);

  return (
    <>
        {/* <Link to="/create-car">Add Car</Link> */}
    <div className='ProjectListPage'>
                        {post && (
                <div className="ViewCarCard card" key={post._id}>
                        <div className='ViewCarCard'>
                            <img src={post.imgUrl} alt="post img" id="post-img"/>
                            {post && user._id !== post.authorId[0]._id && (
                        
                                <LikeButton/>
                
                            )}
                            {post && user._id === post.authorId[0]._id && (

                                <Link to={`/edit-post/${post._id}`}><button>Edit Post</button></Link>

                            )}
                            <h1> {post.title} </h1>
                            <h3>{post.body} </h3>
                            <h5>This was posted by:</h5>
                    <Link className="testing"to={`/profile/${post.authorId[0]._id}`}> <div className="profile-link-card"> <img src={post.authorId[0].imgUrl} alt="" id="small-img"/>@{post.authorId[0].username} </div> </Link>
                        </div>
                    {/* </Link> */}
                    {/* <h4>{el.description}</h4> */}
                </div>
                            )
                        }
        
         </div>
    </>
  )
}

export default ViewPost