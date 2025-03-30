// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// const authService = {
//   login: async (credentials) => {
//     const response = await axios.post(`${API_URL}/auth/login`, credentials);
//     return response.data;
//   },
//   register: async (userData) => {
//     const response = await axios.post(`${API_URL}/auth/register`, userData);
//     return response.data;
//   },
// };

// export default authService;

import api from './api';

const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    console.log(response?.data);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

export default authService;
