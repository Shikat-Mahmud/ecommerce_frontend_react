// src/services/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://your-laravel-backend-url/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        console.error('Login error', error);
    }
};

export const logout = async () => {
    try {
        await api.post('/logout');
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout error', error);
    }
};

export const getUser = async () => {
    try {
        const response = await api.get('/user');
        return response.data;
    } catch (error) {
        console.error('Get user error', error);
    }
};

export default api;
