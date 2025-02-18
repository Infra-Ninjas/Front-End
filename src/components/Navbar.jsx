import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Function to check screen width and set visibility of the menu icon
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-md navbar-light bg-white border-bottom shadow-sm"
      style={{
        padding: "15px 0",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center w-100">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand">
          <img
            src={assets.OurLogo}
            alt="HealthSync Logo"
            className="img-fluid"
            style={{
              width: "180px",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </NavLink>

        {/* Mobile Menu Icon */}
        {isMobile && (
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {/* Navigation Menu - Centered */}
        <div
          className={`collapse navbar-collapse ${showMenu ? "show" : ""} justify-content-center`}
        >
          <ul className="navbar-nav text-center">
            {["/", "/contact", "/about", "/doctors"].map((path, index) => (
              <li className="nav-item mx-3" key={index}>
                <NavLink
                  to={path}
                  className="nav-link fw-semibold position-relative"
                  onClick={() => setShowMenu(false)}
                  style={{
                    fontSize: "17px",
                    color: "#2c3e50",
                    transition: "color 0.3s ease",
                    position: "relative",
                    paddingBottom: "5px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#17a2b8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#2c3e50")}
                >
                  {path === "/" ? "Home" : path.replace("/", "").replace(/-/g, " ")}
                  <span
                    style={{
                      content: "''",
                      position: "absolute",
                      left: "50%",
                      bottom: "-2px",
                      width: "0%",
                      height: "2px",
                      backgroundColor: "#17a2b8",
                      transition: "all 0.3s ease-in-out",
                      transform: "translateX(-50%)",
                    }}
                    className="underline"
                  ></span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Create Account Button */}
        <NavLink to="/login">
          <button
            className="btn btn-info text-white px-4 py-2 rounded-pill shadow-sm"
            style={{
              fontSize: "16px",
              fontWeight: "600",
              background: "linear-gradient(to right, #20c997, #17a2b8)",
              border: "none",
              transition: "0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Create Account
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
