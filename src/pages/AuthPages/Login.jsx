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
    <>
    {/* <div className='loginPage'>
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
    </div> */}
<body class="antialiased">
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">Login</h1>
        <p class="text-slate-500"> Welcome 👋</p>

        <form onSubmit={handleSubmit} class="my-10">
            <div class="flex flex-col space-y-5">
                <label for="username">
                    <p class="font-medium text-slate-700 pb-2">Username</p>
                    <input id="username" name="username" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter username" value={username} onChange={handleUsername}/>
                </label>
                <label for="password">
                    <p class="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" value={password} onChange={handlePassword} />
                </label>

                <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Login</span>
                </button>
                <p class="text-center">Haven't signed up? <a href="/signup" class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Sign up</span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></a></p>
            </div>
        </form>
    </div>
    
</body>
    </>
  )
}

export default Login