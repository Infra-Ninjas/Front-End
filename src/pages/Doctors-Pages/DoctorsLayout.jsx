import React from 'react';
import DoctorNavbar from '../../components/Doctors-Components/DoctorsNavbar';
import DoctorSidebar from '../../components/Doctors-Components/DoctorsSidebar';

const DoctorLayout = ({ children }) => {
  return (
    <>
      <DoctorNavbar />
      <div className="doctor-layout-container">
        <DoctorSidebar />
        <div className="doctor-content-wrapper">
          <div className="doctor-content">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        .doctor-layout-container {
          display: flex;
          margin-top: 60px; /* Height of the navbar */
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .doctor-content-wrapper {
          flex: 1;
          padding: 40px 30px;
          display: flex;
          justify-content: center;
        }

        .doctor-content {
          width: 100%;
          max-width: 1200px;
        }

        @media (max-width: 991px) {
          .doctor-layout-container {
            flex-direction: column;
            margin-left: 0;
          }

          .doctor-content-wrapper {
            padding: 20px;
            justify-content: flex-start;
          }

          .doctor-content {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default DoctorLayout;
