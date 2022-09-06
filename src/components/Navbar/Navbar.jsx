import { NavbarPage } from '../NavbarTail/NavbarPage';
// import {Link, Navigate} from 'react-router-dom';
// import { AuthContext } from '../../context/auth.context';
// import { useContext } from 'react';

function Navbar() {

    // const {loggedIn, user, logout} = useContext(AuthContext)
    // const {returnToIndex} = () => {<Navigate to="/"/>}

  return (
    <>
    <NavbarPage />
    {/* <nav className='Navbar'>


        {loggedIn && (
            <>
            <Link to="/home">
                <button>Home</button>        
            </Link>
            <Link to="/cars">
                <button>Cars</button>        
            </Link>
            <Link to="/forum">
                <button>Forum</button>        
            </Link>
            <Link to="/events">
                <button>Events</button>        
            </Link>
            <Link to={`/profile/${user._id}`}>
                <button>Profile</button>
            </Link>
            <button onClick={logout}>Logout</button>

            </>
        )}

        {/* {!loggedIn && (
            <>
            <Link to="/login">
                <button>Log in</button>        
            </Link>

            <Link to="/signup">
                <button>Sign up</button>        
            </Link>
            </>
        )} */}

    {/* </nav> */}
    </> 
  )
}

export default Navbar