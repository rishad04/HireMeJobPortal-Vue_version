// src/api.js
import axios from 'axios';
import { useAuthStore } from './stores/auth';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Important for cookies, if you use them
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
apiClient.interceptors.request.use(config => {
  // 2. Get a reference to the store INSIDE the interceptor.
  // This is important because it ensures you get the latest state.
  const authStore = useAuthStore();
  const token = authStore.token;

  // 3. If a token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;
