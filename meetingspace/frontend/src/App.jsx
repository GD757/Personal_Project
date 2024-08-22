import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLoaderData, useNavigate, useLocation } from "react-router-dom";
import roomImage from './assets/roomImage.jpeg';
import './App.css';
import axios from 'axios';
import { confirmUser } from './Utilities';
import HomePage from './pages/HomePage';
import { logOut } from './Utilities';

function App() {
  const [user, setUser] = useState(useLoaderData());
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() =>{
    let nullUserUrls = ['/login','/signup'];
    let nullAllowed = nullUserUrls.includes(location.pathname);
    if (!user && !nullAllowed){
      navigate('/login');
    }
    else if (!user && !nullAllowed){
      navigate('/login');
    }
  },[location.pathname, user, navigate]);

  const handleLogout = async () => {
    await logOut(); // Call the logout function to clear the session
    setUser(null); // Clear the user state
    navigate('/login'); // Redirect to login page after logout
  };

  
  return (
    
    <div className="app">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/room">Event Space</Link></li>
              <li><Link to="/matterportviewer">Event Walkthrough</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Sign Out</button></li>
            </>
          )}
        </ul>
      </nav>

      
      {/* <div className="background" style={{ backgroundImage: `url(${roomImage})` }}> */}
        <div className="content">
          <Outlet context= {
            {
              user,
              setUser
            }
          } /> 
        </div>
      </div>
    // </div>
  )
}




// useEffect(()=>{
//   test_connection()
// },[])

export default App;

