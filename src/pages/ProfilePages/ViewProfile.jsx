import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function ViewprofilePage() {

    const [profile, setProfile] = useState(null);

    const {user} = useContext(AuthContext);

    const { id } = useParams();

    const friendRequest =(() => axios.post(`${process.env.REACT_APP_API_URL}/interaction/friends-request/${id}`))

    const getProfile = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/view-profile/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
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
    <div className='ProjectListPage'>
                        {profile && (
                <div className="ViewProfilecard card" key={profile._id}>
                        <div className='Viewprofilecard'>
                            <img src={profile.imgUrl} alt="profile img" id="profile-img"/>
                            {profile && user._id !== profile._id && (
                                <button onClick={friendRequest}>Send Friend Request</button>
                            )}
                            {profile && user._id === profile._id && (
                                <Link to={`/edit-profile/${profile._id}`}><button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                    Edit Profile</button></Link>
                            )}
                            <h2>{profile.name}</h2>
                            <h3>@{profile.username}</h3>
                            <h3>{profile.location}</h3>
                            <h4>{profile.bio}</h4>
                            <h5>{profile.friends.length} friends</h5>
                        </div>
                            <hr />
                            <div className='mid-section-profile'></div>
                            <h3> {profile.name}'s cars </h3>
                        {profile.cars.map((el) => {
                return <div className='ProfileCarsCard card' key={el._id}>
                    <Link to={`/cars/${el._id}`}>
                        <img src={el.imgUrl} alt="car image" id="car-img"/>
                <h3>{el.year} {el.make} {el.model}</h3>
                        </Link>
                </div>
            })}
                    {/* </Link> */}

                </div>
                            )
                        }
        
         </div>
    </>
  )
}

export default ViewprofilePage