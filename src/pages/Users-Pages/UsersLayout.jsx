import React from 'react';
import UserNavbar from '../../components/Users-Components/UsersNavbar';
import UserSidebar from '../../components/Users-Components/UsersSidebar';

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <UserSidebar />
      <div className="user-content">
        {children}
      </div>
      <style>{`
        .user-content {
          /* Decrease or remove the top margin to reduce empty space */
          margin-top: 70px;    /* was 70px */
          margin-left: 200px; /* keep the sidebar offset */
          padding: 20px;
          min-height: 100vh;
          background-color: #f5f5f5;
          transition: margin 0.3s ease;
        }
        @media (max-width: 991px) {
          .user-content {
            margin-left: 50 !important;
          }
        }
      `}</style>
    </>
  );
};

export default UserLayout;
