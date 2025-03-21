import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAdminContext } from '../../contexts/Admin-Context/AdminContextProvider.jsx';
import { assets } from '../../assets/assets_admin/assets.js';

const SideBar = () => {
  const { aToken } = useAdminContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
            top: 70px;  /* below the 70px navbar */
            left: 0;
            width: 200px;  /* sidebar width */
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

      {aToken && (
        <>
          {/* Toggle Button for Mobile */}
          <button
            className="d-lg-none"
            style={{
              position: 'fixed',
              margin: '10px 0 0 60px',
              zIndex: 10000,
              background: sidebarOpen
                ? 'linear-gradient(to bottom, #40E0D0, #48D1CC)'
                : 'none',
              border: 'none',
              color: sidebarOpen ? '#fff' : '#000',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={handleToggle}
          >
            ☰
          </button>

          {/* Sidebar Navigation */}
          <div
            className={`sidebar-overlay border-end shadow-sm overflow-auto ${
              sidebarOpen ? 'open' : ''
            }`}
            style={{
              padding: '20px 0',
              backgroundColor: '#fff'
            }}
          >
            <ul className="nav flex-column pt-3">
              {[
                { path: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
                { path: '/allappointments', icon: assets.add_icon, label: 'Appointments' },
                { path: '/AddDoctor', icon: assets.add_icon, label: 'Add Doctor' },
                { path: '/DoctorsList', icon: assets.people_icon, label: 'Doctors List' }
              ].map((item, index) => (
                <li className="nav-item mb-2" key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link rounded p-2 d-flex align-items-center gap-2 ${
                        isActive ? 'bg-info text-white' : 'text-dark'
                      }`
                    }
                    style={{
                      fontSize: '15px',
                      padding: '12px 18px',
                      borderRadius: '10px',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      style={{ width: '20px' }}
                    />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
