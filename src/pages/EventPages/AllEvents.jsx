import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function EventsPage() {

    const [events, setEvents] = useState([]);

    const getEvents = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/events/all`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                setEvents(response.data.reverse())
                console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

  return (
    <>
        {/* <AddCar getEvents={getEvents} /> */}
        <Link to="/create-event"><button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
            Add Event</button></Link>
    <div className='EventListPage'>
        {events.map((el) => {
            return (
                <div className="Eventcard card" key={el._id}>
                    <Link to={`/events/${el._id}`}>
                        <div>
                            <img src={el.imgUrl} alt="" id='event-img'/>
                            <h1>{el.title} - {el.authorId[0].username}</h1>
                            <p>{el.body}</p>
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

export default EventsPage