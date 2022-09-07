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
    <section className='page'>
        <Link to="/create-post"><button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            Add Post</button></Link>

    <div className='CarListPage'>
        <h1>Search for keywords here, or scroll for all posts</h1>
    <Searchbar searchResults={searchResults} />
        {displayPosts.map((el) => {
            return (
                <div className="Carcard card" key={el._id}>
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
    <br />
    <hr />
    <br />
    <div className='CarListPage'>
        <h2>All posts:</h2>
        {posts.map((el) => {
            return (
                <div className="Carcard card" key={el._id}>
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
    </section>
  )
}

export default PostsPage