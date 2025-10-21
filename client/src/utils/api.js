import axios from 'axios';
import baseUrl from '../appConfig';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // This is crucial for HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add any additional headers if needed
api.interceptors.request.use(
  (config) => {
    // You can add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Only redirect if we're not on the login/register pages and not on the home page
      // This prevents redirect loops during initial auth check
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/') {
        // Clear any local storage data
        localStorage.clear();
        
        // Redirect to login page
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API functions
export const getSavedPosts = async (userId) => {
  try {
    const response = await api.get(`/lists/saved/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    throw error;
  }
};

export default api;
