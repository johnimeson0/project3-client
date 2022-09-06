import { useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function Index(){
    const {loggedIn, user, logout} = useContext(AuthContext)

    return (
      <div className='Index'>
  
          {/* <Link to="/home">
              <button>Home</button>        
          </Link> */}
  
          {!loggedIn && (
            <section className='index'>

                <div className='title'>
                    <h1>App Name</h1>
                    <h5>App Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam autem laborum numquam
                        minus soluta repellat officiis deleniti hic aperiam voluptates consequuntur quo, quaerat necessitatibus, 
                        inventore veritatis. Deleniti, cum perspiciatis.</h5>
                </div>

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
               <section className='index'>

               <div className='title'>

                   <h1>App Name</h1>
                   <h5>App Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam autem laborum numquam
                       minus soluta repellat officiis deleniti hic aperiam voluptates consequuntur quo, quaerat necessitatibus, 
                       inventore veritatis. Deleniti, cum perspiciatis.</h5>
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