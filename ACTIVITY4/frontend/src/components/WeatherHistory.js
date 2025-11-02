import React, { memo, useMemo } from 'react';
import './WeatherHistory.css';

// Memoized history item component
const HistoryItem = memo(({ item }) => {
  const formattedTime = useMemo(() => {
    return new Date(item.timestamp).toLocaleString();
  }, [item.timestamp]);

  return (
    <div className="history-item">
      <div className="history-info">
        <span className="history-city">{item.city}</span>
        <span className="history-temp">{item.temperature}°C</span>
      </div>
      <div className="history-details">
        <span className="history-condition">{item.condition}</span>
        <span className="history-time">{formattedTime}</span>
      </div>
    </div>
  );
});

HistoryItem.displayName = 'HistoryItem';

const WeatherHistory = memo(({ history, onClearHistory, loading }) => {
  // Memoize whether to show the component
  const shouldShow = useMemo(() => {
    return history && history.length > 0;
  }, [history]);

  // Memoize history count
  const historyCount = useMemo(() => {
    return history ? history.length : 0;
  }, [history]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="weather-history">
      <div className="history-header">
        <h3>📜 Search History ({historyCount})</h3>
        <button 
          onClick={onClearHistory}
          className="clear-button"
          disabled={loading}
          aria-label="Clear search history"
        >
          🗑️ Clear History
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
});

WeatherHistory.displayName = 'WeatherHistory';

export default WeatherHistory;
