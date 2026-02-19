// axios is like a helper that makes it easy to send requests to our backend
import axios from 'axios';

// this sets the base URL so we don't have to type localhost:8080/api every time
// our Spring Boot backend runs on port 8080
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// this runs before every request we make
// it grabs the login token we saved and attaches it so the backend knows who we are
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// we export this so any page in our app can use it to talk to the backend
export default api;