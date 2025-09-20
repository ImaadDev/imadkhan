import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    // Ensure axios sends cookies with requests
    axios.defaults.withCredentials = true;
   

    // Login
    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${BackendUrl}/api/users/login`,
                { email, password },
                { withCredentials: true } // Important for HTTP-only cookie
            );
            setUser(response.data.user); // Assuming user data is returned on login
            navigate('/admin/blogs');
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, BackendUrl, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
