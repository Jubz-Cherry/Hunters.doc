import axios from 'axios';

const configuredApiUrl = process.env.REACT_APP_API_URL;
const localApiUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(configuredApiUrl || '');
const baseURL = process.env.NODE_ENV === 'production'
    ? (!configuredApiUrl || localApiUrl ? 'https://hunters-doc.onrender.com' : configuredApiUrl)
    : (configuredApiUrl || 'http://localhost:3001');

const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token && !['/login', '/register'].includes(config.url)) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }

        return Promise.reject(error);
    }
);

export default API;
