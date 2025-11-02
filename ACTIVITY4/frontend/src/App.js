import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherHistory from './components/WeatherHistory';
import Modal from './components/Modal';
import ErrorBoundary from './components/ErrorBoundary';
import weatherService from './services/weatherService';

function App() {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'info' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, onConfirm: null });

  // Load history on component mount
  useEffect(() => {
    loadHistory();

    // Cleanup: cancel all pending requests on unmount
    return () => {
      weatherService.cancelAllRequests();
    };
  }, []);

  // Memoized function to load history
  const loadHistory = useCallback(async () => {
    try {
      const data = await weatherService.getHistory();
      setHistory(data);
    } catch (err) {
      // Only log if not a cancellation error
      if (err.message !== 'Request cancelled') {
        console.error('Failed to load history:', err);
      }
    }
  }, []);

  // Memoized search handler
  const handleSearch = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const data = await weatherService.getWeather(city);
      setWeather(data);
      // Reload history after successful search
      await loadHistory();
    } catch (err) {
      // Don't show error for cancelled requests
      if (err.message !== 'Request cancelled') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [loadHistory]);

  // Memoized modal handlers
  const showModal = useCallback((title, message, type = 'info') => {
    setModal({ isOpen: true, title, message, type });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, title: '', message: '', type: 'info' });
  }, []);

  const showConfirmModal = useCallback((onConfirm) => {
    setConfirmModal({ isOpen: true, onConfirm });
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModal({ isOpen: false, onConfirm: null });
  }, []);

  // Memoized confirm clear handler
  const handleConfirmClear = useCallback(async () => {
    closeConfirmModal();
    setLoading(true);
    try {
      const result = await weatherService.clearHistory();
      setHistory([]);
      setWeather(null); // Also clear the current weather display
      setError(null); // Clear any errors
      showModal('Success', `History cleared successfully! ${result.deletedCount} record(s) deleted.`, 'success');
    } catch (err) {
      showModal('Error', `Failed to clear history: ${err.message || err}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [closeConfirmModal, showModal]);

  // Memoized clear history handler
  const handleClearHistory = useCallback(() => {
    showConfirmModal(handleConfirmClear);
  }, [showConfirmModal, handleConfirmClear]);

  // Memoize modal content to prevent re-renders
  const confirmModalContent = useMemo(() => {
    if (!confirmModal.isOpen) return null;

    return (
      <div className="modal-overlay" onClick={closeConfirmModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-icon modal-icon-warning">⚠</div>
          <h2 className="modal-title">Confirm Clear History</h2>
          <p className="modal-message">
            Are you sure you want to clear all search history? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              className="modal-button" 
              style={{ background: 'linear-gradient(135deg, #6c757d, #5a6268)' }}
              onClick={closeConfirmModal}
            >
              Cancel
            </button>
            <button 
              className="modal-button" 
              style={{ background: 'linear-gradient(135deg, #dc3545, #c82333)' }}
              onClick={confirmModal.onConfirm}
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
    );
  }, [confirmModal.isOpen, confirmModal.onConfirm, closeConfirmModal]);

  return (
    <ErrorBoundary>
      <div className="App">
        <div className="container">
          <header className="app-header">
            <h1 className="app-title">🌤️ Weather Proxy</h1>
            <p className="app-subtitle">Get real-time weather information for any city worldwide</p>
          </header>
          
          <WeatherSearch onSearch={handleSearch} loading={loading} />
          <WeatherDisplay weather={weather} error={error} />
          <WeatherHistory 
            history={history} 
            onClearHistory={handleClearHistory}
            loading={loading}
          />
        </div>
        
        {/* Confirmation Modal */}
        {confirmModalContent}

        {/* Info/Success/Error Modal */}
        <Modal
          isOpen={modal.isOpen}
          onClose={closeModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
