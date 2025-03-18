import React from 'react';
import UserNavbar from '../../components/Users-Components/UsersNavbar';
import UserSidebar from '../../components/Users-Components/UsersSidebar';

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <UserSidebar />
      {/* Main content container with responsive offsets */}
      <div className="user-content">
        {children}
      </div>
      <style>{`
        .user-content {
          margin-top: 70px;    /* fixed navbar height */
          margin-left: 200px;  /* fixed sidebar width on larger screens */
          padding: 20px;
          min-height: 100vh;
          background-color: #f5f5f5;
          transition: margin 0.3s ease;
        }
        @media (max-width: 991px) {
          .user-content {
            margin-left: 0;  /* remove left offset on small screens */
          }
        }
      `}</style>
    </>
  );
};

export default UserLayout;
