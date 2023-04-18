import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';

function SecondaryNav() {

    const {loggedIn, user, logout} = useContext(AuthContext)

  return (
    <nav className='SecondaryNav'>


        {loggedIn && (
            <>
<Link to="/friends"><button>Friends List</button></Link>
     <button onClick={logout}>Logout</button>
            </>
        )}

    </nav>
  )
}

export default SecondaryNav