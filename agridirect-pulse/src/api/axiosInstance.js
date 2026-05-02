import axios from 'axios';

// JWT stored in memory (not localStorage for security)
let jwtToken = null;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

// Request interceptor - add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      jwtToken = null;
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export helper to set JWT
export const setJWT = (token) => {
  jwtToken = token;
};

// Export helper to get JWT
export const getJWT = () => jwtToken;

export default axiosInstance;
