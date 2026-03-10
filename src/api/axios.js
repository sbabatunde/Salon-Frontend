import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api' || 'http://localhost:8000/api',
  withCredentials: true,
});

// Fix the interceptor to preserve multipart/form-data
apiClient.interceptors.request.use((config) => {
  const token = getCookie('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  
  // Only set JSON content type if it's not FormData
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  // If it's FormData, let the browser set the Content-Type automatically
  // This is crucial for file uploads with proper boundary
  
  return config;
});

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default apiClient;