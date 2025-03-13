import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets_frontend/assets";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Checks screen width and sets 'isMobile' state
  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 1) Put your media queries and extra CSS in a string
  const embeddedStyles = `
    /* Example: Overriding styles on mobile screens (under 768px) */
    @media (max-width: 767px) {

      /* Make the logo smaller on mobile */
      .navbar-brand img {
        width: 100px !important;
      }

      /* Reduce font size and padding for nav links */
      .navbar-nav .nav-link {
        font-size: 14px !important;
        margin: 0.4rem 0;
      }

      /* Make buttons smaller on mobile */
      .btn.text-white.shadow-sm {
        font-size: 13px !important;
        padding: 0.3rem 0.6rem !important;
      }
    }
  `;

  return (
    <>
      {/* 2) Include the <style> element at the top-level of your return */}
      <style>{embeddedStyles}</style>

      <nav
        className="navbar navbar-expand-md navbar-light border-bottom shadow-sm py-1"
        style={{
          backgroundColor: "#fff",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="container-fluid px-3 d-flex justify-content-between align-items-center">
          {/* Logo Section */}
          <NavLink to="/" className="navbar-brand me-2">
            <img
              src={assets.OurLogo}
              alt="HealthSync Logo"
              className="img-fluid"
              style={{
                width: "130px",
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

          {/* Collapsible Nav Links */}
          <div
            className={`collapse navbar-collapse ${
              showMenu ? "show" : ""
            } justify-content-center`}
          >
            <ul className="navbar-nav text-center">
              {["/", "/contact", "/about", "/doctors"].map((path, index) => (
                <li className="nav-item mx-1" key={index}>
                  <NavLink
                    to={path}
                    className="nav-link fw-semibold"
                    onClick={() => setShowMenu(false)}
                    style={{
                      fontSize: "16px",
                      color: "#2c3e50",
                      transition: "color 0.3s ease",
                      paddingBottom: "3px",
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
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Login Dropdown + Create Account */}
          <div className="d-flex align-items-center">
            {/* Login Dropdown */}
            <div className="dropdown">
              <button
                className="btn text-white shadow-sm px-2 py-1 px-md-4 py-md-2"
                style={{
                  background: "linear-gradient(to right, #20c997, rgb(17, 203, 231))",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "50px",
                  transition: "opacity 0.3s ease-in-out",
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
                  borderRadius: "0.9rem",
                }}
              >
                {[
                  { path: "/admin-login", label: "Admin Login" },
                  { path: "/doctor-login", label: "Doctors Login" },
                  { path: "/login", label: "Patient Login" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <NavLink
                      to={item.path}
                      className="dropdown-item"
                      style={{
                        color: "gray",
                        fontWeight: "600",
                        borderRadius: "0.9rem",
                        transition: "all 0.3s",
                        padding: "0.3rem 0.8rem",
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
                      onClick={() => setShowMenu(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Create Account Button */}
            <NavLink to="/login" className="ms-2">
              <button
                className="btn text-white shadow-md px-3 py-1 px-md-4 py-md-2"
                style={{
                  background: "linear-gradient(to right, #20c997, rgb(17, 203, 231))",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "50px",
                  transition: "opacity 0.3s ease-in-out",
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
    </>
  );
};

export default Navbar;
