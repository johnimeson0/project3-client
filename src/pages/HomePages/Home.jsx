import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function Home(){
    const {loggedIn, user, id, logout} = useContext(AuthContext)

     const [profile, setProfile] = useState(null);

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

    const navigate = useNavigate()
    // console.log(user)
    const checkFirstTime = () => {
        if (profile && profile.favoriteCar === "") {
            navigate(`/edit-profile/${user._id}`)
            console.log('should send to profile')
        }
    }

    const [joke, setJoke] = useState('')

    const getJoke = async() => {
        let response = await axios.get('https://geek-jokes.sameerkumar.website/api?format=json')
        setJoke(response.data)
        response.json(response.data)
    }

    useEffect(() => {
        checkFirstTime()
    }, [profile])

    useEffect(() => {
        getJoke()
        getProfile()
    }, [])

    return (
      <div className='Index'>
  
          {/* <Link to="/home">
              <button>Home</button>        
          </Link> */}
  
          {!loggedIn && (
            <section className='home-no-log'>

            <h1>You are not logged in</h1>
            <div className='index-navigation'>

                <Link to="/login">
                    <button>Log in</button>        
                </Link>

                <Link to="/signup">
                    <button>Sign up</button>        
                </Link>

            </div>

            </section>
          )}
  
          {loggedIn && (
               <section className='home'>
                    <div className='title'>
                    <h1>REVMATCH</h1>
                    <h2> Welcome, {user.username}! Please refer to the nav bar to browse cars, posts, and events! :D </h2>
                    </div>
                    <div className='joke'>
                        <h1>Thank you for visiting revmatch, enjoy a random joke!</h1>
                        <h3>{joke.joke}</h3>
                    </div>
              </section>

          )}
  
      </div>
    )
  }
  
  export default Home