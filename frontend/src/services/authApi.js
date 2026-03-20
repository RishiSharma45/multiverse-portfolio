import axios from 'axios';

const AuthAPI = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL,
});

export default AuthAPI;