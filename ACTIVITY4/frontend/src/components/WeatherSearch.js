import React, { useState, memo } from 'react';
import './WeatherSearch.css';

const WeatherSearch = memo(({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="weather-search">
      <h1>🌤️ Weather Proxy App</h1>
      <p className="subtitle">Get real-time weather information for any city</p>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (e.g., London, Tokyo, New York)"
            className="city-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || !city.trim()}
          >
            {loading ? '🔄 Searching...' : '🔍 Search'}
          </button>
        </div>
      </form>
    </div>
  );
});

WeatherSearch.displayName = 'WeatherSearch';

export default WeatherSearch;
