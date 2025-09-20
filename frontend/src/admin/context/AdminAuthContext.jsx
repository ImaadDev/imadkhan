import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const BackendUrl = import.meta.env.VITE_BACKEND_URL;

    // Ensure axios sends cookies with requests
    axios.defaults.withCredentials = true;

    // Get current logged-in user from backend
    const getCurrentUser = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/api/users/me`, { withCredentials: true });
            return response.data; // Expected: { id, name, email, role, ... }
        } catch (error) {
            console.error('Error fetching current admin user:', error.response?.data || error.message);
            return null;
        }
    };

    // Load user on app start
    useEffect(() => {
        const loadUser = async () => {
            setIsLoading(true);
            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
            setIsLoading(false);
        };
        loadUser();
    }, []);

    // Register (Admin specific, if needed)
    const register = async (name, email, password) => {
        setIsLoading(true);
        try {
            await axios.post(
                `${BackendUrl}/api/users/register`,
                { name, email, password },
                { withCredentials: true }
            );
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setIsLoggedIn(true);
            navigate('/admin'); // Redirect to admin dashboard
        } catch (error) {
            console.error('Admin Registration failed:', error.response?.data || error.message);
            setIsLoggedIn(false);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout (Admin specific)
    const logout = async () => {
        setIsLoading(true);
        try {
            await axios.get(`${BackendUrl}/api/users/logout`, { withCredentials: true });
            setUser(null);
            setIsLoggedIn(false);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Admin Logout failed:', error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AdminAuthContext.Provider value={{ user, BackendUrl, isLoggedIn, isLoading, register, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export default AdminAuthContext;
