// UserSidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";
import { assets } from "../../assets/assets_admin/assets.js";

const UserSidebar = () => {
  const { uToken } = useUserContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => setSidebarOpen(!sidebarOpen);

  // If no user token, don’t render the sidebar at all
  if (!uToken) return null;

  return (
    <>
      {/* Toggle button for smaller screens */}
      <button
        className="d-lg-none"
        style={{
          position: "fixed",
          top: "80px", // just below navbar
          left: "20px",
          zIndex: 10000,
          background: sidebarOpen
            ? "linear-gradient(to bottom, #40E0D0, #48D1CC)"
            : "none",
          border: "none",
          color: sidebarOpen ? "#fff" : "#000",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
        onClick={handleToggle}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar-overlay border-end shadow-sm bg-white ${
          sidebarOpen ? "" : "d-none d-lg-block"
        }`}
        style={{
          position: "fixed",
          top: "70px", // below fixed navbar (70px tall)
          left: 0,
          width: "200px", // sidebar width
          height: "calc(100vh - 70px)",
          overflowY: "auto",
          zIndex: 999,
        }}
      >
        <ul className="nav flex-column pt-3">
          {[
            { path: "/user-dashboard", icon: assets.home_icon, label: "Dashboard" },
            { path: "/myappointments", icon: assets.add_icon, label: "My Appointments" },
            { path: "/myprofile", icon: assets.people_icon, label: "My Profile" },
            { path: "/usersdoctorslist", icon: assets.people_icon, label: "Doctors Lists" },
          ].map((item, index) => (
            <li className="nav-item mb-2" key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link rounded p-2 d-flex align-items-center gap-2 ${
                    isActive ? "bg-info text-white" : "text-dark"
                  }`
                }
                style={{
                  fontSize: "15px",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => setSidebarOpen(false)}
              >
                <img src={item.icon} alt={item.label} style={{ width: "20px" }} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserSidebar;
