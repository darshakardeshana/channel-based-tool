import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const userData = await authService.getCurrentUser(token);
                    if (userData) {
                        setUser(userData);
                    } else {
                        setUser(null);
                        localStorage.removeItem('token');
                        setToken(null);
                    }
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setUser(null);
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
        };

        fetchUser();
    }, [token]);

    const login = async (credentials) => {
        try {
            const data = await authService.login(credentials);
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