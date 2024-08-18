import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import roomImage from './assets/roomImage.jpeg';
import './App.css';
import axios from 'axios';

function App() {
  // const [user, setUser] = useState(null)
  // const testConnection = async() =>{
  //   let response =await axios.get("")
  // }
  return (
    <div className="app">
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/events">Events</Link></li>  
          <li><Link to="/model-details">Model Details</Link></li> 
        </ul>
      </nav>

      {/* Background Image */}
      <div className="background" style={{ backgroundImage: `url(${roomImage})` }}>
        <div className="content">
          <Outlet /> {/* This renders the routed components */}
        </div>
      </div>
    </div>
  );
}




// useEffect(()=>{
//   test_connection()
// },[])

export default App;

