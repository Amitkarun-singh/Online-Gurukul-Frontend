import axios from 'axios';

// Configure axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust the base URL as per your backend
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Use token for authenticated routes
  }
});

export default api;
