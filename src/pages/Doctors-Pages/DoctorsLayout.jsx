import React from 'react';
import DoctorNavbar from '../../components/Doctors-Components/DoctorsNavbar';
import DoctorSidebar from '../../components/Doctors-Components/DoctorsSidebar';

const DoctorLayout = ({ children }) => {
  return (
    <>
      <DoctorNavbar />
      <DoctorSidebar />
      {/* Main content container with responsive offsets */}
      <div className="doctor-content">
        {children}
      </div>
      <style>{`
        .doctor-content {
          margin-top: 70px;    /* fixed navbar height */
          margin-left: 200px;  /* fixed sidebar width on larger screens */
          padding: 20px;
          min-height: 100vh;
          background-color: #f5f5f5;
          transition: margin 0.3s ease;
        }
        @media (max-width: 991px) {
          .doctor-content {
            margin-left: 0;  /* use full width on small screens */
          }
        }
      `}</style>
    </>
  );
};

export default DoctorLayout;
