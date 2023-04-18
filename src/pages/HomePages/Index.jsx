import { useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function Index(){
    const {loggedIn, user, logout} = useContext(AuthContext)

    return (
      <div className='Index'>
  
          {!loggedIn && (
            <section className='index'>

                <div className='title'>
                    <h1 className='index-header-txt'>Welcome to REVMATCH! </h1>
                    <h3 className='sub-header'>Downshift and relax, REVMATCH is a car based social media platform, and my third and final Ironhack Full Time Web Development Course project! Here, you and other users can upload your cars, posts, and car meets to connect with others!</h3>
                </div>

                <div className='index-navigation'>

                    <Link to="/login">
                        <button className='index-login'>Log in</button>        
                    </Link>

                    <Link to="/signup">
                        <button className='index-signup'>Sign up</button>        
                    </Link>

                </div>

            </section>
          )}
  
          {loggedIn && (
               <section className='index'>

               <div className='title'>

               <h1 className='header-txt'>Welcome to REVMATCH! </h1>
               <h3 className='sub-header'>Downshift and relax, REVMATCH is a solely car enthusiast based social media platform, where you and other users can upload your cars, posts, and car meets to connect with others!</h3>
               </div>

               <div className='index-navigation'>

              <h4> You are already logged in, would you like to go to the home page?</h4>

              <Link to="/home">
                  <button>Home</button>        
              </Link>
  
              <button onClick={logout}>Logout</button>
              </div>
              </section>
          )}
  
      </div>
    )
  }
  
  export default Index