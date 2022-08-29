import logo from './logo.svg';
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
      <Route path="/profile/:id" element={<Private> <Profile />  </Private>}/>
      <Route path="/view-profile/:id" element={<Private> <ViewProfile /> </Private>} />
      <Route path="/create-profile/:id" element={<Private> <CreateProfile /> </Private>} />
      <Route path="/edit-profile/:id" element={<Private> <EditProfile /> </Private>} />
      <Route path="/home" element={ <Home/> } />
    </Routes>
    </div>
  );
}

export default App;
