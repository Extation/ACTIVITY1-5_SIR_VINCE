import React, { memo, useMemo } from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = memo(({ weather, error }) => {
  // Memoize weather icon calculation
  const weatherIcon = useMemo(() => {
    if (!weather) return null;
    
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '💨',
      Haze: '🌫️',
      Dust: '💨',
      Fog: '🌫️',
      Sand: '💨',
      Ash: '🌋',
      Squall: '💨',
      Tornado: '🌪️'
    };
    return icons[weather.condition] || '🌤️';
  }, [weather]);

  // Memoize formatted timestamp
  const formattedTimestamp = useMemo(() => {
    if (!weather) return null;
    return new Date(weather.timestamp).toLocaleString();
  }, [weather]);

  if (error) {
    return (
      <div className="weather-display error">
        <div className="error-icon">⚠️</div>
        <h2>Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="weather-display">
      <div className="weather-card">
        <div className="weather-header">
          <h2>{weather.city}, {weather.country}</h2>
          <p className="timestamp">
            {formattedTimestamp}
          </p>
        </div>

        <div className="weather-main">
          <div className="weather-icon">
            {weatherIcon}
          </div>
          <div className="temperature">
            {weather.temperature}°C
          </div>
        </div>

        <div className="weather-condition">
          <h3>{weather.condition}</h3>
          <p>{weather.description}</p>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-icon">💧</span>
            <div>
              <p className="detail-label">Humidity</p>
              <p className="detail-value">{weather.humidity}%</p>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💨</span>
            <div>
              <p className="detail-label">Wind Speed</p>
              <p className="detail-value">{weather.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

WeatherDisplay.displayName = 'WeatherDisplay';

export default WeatherDisplay;
