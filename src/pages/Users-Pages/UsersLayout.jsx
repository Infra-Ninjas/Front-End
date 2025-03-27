import React from 'react';
import UserNavbar from '../../components/Users-Components/UsersNavbar';
import UserSidebar from '../../components/Users-Components/UsersSidebar';

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <div className="user-layout-container">
        <div className="user-sidebar">
          <UserSidebar />
        </div>
        <div className="user-content-wrapper">
          <div className="user-content">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        .user-layout-container {
          display: flex;
          margin-top: 60px; /* Height of the navbar */
          min-height: 100vh;
          background-color: #f9f9f9;
        }

        .user-sidebar {
          min-width: 240px;
          max-width: 260px;
        }

        .user-content-wrapper {
          flex: 1;
          padding: 40px 30px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .user-content {
          width: 100%;
          max-width: 1000px;
        }

        @media (max-width: 991px) {
          .user-layout-container {
            flex-direction: column;
          }

          .user-sidebar {
            width: 100%;
          }

          .user-content-wrapper {
            padding: 20px;
            justify-content: flex-start;
          }

          .user-content {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default UserLayout;
