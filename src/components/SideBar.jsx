// Sidebar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useAdminContext } from '../contexts/AdminContextProvider';
import { assets } from '../assets/assets_admin/assets.js';

const SideBar = () => {
    const { aToken } = useAdminContext();

    return (
        <div className="d-flex">
            {aToken && (
                <div className="sidebar bg-white border-end shadow-sm overflow-auto"
                    style={{
                        width: "220px",
                        height: "calc(100vh - 70px)", // ✅ Sidebar height = viewport height - navbar height
                        position: "fixed",
                        top: "70px",                  // ✅ Sidebar starts below navbar
                        left: 0,
                        zIndex: 999,
                        padding: "20px 0",
                    }}
                >
                    <ul className="nav flex-column pt-3">
                        {[
                            { path: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
                            { path: "/allappointments", icon: assets.add_icon, label: "Appointments" },
                            { path: "/AddDoctor", icon: assets.add_icon, label: "Add Doctor" },
                            { path: "/DoctorsList", icon: assets.people_icon, label: "Doctors List" }
                        ].map((item, index) => (
                            <li className="nav-item mb-2" key={index}>
                                <NavLink to={item.path}
                                    className={({ isActive }) => `nav-link rounded p-2 d-flex align-items-center gap-2 ${isActive ? "bg-info text-white" : "text-dark"}`}
                                    style={{
                                        fontSize: "15px",
                                        padding: "12px 18px",
                                        borderRadius: "10px",
                                        transition: "all 0.3s",
                                        cursor: "pointer"
                                    }}
                                >
                                    <img src={item.icon} alt={item.label} style={{ width: "20px" }} />
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="content"
                style={{
                    marginLeft: aToken ? "220px" : "0px",
                    width: aToken ? "calc(100% - 220px)" : "100%",
                    padding: "3px 4px",
                    paddingTop: "1px", // ✅ Ensure content starts below navbar
                    backgroundColor: "#transparent",
                    minHeight: "10vh"
                }}
            >
                {/* Page content goes here */}
            </div>
        </div>
    );
};

export default SideBar;
