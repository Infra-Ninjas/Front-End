import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// We'll assume the doctor login endpoint is at VITE_DOCTORSERVICE_URL
// But we won't make the actual request here—just store the token/role.
const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || null);
  const [role, setRole] = useState(localStorage.getItem("doctorRole") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "dToken" && event.storageArea === localStorage) {
        if (!event.newValue) {
          setDToken(null);
          setRole(null);
          navigate("/doctor-login"); // Send them to doctor login if token is removed
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

  // login function expects { token, role } from your DoctorLogin API call
  // successMessage is optional if you want a custom toast
  const login = (data, successMessage = "Doctor login successful!") => {
    if (data && data.token && data.role) {
      setDToken(data.token);
      setRole(data.role);
      localStorage.setItem("dToken", data.token);
      localStorage.setItem("doctorRole", data.role);
      toast.success(successMessage);
      navigate("/doctorDashboard"); // Adjust to your doctor dashboard route
    } else {
      toast.error("Invalid login response!");
    }
  };

  const logout = () => {
    setDToken(null);
    setRole(null);
    localStorage.removeItem("dToken");
    localStorage.removeItem("doctorRole");
    toast.success("Logout successful!");
    navigate("/doctor-login");
  };

  return (
    <DoctorContext.Provider
      value={{
        dToken,
        role,
        login,
        logout
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

// Named hook export, just like we did for user context
export function useDoctorContext() {
  return useContext(DoctorContext);
}
