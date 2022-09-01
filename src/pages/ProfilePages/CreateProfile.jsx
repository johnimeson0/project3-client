import {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link, Navigate } from 'react-router-dom'

function CreateProfile(){

        const [name, setName] = useState('')
        const [bio, setBio] = useState('')
        const [imgUrl, setImgUrl] = useState('')
        const [favoriteCar, setFavoriteCar] = useState('')
    
        const handleName = (e) => setName(e.target.value)
        const handleBio = (e) => setBio(e.target.value)
        const handleImgUrl = (e) => setImgUrl(e.target.value)
        const handleFavoriteCar = (e) => setFavoriteCar(e.target.value)
    
        const handleSubmit = (e) => {
            e.preventDefault();
            //gather the values to create the profile
            const requestBody = {name, bio, imgUrl, favoriteCar};
            //axios.post(`url`, information sent)
            axios.put(`${process.env.REACT_APP_API_URL}/profiles/edit-profile`, requestBody)
            .then(() => {
                setName('')
                setBio('')
                setImgUrl('')
                setFavoriteCar('')
                Navigate('/login')
            })
            .catch((err) => console.log(err))
        }
        
      return (
        <div className='AddProject'>
            <h3>Create Profile</h3>
    
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                    <input type="text" name='name' id='name' value={name} onChange={handleName} />
    
                <label htmlFor="bio">Bio</label>
                    <input type="text" name='bio' id='bio' value={bio} onChange={handleBio} />
                
                <label htmlFor="imgUrl">Profile Picture</label>
                    <input type="text" name='imgUrl' id='imgUrl' value={imgUrl} onChange={handleImgUrl} />

                <label htmlFor="favoriteCar">Favorite Car</label>
                    <input type="text" name='favoriteCar' id='favoriteCar' value={favoriteCar} onChange={handleFavoriteCar} />
    
                <button type="submit">Submit</button>
            </form>
        </div>
      )
    }

export default CreateProfile