import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem('uToken') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'uToken' && event.storageArea === localStorage) {
        if (!event.newValue) {
          setUToken(null);
          setRole(null);
          navigate('/');
        }
      }
      if (event.key === 'role' && event.storageArea === localStorage) {
        if (!event.newValue) {
          setRole(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  // Updated login function: accepts a custom success message.
  const login = (data, successMessage = "Login successful!") => {
    if (data && data.token && data.role) {
      setUToken(data.token);
      setRole(data.role);
      localStorage.setItem('uToken', data.token);
      localStorage.setItem('role', data.role);
      toast.success(successMessage);
      navigate("/user-dashboard"); // Adjust this route as needed.
    } else {
      toast.error("Invalid login response!");
    }
  };

  const logout = () => {
    setUToken(null);
    setRole(null);
    localStorage.removeItem('uToken');
    localStorage.removeItem('role');
    toast.success("Logout successful!");
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        uToken,
        role,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

// Export the hook as a function declaration for consistent exports:
export function useUserContext() {
  return useContext(UserContext);
}
