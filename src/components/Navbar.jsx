import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      <img
        src={assets.OurLogo}
        className="w-44 cursor-pointer"
        alt=""
        style={{ transition: "transform 0.3s ease-in-out" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        {["/", "/contact", "/about", "/doctors"].map((path, index) => (
          <NavLink key={index} to={path}>
            <li
              className="py-1"
              style={{
                transition: "color 0.3s ease-in-out",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "500",
                color: "#2c3e50",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#007777")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              {path.replace("/", "").toUpperCase() || "HOME"}
            </li>
            <hr className="border-none h-0.5 bg-green-700 w-3/5 m-auto hidden hover:block" />
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <NavLink to="/login">
          <button
            className="px-3 py-3 rounded-full font-semibold my-2 mx-4"
            style={{
              color: "#40E0D0",
              paddingRight: "80px",
              padding: "12px 16px",
              borderRadius: "50px",
              fontWeight: "500",
              fontFamily: "'Roboto', sans-serif",
              margin: "8px 16px",
              backgroundColor: "#f0f0f0",
              border: "none",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#008c8c";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.color = "#40E0D0";
            }}
          >
            Create Account
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
