import React from 'react';
import UserNavbar from '../../components/Users-Components/UsersNavbar';
import UserSidebar from '../../components/Users-Components/UsersSidebar';

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <UserSidebar />
      <div className="user-layout-wrapper">
        <div className="user-content">
          {children}
        </div>
      </div>

      <style>{`
        .user-layout-wrapper {
          margin-top: 60px;          /* Matches navbar height */
          margin-left: 220px;        /* Matches sidebar width */
          padding: 40px 20px;        /* Top/bottom & side padding */
          min-height: 100vh;
          background-color: #f9f9f9;
          display: flex;
          justify-content: center;
        }

        .user-content {
          width: 100%;
          max-width: 1200px;         /* Constrain the content */
        }

        @media (max-width: 991px) {
          .user-layout-wrapper {
            margin-left: 0;
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
