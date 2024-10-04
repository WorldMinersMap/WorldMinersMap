// frontend/src/utils/axiosInstance.js

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;  // Attach token to request headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to catch 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Return response if successful
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized, handle logout and redirect

      // Remove token from local storage
      localStorage.removeItem('token');

      // Redirect to login page
      window.location.href = '/login';  // You can also use navigate('/login') in React components

      // Optionally show a message or handle specific actions before redirecting
    }
    return Promise.reject(error);  // Reject any other errors
  }
);

export default axiosInstance;
