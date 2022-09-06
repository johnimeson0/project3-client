import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function ViewCarPage() {

    const [car, setCar] = useState(null);

    const { id } = useParams();
    const {user} = useContext(AuthContext);
    console.log(user._id)

    const getCar = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/cars/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                setCar(response.data)
                console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCar();
    }, []);

  return (
    <section className='page'>
        {/* <Link to="/create-car">Add Car</Link> */}
    <div className='EventListPage'>
                        {car && (
                <div className="ViewCarCard card" key={car._id}>
                        <div className='ViewCarCard'>
                            <img src={car.imgUrl} alt="car img" id="large-event-img"/>
                            <h1>{car.ownerId[0].username}'s {car.year} {car.make} {car.model}</h1>
                            <Link className="testing"to={`/profile/${car.ownerId[0]._id}`}> <div className="profile-link-card"> <img src={car.ownerId[0].imgUrl} alt="" id="small-img"/>@{car.ownerId[0].username} </div> </Link>
                        </div>

                            {car && car.ownerId[0]._id === user._id && (
                        <Link to={`/edit-car/${car._id}`}><button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            Edit Car</button></Link>
                            )}

                    {/* </Link> */}
                    {/* <h4>{el.description}</h4> */}
                </div>
                            )
                        }
        
         </div>
    </section>
  )
}

export default ViewCarPage