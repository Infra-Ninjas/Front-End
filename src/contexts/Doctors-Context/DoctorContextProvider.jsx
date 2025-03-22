import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  // Authentication state
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || null);
  const [role, setRole] = useState(localStorage.getItem("doctorRole") || null);
  const [docId, setDocId] = useState(localStorage.getItem("docId") || null);
  const [doctors, setDoctors] = useState([]); // Store all doctors

  const doctorserviceurl = import.meta.env.VITE_DOCTORSERVICE_URL;
  const navigate = useNavigate();

  // Ensure docId is stored properly
  useEffect(() => {
    const storedDocId = localStorage.getItem("docId");
    if (storedDocId) {
      setDocId(storedDocId);
      console.log("Loaded docId from localStorage:", storedDocId);
    }
  }, []);

  // Fetch all doctors from backend
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${doctorserviceurl}/api/doctor/list`);
      if (data && Array.isArray(data.doctors)) {
        setDoctors(data.doctors);
      } else {
        console.error("Unexpected doctors API response:", data);
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  // Fetch doctors on mount
  useEffect(() => {
    getAllDoctors();
  }, []);

  // Login function (stores docId properly)
  const login = (data, successMessage = "Doctor login successful!") => {
    if (data && data.token && data.role) {
      setDToken(data.token);
      setRole(data.role);
      localStorage.setItem("dToken", data.token);
      localStorage.setItem("doctorRole", data.role);

      if (data.docId) {
        setDocId(data.docId);
        localStorage.setItem("docId", data.docId);
        console.log("✅ Stored docId in localStorage:", data.docId);
      } else {
        console.error("🚨 No docId received in login response");
      }

      toast.success(successMessage);
      navigate("/doctorDashboard");
    } else {
      toast.error("Invalid login response!");
    }
  };

  // Logout function
  const logout = () => {
    setDToken(null);
    setRole(null);
    setDocId(null);
    localStorage.removeItem("dToken");
    localStorage.removeItem("doctorRole");
    localStorage.removeItem("docId");
    toast.success("Logout successful!");
    navigate("/doctor-login");
  };

  return (
    <DoctorContext.Provider
      value={{
        dToken,
        role,
        docId,
        doctors, // Provide the doctors list
        login,
        logout,
        getAllDoctors,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

// Custom hook to use DoctorContext
export function useDoctorContext() {
  return useContext(DoctorContext);
}
