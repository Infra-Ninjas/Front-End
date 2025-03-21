import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [uToken, setUToken] = useState(localStorage.getItem("uToken") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [uId, setUId] = useState(localStorage.getItem("uId") || null); // User ID stored separately

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "uToken" && event.storageArea === localStorage) {
        if (!event.newValue) {
          setUToken(null);
          setRole(null);
          setUId(null);
          navigate("/");
        }
      }
      if (event.key === "role" && event.storageArea === localStorage) {
        if (!event.newValue) {
          setRole(null);
        }
      }
      if (event.key === "uId" && event.storageArea === localStorage) {
        if (!event.newValue) {
          setUId(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  // Login function
  const login = (data, successMessage = "Login successful!") => {
    if (data && data.token && data.role && data.userId) {
      setUToken(data.token);
      setRole(data.role);
      setUId(data.userId);

      localStorage.setItem("uToken", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("uId", data.userId);

      toast.success(successMessage);
      navigate("/user-dashboard");
    } else {
      toast.error("Invalid login response!");
    }
  };

  // Logout function
  const logout = () => {
    setUToken(null);
    setRole(null);
    setUId(null);
    localStorage.removeItem("uToken");
    localStorage.removeItem("role");
    localStorage.removeItem("uId");
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        uToken,
        role,
        uId, // Now providing uId
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export function useUserContext() {
  return useContext(UserContext);
}
