import React from 'react';
import AdminNavbar from "../../components/Admins-Components/AdminNavbar";
import SideBar from "../../components/Admins-Components/SideBar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <div className="admin-layout-container">
        <AdminSidebar />
        <div className="admin-content-wrapper">
          <div className="admin-inner-content">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        .admin-layout-container {
          display: flex;
          margin-top: 60px; /* Height of the navbar */
          min-height: 100vh;
          background-color: #f9f9f9;
        }

        .admin-content-wrapper {
          flex: 1;
          padding: 40px 30px;
          display: flex;
          justify-content: center;
        }

        .admin-inner-content {
          width: 100%;
          max-width: 1200px;
        }

        @media (max-width: 991px) {
          .admin-layout-container {
            flex-direction: column;
            margin-left: 0;
          }

          .admin-content-wrapper {
            padding: 20px;
            justify-content: flex-start;
          }

          .admin-inner-content {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLayout;
