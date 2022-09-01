import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function Friends() {

    const [profile, setProfile] = useState(null);
    const [friends, setFriends] = useState([])

    const {user} = useContext(AuthContext);

    // const { id } = useParams();

    const getProfile = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/view-profile/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                setFriends(response.data.friends)
                setProfile(response.data)
                console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

  return (
    <>
        {/* <Link to="/create-profile">Add profile</Link> */}
    <div className='FriendsList'>
                    <h1>Your Friends:</h1>
                        {profile && friends.map((el) => {
                return <div className='FriendsCard card' key={el._id}>
                    <Link to={`/view-profile/${el._id}`}>
                        <img src={el.imgUrl} alt="profile image" id="car-img"/>
                <h3>{el.name} {el.username} {el.location}</h3>
                        </Link>
                </div>
            })}
        
         </div>
    </>
  )
}

export default Friends