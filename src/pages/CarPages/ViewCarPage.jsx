import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

function ViewCarPage() {

    const [car, setCar] = useState(null);

    const { id } = useParams();

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
    <>
        {/* <Link to="/create-car">Add Car</Link> */}
    <div className='ProjectListPage'>
                        {car && (
                <div className="ViewCarCard card" key={car._id}>
                        <div className='ViewCarCard'>
                            <img src={car.imgUrl} alt="car img" id="car-img"/>
                            <h1>{car.ownerId[0].username}'s {car.year} {car.make} {car.model}</h1>
                    <Link to={`/profile/${car.ownerId[0]._id}`}>View {car.ownerId[0].username}'s profile</Link>
                        </div>
                        <Link to={`/edit-car/${car._id}`}>Edit Car</Link>
                    {/* </Link> */}
                    {/* <h4>{el.description}</h4> */}
                </div>
                            )
                        }
        
         </div>
    </>
  )
}

export default ViewCarPage