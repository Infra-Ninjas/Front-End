import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const adminserviceurl = import.meta.env.VITE_ADMINSERVICE_URL;

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || null);
  const [navbarRefresh, setNavbarRefresh] = useState(false);
  const navigate = useNavigate();

  const changeAvailability = async (docID) => {
    try {
      const { data } = await axios.post(
        adminserviceurl + "api/admin/change-availability",
        { docID },
        {
          headers: {
            Authorization: `Bearer ${aToken}`
          }
        }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
    if (token) {
      setAToken(token);
      localStorage.setItem("aToken", token);
      toast.success("Login successful!", { style: { borderBottom: "3px solid #4CAF50" } });
      navigate("/admin-dashboard");
      setNavbarRefresh((prev) => !prev);
    } else {
      toast.error("Invalid credentials!", { style: { borderBottom: "3px solid red" } });
    }
  };

  const logout = () => {
    setAToken(null);
    localStorage.removeItem('aToken');
    toast.success("Logout successful!", { style: { borderBottom: "3px solid #4CAF50" } });
    navigate('/');
    setNavbarRefresh((prev) => !prev);
  };

  return (
    <AdminContext.Provider
      value={{
        aToken,
        changeAvailability,
        navbarRefresh,
        toast,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
export const useAdminContext = () => useContext(AdminContext);
