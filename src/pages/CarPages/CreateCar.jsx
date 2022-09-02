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
        const [fileUrl, setFileUrl] = useState("");
        const [loading, setLoading] = useState(false);


        
        const handleMake = (e) => setMake(e.target.value)
        const handleModel = (e) => setModel(e.target.value)
        const handleYear = (e) => setYear(e.target.value)
        const handleImgUrl = (e) => setImgUrl(e.target.value) 
        
        const handleFileUpload = (e) => {
            setLoading(true);
            
            const uploadData = new FormData();
            
            uploadData.append("fileUrl", e.target.files[0]);
            
            axios
            .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
            .then((response) => {
                console.log(response.data.fileUrl)
                
                setLoading(false);
                
                setImgUrl(response.data.fileUrl)
                
            })
            .catch((err) => {
                setLoading(false);
                console.log("Error while uploading the file: ", err);
            });
        }
            
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
                    <>
                {/* <div className='AddProject'>
            <h3>Add Car</h3>
    
            <form onSubmit={handleSubmit}>
                <label htmlFor="make">Make</label>
                    <input type="text" name='make' id='make' value={make} onChange={handleMake} />
    
                <label htmlFor="model">Model</label>
                    <input type="text" name='model' id='model' value={model} onChange={handleModel} />
    
                <label htmlFor="year">Year</label>
                    <input type="number" name='year' id='year' value={year} onChange={handleYear} />
                
                <label htmlFor="fileUrl">Car Picture</label>
                    <input type="file" name='imgUrl' id='imgUrl' value={fileUrl} onChange={handleFileUpload}/> 
    
                <button type="submit">Add</button>
            </form>
        </div> */}
                <body class="antialiased">
                <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                    <h1 class="text-4xl font-medium">Add Car</h1>
                    {/* <p class="text-slate-500"> Welcome 👋</p> */}
            
                    <form onSubmit={handleSubmit} class="my-10">
                        <div class="flex flex-col space-y-5">
                            <label for="make">
                                <p class="font-medium text-slate-700 pb-2">Make</p>
                                <input id="make" name="make" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter the make of your vehicle" value={make} onChange={handleMake}/>
                            </label>
                            <label for="model">
                                <p class="font-medium text-slate-700 pb-2">Model</p>
                                <input id="model" name="model" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter the model of your vehicle" value={model} onChange={handleModel} />
                            </label>
                            <label for="year">
                                <p class="font-medium text-slate-700 pb-2">Year</p>
                                <input id="year" name="year" type="number" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter the year of your vehicle" value={year} onChange={handleYear} />
                            </label>

                            <label for="fileUrl">
                                <p class="font-medium text-slate-700 pb-2">Image of your vehicle</p>
                                <input id="fileUrl" name="fileUrl" type="file" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" value={fileUrl} onChange={handleFileUpload} />
                            </label>
            
                            <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                  </svg>
                                  <span>Create Car</span>
                            </button>
                        </div>
                    </form>
                </div>
                
            </body>
                </>
      )
}
    
    export default CreateCar