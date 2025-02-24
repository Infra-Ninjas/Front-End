import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../contexts/AdminContextProvider";
import { assets } from "../assets/assets_admin/assets.js";

const AdminNavbar = () => {
    const { aToken, logout } = useAdminContext();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm fixed-top"
            style={{ height: "70px", zIndex: 1000 }}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <img
                        src={assets.OurLogo}
                        alt="Admin Logo"
                        style={{ width: "150px", height: "auto", cursor: "pointer" }}
                        onClick={() => navigate("/admin-dashboard")}
                    />
                    <span className="text-white fw-semibold d-inline-block"
                        style={{
                            background: "linear-gradient(to right, #22c1c3, #40e0d0)",
                            borderRadius: "20px",
                            padding: "6px 12px",
                            fontSize: "16px",
                            border: "none",
                            cursor: "pointer",
                            transition: "0.3s"
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                        Admin Panel
                    </span>
                </div>

                {aToken && (
                    <button
                        onClick={logout} // ✅ No reload or delay
                        className="btn btn-sm text-white"
                        style={{
                            background: "linear-gradient(to right, #22c1c3, #40e0d0)",
                            borderRadius: "20px",
                            padding: "6px 16px",
                            fontSize: "14px",
                            border: "none"
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default AdminNavbar;
