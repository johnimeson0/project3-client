import {useState, useContext} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';


function CreateCar(){

    const {user} = useContext(AuthContext)

        const navigate = useNavigate();

        const [make, setMake] = useState('')
        const [model, setModel] = useState('')
        const [year, setYear] = useState('')
        const [imgUrl, setImgUrl] = useState('')
    
        const handleMake = (e) => setMake(e.target.value)
        const handleModel = (e) => setModel(e.target.value)
        const handleYear = (e) => setYear(e.target.value)
        const handleImgUrl = (e) => setImgUrl(e.target.value) 

        // const handleFileUpload = (e) => {
        //     // console.log("The file to be uploaded is: ", e.target.files[0]);
        
        //     const uploadData = new FormData();
        
        //     // imageUrl => this name has to be the same as in the model since we pass
        //     // req.body to .create() method when creating a new movie in '/api/movies' POST route
        //     uploadData.append("imageUrl", e.target.files[0]);
        
        //     service
        //       .uploadImage(uploadData)
        //       .then((response) => {
        //         // console.log("response is: ", response);
        //         // response carries "fileUrl" which we can use to update the state
        //         setImgUrl(response.fileUrl);
        //       })
        //       .catch((err) => console.log("Error while uploading the file: ", err));
        //   };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            //gather the values to create the project
            const requestBody = {make, model, year, imgUrl, userId: user._id};
            //axios.post(`url`, information sent)
            axios.post(`${process.env.REACT_APP_API_URL}/cars/create`, requestBody)
            .then(() => {
                setMake('')
                setModel('')
                setYear('')
                setImgUrl('')
                navigate('/cars')
                
            })
            .catch((err) => console.log(err))
        }
        
      return (
        <div className='AddProject'>
            <h3>Add Car</h3>
    
            <form onSubmit={handleSubmit}>
                <label htmlFor="make">Make</label>
                    <input type="text" name='make' id='make' value={make} onChange={handleMake} />
    
                <label htmlFor="model">Model</label>
                    <input type="text" name='model' id='model' value={model} onChange={handleModel} />
    
                <label htmlFor="year">Year</label>
                    <input type="number" name='year' id='year' value={year} onChange={handleYear} />
                
               {/*  <label htmlFor="imgUrl">Car Picture</label>
                    <input type="file" name='imgUrl' id='imgUrl' value={imgUrl} onChange={handleImgUrl} /> */}
    
                <button type="submit">Add</button>
            </form>
        </div>
      )
    }

export default CreateCar