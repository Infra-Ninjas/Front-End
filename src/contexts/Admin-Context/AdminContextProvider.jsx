// AdminContextProvider.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const adminserviceurl = import.meta.env.VITE_ADMINSERVICE_URL;

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || null);
  const [doctors, setDoctors] = useState([]);
  const [navbarRefresh, setNavbarRefresh] = useState(false);
  const navigate = useNavigate();

  const getAllDoctors = async () => {
    try {
      // Request the list of doctors
      const { data } = await axios.get(
        adminserviceurl + "/api/doctors/all-doctors",
        {
          headers: {
            Authorization: `Bearer ${aToken}`
          }
        }
      );
      console.log("Doctors data:", data);
      // Directly set the doctors to whatever the backend sends (an array)
      setDoctors(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailibility = async (docID) => {
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
        getAllDoctors();
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

  // Fetch the list of doctors only when aToken is available (on mount or when aToken changes)
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
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
        doctors,
        getAllDoctors,
        changeAvailibility,
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
