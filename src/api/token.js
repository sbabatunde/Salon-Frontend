// import axios from 'axios';

// const apiClient = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
//     withCredentials: true, // Required for Laravel Sanctum
//     // withXSRFToken: true,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json', // Add this line
//     },
// });
// export default apiClient;


import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// 🔥 Automatically attach CSRF token from cookie
apiClient.interceptors.request.use((config) => {
  const token = getCookie('XSRF-TOKEN'); // manually get it from document.cookie
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return config;
});

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

export default apiClient;
