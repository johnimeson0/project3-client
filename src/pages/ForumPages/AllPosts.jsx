import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Searchbar from '../../components/Search/Searchbar';

function PostsPage() {

    const [posts, setPosts] = useState([]);

    
    const getPosts = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");
            
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/forum/all-posts`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            setPosts(response.data.reverse())
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getPosts();
    }, []);
    
    const [displayPosts, setDisplayPosts] = useState(posts)
    
    const searchResults = (searchStr) => {
        let filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchStr.toLowerCase())
        );
        //This will make displayMovies only contain the movies filtered out by the query. The original movies state will stay untouched
        setDisplayPosts(filteredPosts);
        console.log(displayPosts);
    };
    

return (
    <>
        <Link to="/create-post"><button>Add Post</button></Link>

    <div className='PostListPage'>
    <Searchbar searchResults={searchResults} />
        {posts.map((el) => {
            return (
                <div className="Postcard card" key={el._id}>
                    <Link to={`/forum/${el._id}`}>
                        <div>
                            <div className='title div'>
                                <h1>{el.title}</h1>
                                <h2>{el.authorId[0].username}</h2>
                            </div>
                            <p>{el.body}</p>
                        </div>
                    </Link>
                    {/* <h4>{el.description}</h4> */}
                </div>
            )
        })}
    </div>
    </>
  )
}

export default PostsPage