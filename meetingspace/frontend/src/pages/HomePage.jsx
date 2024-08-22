import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useNavigate } from 'react-router-dom'; // Import useNavigate

function HomePage() {
  const [location, setLocation] = useState('Virginia'); // Default location
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useOutletContext();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: location, 
            units: 'imperial', 
            appid: '92ec95aa5d59320bb4c1499ee5ce96b3', // Replace with your actual API key
          }
        });
        setWeather(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Error fetching weather data.');
        setWeather(null); // Clear previous weather data
      }
    };

    fetchWeather();
  }, [location]); // Re-fetch weather data whenever the location changes

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleClick = () => {
    navigate('/3d-app'); // Navigate to the 3D app route
  };

  return (
    <div className="home-page">
      <div onClick={handleClick}>
        <h2>MODEL</h2>
      </div>
      <div className="content">
        <h1>Welcome to MeetingSpace</h1>
        <p>Designing Immersive Experiences with Precision and 3D Innovation</p>

        <div className="location-input">
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter a city"
          />
        </div>
        
        {error && <p>{error}</p>}
        {weather ? (
          <div className="weather">
            <h3>Weather in {weather.name}</h3>
            {weather.weather && weather.weather[0] && (
              <p>{weather.weather[0].description}</p>
            )}
            <p>Temperature: {weather.main?.temp}°F</p>
            <p>Humidity: {weather.main?.humidity}%</p>
            <p>Wind Speed: {weather.wind?.speed} m/s</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
