import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const REQUEST_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
});

// Store active requests for cancellation
let activeRequests = new Map();

const weatherService = {
  // Get weather for a specific city
  getWeather: async (city) => {
    try {
      // Cancel previous request for the same city if exists
      const requestKey = `weather-${city}`;
      if (activeRequests.has(requestKey)) {
        activeRequests.get(requestKey).cancel('New request initiated');
      }

      // Create new cancel token
      const cancelTokenSource = axios.CancelToken.source();
      activeRequests.set(requestKey, cancelTokenSource);

      const response = await axiosInstance.get('/api/weather', {
        params: { city },
        cancelToken: cancelTokenSource.token,
      });

      // Remove from active requests on success
      activeRequests.delete(requestKey);
      
      return response.data;
    } catch (error) {
      // Handle cancellation
      if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message);
        throw new Error('Request cancelled');
      }

      // Handle timeout
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - please try again');
      }

      throw error.response?.data?.message || 'Failed to fetch weather data';
    }
  },

  // Get weather search history
  getHistory: async () => {
    try {
      // Cancel previous history request if exists
      const requestKey = 'history';
      if (activeRequests.has(requestKey)) {
        activeRequests.get(requestKey).cancel('New request initiated');
      }

      const cancelTokenSource = axios.CancelToken.source();
      activeRequests.set(requestKey, cancelTokenSource);

      const response = await axiosInstance.get('/api/weather/history', {
        cancelToken: cancelTokenSource.token,
      });

      activeRequests.delete(requestKey);
      
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message);
        throw new Error('Request cancelled');
      }

      throw error.response?.data?.message || 'Failed to fetch weather history';
    }
  },

  // Clear weather search history
  clearHistory: async () => {
    try {
      const response = await axiosInstance.delete('/api/weather/history');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to clear weather history';
    }
  },

  // Cancel all active requests
  cancelAllRequests: () => {
    activeRequests.forEach((cancelTokenSource, key) => {
      cancelTokenSource.cancel('Component unmounted or cleanup');
    });
    activeRequests.clear();
  },
};

export default weatherService;
