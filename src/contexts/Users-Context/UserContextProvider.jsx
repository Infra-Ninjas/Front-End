import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const UserContext = createContext();

// Use your USERSERVICE URL here:
const userserviceurl = import.meta.env.VITE_USERSERVICE_URL;

const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem('uToken') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [doctors, setDoctors] = useState([]);
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

  // API call to fetch all doctors using USERSERVICE URL
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        userserviceurl + "/api/user/list-doctors",
        {
          headers: {
            Authorization: `Bearer ${uToken}`
          }
        }
      );
      console.log("Doctors data:", data);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error("Failed to fetch doctors list");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // API call to toggle a doctor's availability (example implementation)
  const changeAvailability = async (doctorId) => {
    try {
      await axios.put(
        userserviceurl + `/api/doctors/${doctorId}/toggle-availability`,
        {},
        {
          headers: {
            Authorization: `Bearer ${uToken}`
          }
        }
      );
      toast.success("Availability updated!");
      // Refresh the doctors list after updating availability
      getAllDoctors();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        uToken,
        role,
        login,
        logout,
        doctors,
        getAllDoctors,
        changeAvailability,
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
