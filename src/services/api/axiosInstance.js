import axios from 'axios';

// You might store this in .env, e.g. process.env.REACT_APP_API_BASE_URL
const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://ecommerce-backend-8xv8.onrender.com',
    withCredentials: true,
});

// Attach interceptors for auth tokens or logging
// we can still attach interceptors if needed:
axiosClient.interceptors.request.use(
    (config) => {
        // If you also store a token in localStorage for any reason:
        const token = localStorage.getItem('token');
        if (token) {
            // Typically not needed if your backend relies *only* on the HTTP-only cookie,
            // but if your server also checks Authorization headers, you can do:
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// You can also attach a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        // console.log('[Response]', response);
        return response;
    },
    (error) => {
        // You might handle global 401/403 here
        // console.error('[Response Error]', error);
        return Promise.reject(error);
    }
);

export default axiosClient;
