// lib/api.js
import axios from 'axios';
import { LOAN_APPLICATION_API } from './constants_apis';

const api = axios.create({
  baseURL: '/api', //  Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

//  Request interceptor (for adding auth headers, etc.)
api.interceptors.request.use(
  (config) => {
    //  Add authorization header if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//  Response interceptor (for handling errors, etc.)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //  Handle common errors (e.g., 401, 500)
    if (error.response?.status === 401) {
      //  Redirect to login, etc.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
