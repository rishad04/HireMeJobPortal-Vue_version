// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Important for cookies, if you use them
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// We'll add an interceptor here later to attach the JWT to every request

export default apiClient;
