// DoctorLayout.jsx
import React from 'react';
import DoctorNavbar from '../../components/Doctors-Components/DoctorsNavbar';
import DoctorSidebar from '../../components/Doctors-Components/DoctorsSidebar';

const DoctorLayout = ({ children }) => {
  return (
    <>
      <DoctorNavbar />
      <DoctorSidebar />
      {/* Main content container with offsets */}
      <div
        style={{
          marginTop: "70px",    // Offset for fixed navbar
          marginLeft: "200px",  // Offset for fixed sidebar
          padding: "20px",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5"
        }}
      >
        {children}
      </div>
    </>
  );
};

export default DoctorLayout;
