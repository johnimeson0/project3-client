import {useEffect, useContext} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function LikeButton() {

    const {user} = useContext(AuthContext);

    const { id } = useParams();

    const getAuth = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/profiles/view-profile/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAuth();
    }, []);

    const like =(() => {axios.post(`${process.env.REACT_APP_API_URL}/interaction/like/${id}`)}) 

  return (

        <button onClick={like()} className="like-button">Like</button>
                           
  )
}

export default LikeButton