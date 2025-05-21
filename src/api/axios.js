import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'http://localhost:8000/api' || 'https://precious-hairmpire.up.railway.app/', // Laravel API base URL
    baseURL:import.meta.env.VITE_API_BASE_URL +'/api' || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        // Accept: 'application/json',
    },
    withCredentials: true, // Required for Laravel Sanctum
});


export default apiClient;
