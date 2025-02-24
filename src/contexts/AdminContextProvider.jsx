// AdminContextProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Create context (NO EXPORT)
const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || null);
    const [navbarRefresh, setNavbarRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'aToken' && event.storageArea === localStorage) {
                if (!event.newValue) {
                    setAToken(null);
                    navigate('/');
                    setNavbarRefresh((prev) => !prev);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [navigate]);

    useEffect(() => {
        setNavbarRefresh((prev) => !prev);
    }, [aToken]);

    const login = (token) => {
        setAToken(token);
        localStorage.setItem('aToken', token);
        navigate('/Admin-Dashboard');
        setNavbarRefresh((prev) => !prev);
    };

    const logout = () => {
        setAToken(null);
        localStorage.removeItem('aToken');
        navigate('/');
        setNavbarRefresh((prev) => !prev);
    };

    return (
        <AdminContext.Provider value={{ aToken, navbarRefresh, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};

// ✅ Export the provider
export default AdminContextProvider;

// ✅ Export the hook correctly
export const useAdminContext = () => useContext(AdminContext);
