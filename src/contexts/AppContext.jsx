import React, { createContext, useState } from "react";   // Import tools for the toolbox
import { doctors, specialityData } from "../assets/assets_frontend/assets";  // Import the data from your assets.js

export const AppContext = createContext();  // Create the toolbox

const AppProvider = ({ children }) => {
  const [doctorList, setDoctorList] = useState(doctors);  // Store doctors in the toolbox
  const [specialities, setSpecialities] = useState(specialityData);  // Store specialties too

  return (
    <AppContext.Provider value={{ doctorList, specialities }}>  {/* Make these tools available */}
      {children}  {/* This represents the pages of your app */}
    </AppContext.Provider>
  );
};

export default AppProvider;  // Export the toolbox so other files can use it
