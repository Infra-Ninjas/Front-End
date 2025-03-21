import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDoctorContext } from "../../contexts/Doctors-Context/DoctorContextProvider.jsx";
import { assets } from "../../assets/assets_admin/assets.js"; // Or your actual assets location

const DoctorSidebar = () => {
  const { dToken } = useDoctorContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => setSidebarOpen(!sidebarOpen);

  // If no doctor is logged in, don't show sidebar
  if (!dToken) return null;

  return (
    <>
      <style>{`
        @media (max-width: 991px) {
          .sidebar-overlay {
            display: none;
          }
          .sidebar-overlay.open {
            display: block;
            position: fixed;
            top: 70px;
            left: 0;
            width: 200px;
            height: calc(100vh - 70px);
            z-index: 9999;
          }
        }
        @media (min-width: 992px) {
          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 70px;
            left: 0;
            width: 200px;
            height: calc(100vh - 70px);
            z-index: 999;
          }
        }
      `}</style>

      {/* Toggle for smaller screens */}
      <button
        className="d-lg-none"
        style={{
          position: "fixed",
          margin: "10px 0 0 60px",
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
          cursor: "pointer"
        }}
        onClick={handleToggle}
      >
        ☰
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`sidebar-overlay border-end shadow-sm overflow-auto ${
          sidebarOpen ? "open" : ""
        }`}
        style={{
          padding: "20px 0",
          backgroundColor: "#fff"
        }}
      >
        <ul className="nav flex-column pt-3">
          {[
            { path: "/doctorDashboard", icon: assets.home_icon, label: "Dashboard" },
            { path: "/patientslist", icon: assets.add_icon, label: "Patients List" },
            { path: "/doctorprofile", icon: assets.people_icon, label: "Doctor Profile" }
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
                  cursor: "pointer"
                }}
                onClick={() => setSidebarOpen(false)}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{ width: "20px" }}
                />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DoctorSidebar;
