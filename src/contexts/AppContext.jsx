import React, { createContext, useEffect, useState } from "react";
import { doctors, specialityData } from "../assets/assets_frontend/assets";  // Import doctors and specialties
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // Use the imported doctors as the initial value
  const [doctorList, setDoctorList] = useState(doctors);
  const [specialities, setSpecialities] = useState(specialityData);

  const adminserviceurl = import.meta.env.VITE_ADMINSERVICE_URL;

  /* 
  // When the backend API is ready, uncomment this code:
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(adminserviceurl + "/api/doctor/list"); // API for doctors list
      if (data.success) {
        setDoctorList(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);
  */

  return (
    <AppContext.Provider value={{ doctorList, specialities }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
