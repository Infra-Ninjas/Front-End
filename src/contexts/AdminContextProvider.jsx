import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Export AdminContext
export const AdminContext = createContext();  // ✅ Export this line

// ✅ Export hook
export const useAdminContext = () => useContext(AdminContext);

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('aToken');
        if (token) {
            setAToken(token);
        }
    }, []);

    const login = (token) => {
        setAToken(token);
        localStorage.setItem('aToken', token);
        navigate('/admin/dashboard');
    };

    const logout = () => {
        setAToken(null);
        localStorage.removeItem('aToken');
        navigate('/');
    };

    const value = { aToken, login, logout };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
