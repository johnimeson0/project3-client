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
    <section className='page'>
        <Link to={`/create-car`}><button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            Add Car</button></Link>
    <div className='CarListPage'>
        {cars.map((el) => {
            return (
                <div className="Carcard card" key={el._id}>
                    <Link to={`/cars/${el._id}`}>
                        <div className='CarCard'>
                            <img src={el.imgUrl} alt="car img" id="car-img"/>
                            <hr/>
                            <h1>@{el.ownerId[0].username}'s {el.year} {el.make} {el.model}</h1>
                        </div>
                    </Link>
                    {/* <h4>{el.description}</h4> */}
                </div>
            )
        })}
         </div>
    </section>
  )
}

export default CarsPage