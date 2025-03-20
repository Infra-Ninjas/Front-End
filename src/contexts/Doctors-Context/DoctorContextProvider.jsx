// DoctorContextProvider.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  // Authentication state
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || null);
  const [role, setRole] = useState(localStorage.getItem("doctorRole") || null);
  
  // Doctors list state
  const [doctors, setDoctors] = useState([]);
  const doctorserviceurl = import.meta.env.VITE_DOCTORSERVICE_URL;
  
  const navigate = useNavigate();

  // Listen to storage changes for auth info
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "dToken" && event.storageArea === localStorage) {
        if (!event.newValue) {
          setDToken(null);
          setRole(null);
          navigate("/doctor-login"); // Redirect to login if token is removed
        }
      }
      if (event.key === "doctorRole" && event.storageArea === localStorage) {
        if (!event.newValue) {
          setRole(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  // Login function
  const login = (data, successMessage = "Doctor login successful!") => {
    if (data && data.token && data.role) {
      setDToken(data.token);
      setRole(data.role);
      localStorage.setItem("dToken", data.token);
      localStorage.setItem("doctorRole", data.role);
      toast.success(successMessage);
      navigate("/doctorDashboard"); // Adjust as needed
    } else {
      toast.error("Invalid login response!");
    }
  };

  // Logout function
  const logout = () => {
    setDToken(null);
    setRole(null);
    localStorage.removeItem("dToken");
    localStorage.removeItem("doctorRole");
    toast.success("Logout successful!");
    navigate("/doctor-login");
  };

  // Fetch doctors data from API
  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const { data } = await axios.get(`${doctorserviceurl}/api/doctor/list`);
        if (data && Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
        } else {
          console.error("Unexpected API response format", data);
          setDoctors([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]); // Ensure doctors is always an array
      }
    };
    getAllDoctors();
  }, [doctorserviceurl]);

  return (
    <DoctorContext.Provider
      value={{
        dToken,
        role,
        login,
        logout,
        doctors,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

// Custom hook to consume the context
export function useDoctorContext() {
  return useContext(DoctorContext);
}
