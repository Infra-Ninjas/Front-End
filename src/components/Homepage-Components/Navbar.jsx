import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets_frontend/assets";
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
        padding: "unset",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container px-0 d-flex justify-content-between align-items-center w-100">
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
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
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
          className={`collapse navbar-collapse ${
            showMenu ? "show" : ""
          } justify-content-center`}
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
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#17a2b8")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#2c3e50")
                  }
                >
                  {path === "/"
                    ? "Home"
                    : path
                        .replace("/", "")
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                  <span
                    style={{
                      content: "''",
                      position: "absolute",
                      left: "50%",
                      bottom: "-2px",
                      width: "0%",
                      height: "4px",
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

       

       {/* Login Dropdown Button */}
{/* Login Dropdown Button */}
<div className="dropdown">
  <button
    className="btn btn-info text-white px-2 py-2  shadow-md"
    style={{
      fontSize: "14px",
      fontWeight: "600",
      background: "linear-gradient(to right, #20c997, rgb(17, 203, 231))",
      border: "10px",
      transition: "0.3s ease-in-out",
      borderRadius: "0.9rem",
      paddingBottom: "0.5rem",
      paddingTop: "0.5rem",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
    }}
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
  >
    Login <i className="bi bi-caret-down-fill"></i>
  </button>

  <ul
    className="dropdown-menu border-1 shadow p-2"
    style={{
      backgroundColor: "#fff", // keep dropdown's overall bg white
      borderRadius: "0.9rem",
    }}
  >
    <li>
      <NavLink
        to="/admin-login"
        className="dropdown-item"
        style={{
          color: "gray",
          fontWeight: "600",
          backgroundColor: "#fff",
          transition: "all 0.3s",
          borderRadius: "0.9rem",
          paddingBottom: "0.5rem",
          paddingTop: "0.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(to right, #20c997, rgb(17, 203, 231))";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color = "gray";
        }}
      >
        Admin Login
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/doctor-login"
        className="dropdown-item"
        style={{
          color: "gray",
          fontWeight: "600",
          backgroundColor: "#fff",
          transition: "all 0.3s",
          borderRadius: "0.9rem",
          paddingBottom: "0.5rem",
          paddingTop: "0.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(to right, #20c997, rgb(17, 203, 231))";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color = "gray";
        }}
      >
        Doctors Login
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/login"
        className="dropdown-item"
        style={{
          color: "gray",
          fontWeight: "600",
          backgroundColor: "#fff",
          transition: "all 0.3s",
          borderRadius: "0.9rem",
          paddingBottom: "0.5rem",
          paddingTop: "0.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",

        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(to right, #20c997, rgb(17, 203, 231))";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.color = "gray";
        }}
      >
        Patient Login
      </NavLink>
    </li>
  </ul>
   {/* Create Account Button */}
   <NavLink to="/login" className="me-3">
          <button
            className="btn btn-info text-white px-2 py-2 rounded-pill shadow-sm"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              background: "linear-gradient(to right, #20c997,rgb(17, 203, 231))",
              border: "none",
              transition: "0.6s ease-in-out",
              paddingRight: "50px",
              marginLeft: "20px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Create Account
          </button>
        </NavLink>
</div>



        </div>
     
    </nav>
  );
};

export default Navbar;
