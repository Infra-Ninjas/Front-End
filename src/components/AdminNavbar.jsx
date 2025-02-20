import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../contexts/AdminContextProvider"; // ✅ Use the hook
import { assets } from "../assets/assets_admin/assets.js"; // ✅ Named import

const AdminNavbar = () => {
  const { aToken, logout } = useAdminContext(); // ✅ Use context values
  const navigate = useNavigate(); // ✅ Use for navigation

  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white">
      {/* ✅ Left Section - Logo */}
      <div className="d-flex align-items-center gap-2 text-muted">
        {/* ✅ Logo */}
        <img
          className="img-fluid"
          src={assets.OurLogo}
          alt="Admin Logo"
          style={{
            width: "150px", // ✅ Smaller logo size
            height: "auto",
            cursor: "pointer",
          }}
          onClick={() => navigate("/admin/dashboard")} // ✅ Navigate on logo click
        />

        {/* ✅ Admin Panel Label */}
        <p
          className="text-white fw-semibold m-0 d-inline-block"
          style={{
            background: "linear-gradient(to right, #22c1c3, #40e0d0)", // ✅ Turquoise gradient
            borderRadius: "20px", // ✅ Rounded design
            padding: "6px 12px", // ✅ Smaller padding
            fontSize: "14px", // ✅ Smaller text size
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Admin Panel
        </p>
      </div>

      {/* ✅ Right Section - Logout Button */}
      <div>
        {aToken && (
          <button
            onClick={logout} // ✅ Call logout directly
            className="btn btn-sm text-white fw-semibold"
            style={{
              background: "linear-gradient(to right, #22c1c3, #40e0d0)", // ✅ Turquoise gradient
              borderRadius: "20px", // ✅ Rounded button
              padding: "6px 16px", // ✅ Smaller padding
              fontSize: "14px", // ✅ Smaller text size
              border: "none",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
