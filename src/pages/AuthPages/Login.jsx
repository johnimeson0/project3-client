import { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'


function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();
    const {storeToken, authenticateUser} = useContext(AuthContext);

    const handleUsername = (e) => setUsername(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {username, password};

        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, requestBody)
        .then((response) => {
            storeToken(response.data.authToken)
            authenticateUser()
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
            setErrorMessage(err.response.data.errorMessage);
        })
    }

  return (
    <div className='loginPage'>
            <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
                <input type="text" name='username' value={username} onChange={handleUsername}/>
                    <label htmlFor="password">Password</label>
                        <input type="password" name='password' value={password} onChange={handlePassword}/>

                            <button type="submit">Log in</button>
        </form>

        {errorMessage && (<p>{errorMessage}</p>)}

        <p>Don't have an account?</p>
        <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default Login