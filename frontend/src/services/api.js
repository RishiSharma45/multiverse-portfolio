import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_PORTFOLIO_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;