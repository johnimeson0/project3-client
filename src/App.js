import './App.css';
import {Routes, Route} from 'react-router-dom';
import Anon from './components/Anon/Anon';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/AuthPages/Login';
import Signup from './pages/AuthPages/Signup';
import Index from './pages/HomePages/Index';
import Profile from './pages/ProfilePages/Profile';
import ViewProfile from './pages/ProfilePages/ViewProfile';
import EditProfile from './pages/ProfilePages/EditProfile';
import CreateProfile from './pages/ProfilePages/CreateProfile';
import SecondaryNav from './components/Navbar/SecondaryNav';
import Home from './pages/HomePages/Home';
import AllCars from './pages/CarPages/AllCars';
import PostsPage from './pages/ForumPages/AllPosts';
import EventsPage from './pages/EventPages/AllEvents';
import CreateCar from './pages/CarPages/CreateCar';
import ViewCarPage from './pages/CarPages/ViewCarPage';
import ViewPost from './pages/ForumPages/ViewPost';
import ViewEvent from './pages/EventPages/ViewEvent';
import EditCar from './pages/CarPages/EditCar';
import Friends from './components/Friends/Friends';
import CreateEvent from './pages/EventPages/CreateEvent';
import CreatePost from './pages/ForumPages/CreatePost';
import Private from './components/Private/Private';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SecondaryNav />

    <Routes>
      <Route path="/" element= {<Anon> <Index /> </Anon>}/>
      <Route path="/login" element={<Anon> < Login /> </Anon>}/>
      <Route path="/signup" element={<Anon> < Signup /> </Anon>}/>
      {/* <Route path="/profile/:id" element={<Private> <Profile />  </Private>}/> */}
      <Route path="/profile/:id" element={<Private> <ViewProfile /> </Private>} />
      <Route path="/create-profile" element={<Private> <CreateProfile /> </Private>} />
      <Route path="/edit-profile/:id" element={<Private> <EditProfile /> </Private>} />
      <Route path="/cars" element={<Private> <AllCars /> </Private>}/>
      <Route path="/forum" element={<Private> <PostsPage /> </Private>}/>
      <Route path="/events" element={<Private> <EventsPage /> </Private>}/>
      <Route path="/create-profile" element={<Private> <CreateProfile /> </Private>}/>
      <Route path="/create-event" element={<Private> <CreateEvent /> </Private>}/>
      <Route path="/create-car" element={<Private> <CreateCar /> </Private>}/>
      <Route path="/create-post" element={<Private> <CreatePost /> </Private>}/>
      <Route path="/edit-car/:id" element={<Private> <EditCar /> </Private>}/>
      <Route path="/cars/:id" element={<Private> <ViewCarPage /> </Private>}/>
      <Route path="/forum/:id" element={<Private> <ViewPost /> </Private>}/>
      <Route path="/events/:id" element={<Private> <ViewEvent /> </Private>}/>
      <Route path="/friends" element={<Private> <Friends /> </Private>}/>
      <Route path="/home" element={ <Home/> } />
    </Routes>
    </div>
  );
}

export default App;
