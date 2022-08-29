import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';

function SecondaryNav() {

    const {loggedIn, user, logout} = useContext(AuthContext)

  return (
    <nav className='SecondaryNav'>


        {loggedIn && (
            <>
<button onClick={() => console.log('nice, cool, awesome')}>Friends List</button>
     {/*  getFriendsModal() */}
<button onClick={() => console.log('nice, cool, awesome')}>Notifications</button>
     {/*  getNotificationsModal() */}
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

    </nav>
  )
}

export default SecondaryNav