import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(to bottom right, #E0F7FA, #B2EBF2)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side (Text Section) */}
          <div className="col-md-6">
            <h1 className="fw-bold display-4 text-info">
              Your Health, <br /> Your Control
            </h1>
            <p className="fs-5 my-3 text-muted">
              Empower your wellness journey. Connect with world-class doctors and schedule your appointment in just a few steps.
            </p>
            <div className="d-flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-info text-white px-4 py-2 rounded-pill shadow"
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "linear-gradient(to right, #00ACC1, #00838F)",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Book Appointment Now
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-success text-white px-4 py-2 rounded-pill shadow"
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "linear-gradient(to right, #1abc9c, #16a085)",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Right Side (Image Section) */}
          <div className="col-md-6 text-center">
            <img
              src={assets.header_img}
              alt="Doctor"
              className="img-fluid shadow rounded"
              style={{
                maxWidth: "90%",
                maxHeight: "500px",
                borderRadius: "20px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
