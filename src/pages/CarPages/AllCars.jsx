import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import CreateCar from './CreateCar';

function CarsPage() {

    const [cars, setCars] = useState([]);

    const getCars = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/cars/all`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                setCars(response.data.reverse())
                console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCars();
    }, []);

  return (
    <>
    <div className='ProjectListPage'>
        <Link to={`/create-car`}><button>Add Car</button></Link>
        {cars.map((el) => {
            return (
                <div className="Carcard card" key={el._id}>
                    <Link to={`/cars/${el._id}`}>
                        <div className='CarCard'>
                            <img src={el.imgUrl} alt="car img" id="car-img"/>
                            <h1>{el.ownerId[0].username}'s {el.year} {el.make} {el.model}</h1>
                        </div>
                    </Link>
                    {/* <h4>{el.description}</h4> */}
                </div>
            )
        })}
         </div>
    </>
  )
}

export default CarsPage