// doctorappcontext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DoctorsContext = createContext();

const DoctorsContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const doctorserviceurl = import.meta.env.VITE_DOCTORSERVICE_URL;

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
        setDoctors([]); // Ensure it's always an array to prevent .map() errors
      }
    };
    getAllDoctors();
  }, [doctorserviceurl]);

  return (
    <DoctorsContext.Provider value={{ doctors }}>
      {children}
    </DoctorsContext.Provider>
  );
};

export default DoctorsContextProvider;
