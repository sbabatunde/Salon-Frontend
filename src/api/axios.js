// import axios from 'axios';

// const apiClient = axios.create({
//     // baseURL: 'http://localhost:8000/api', // Laravel API base URL
//     baseURL:import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000' +'/api',
//     headers: {
//         'Content-Type': 'application/json',
//         // Accept: 'application/json',
//     },
//     withCredentials: true, // Required for Laravel Sanctum
// });


// // new addition 



// export default apiClient;


import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

// Add the same CSRF token interceptor
apiClient.interceptors.request.use((config) => {
  const token = getCookie('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default apiClient;