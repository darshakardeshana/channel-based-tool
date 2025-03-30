// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Retrieve token from localStorage if available
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  // Optionally, you can fetch the user profile when token changes
  useEffect(() => {
    // For example, if token exists, fetch user profile and update state
    // You can call userService.getProfile() here if desired.
  }, [token]);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      // Save token in localStorage and state
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.userDto);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
