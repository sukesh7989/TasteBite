import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-backend.onrender.com' // Deployed backend URL
    : 'http://localhost:5000'; // Local backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;