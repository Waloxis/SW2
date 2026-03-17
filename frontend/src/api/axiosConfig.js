// axiosConfig.js
// this sets up axios so we can make requests to our backend
// saves us from typing the full url every time

import axios from 'axios';

// the backend runs on port 8080
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// this sticks the login token onto every request
// so the backend knows who is making the request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
