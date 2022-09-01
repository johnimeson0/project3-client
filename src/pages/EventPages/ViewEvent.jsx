import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

function ViewEvent() {

    const [event, setEvent] = useState(null);

    const { id } = useParams();

    const getEvent = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
                setEvent(response.data)
                console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEvent();
    }, []);

  return (
    <>
        {/* <Link to="/create-car">Add Car</Link> */}
    <div className='ProjectListPage'>
                        {event && (
                <div className="ViewCarCard card" key={event._id}>
                        <div className='ViewCarCard'>
                            <img src={event.imgUrl} alt="event img" id="large-event-img"/>
                            <h1> {event.title} </h1>
                            <h3>{event.body} </h3>
                            <h5>{event.address}</h5>
                            <h3>This event was posted by:</h3>
                    <Link className="testing"to={`/profile/${event.authorId._id}`}> <div className="profile-link-card"> <img src={event.authorId.imgUrl} alt="" id="small-img"/>@{event.authorId.username} </div> </Link>
                        </div>
                    {/* </Link> */}
                    {/* <h4>{el.description}</h4> */}
                </div>
                            )
                        }
        
         </div>
    </>
  )
}

export default ViewEvent