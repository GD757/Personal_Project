import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {OrbitControls, Text } from "@react-three/drei";
import { useOutletContext } from 'react-router-dom';


function HomePage() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const {user} = useOutletContext()
  console.log(user.email)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: 'Virginia', 
            units: 'imperial', 
            appid: '92ec95aa5d59320bb4c1499ee5ce96b3', 
          }
        });
        setWeather(response.data);
      } catch (err) {
        setError('Error fetching weather data.');
      }
    };

    fetchWeather();
  }, []);

  const handleClick = () => {
    window.location.href = '/model-details/sample_model_id';
  };

  return (
    <div className="home-page">
      <div className="background-image" onClick={handleClick}>
        <h2>MODEL</h2>
      </div>
      <div className="content">
        <h1>Welcome to MeetingSpace</h1>
        <p>Designing Immersive Experiences with Precision and 3D Innovation</p>
        
        {error && <p>{error}</p>}
        {weather ? (
          <div className="weather">
            <h3>Weather in {weather.name}</h3>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );
}
export const Experience = ()=>{
  <>
  </>
}
  export default HomePage;
