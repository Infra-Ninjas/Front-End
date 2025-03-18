// UserLayout.jsx
import React from 'react';
import UserNavbar from '../../components/Users-Components/UsersNavbar';
import UserSidebar from '../../components/Users-Components/UsersSidebar';

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <UserSidebar />
      {/* Main content offset by the fixed navbar (70px) and sidebar (200px) */}
      <div
        style={{
          marginTop: "70px",
          marginLeft: "200px",
          padding: "20px",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default UserLayout;
