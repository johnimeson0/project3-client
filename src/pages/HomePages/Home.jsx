import { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function Home(){
    const {loggedIn, user, logout} = useContext(AuthContext)
    const navigate = useNavigate()
    console.log(user)
    const checkFirstTime = () => {
        if (user && user.favoriteCar == "") {
            navigate(`/edit-profile/${user._id}`)
        }
    }

    useEffect(() => {
        checkFirstTime()
    }, [user])

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
                    <h1>Route test successful</h1>
                    <h2> Welcome, {user.username}! your id is {user._id}</h2>
              </section>
          )}
  
      </div>
    )
  }
  
  export default Home