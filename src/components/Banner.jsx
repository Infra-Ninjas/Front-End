import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

function Banner() {
  const navigate = useNavigate();

  return (
    <div className="container px-0 my-4">
      <div className="row align-items-center bg-white p-5 shadow-sm rounded">
        {/* Left Side - Text */}
        <div className="col-md-6">
          <h1 className="fw-bold text-info mb-3">
            Book Appointment With 100+ Trusted Doctors
          </h1>
          <p className="text-muted">
            Easily connect with top doctors and schedule your appointment in
            just a few simple steps.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-info text-white px-4 py-2 rounded-pill mt-3 shadow-sm"
            style={{
              transition: "0.3s ease-in-out",
              background: "linear-gradient(to right, #20c997, #17a2b8)",
              border: "none",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Book Appointment Now
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="col-md-6 text-center">
          <img
            src={assets.appointment_img}
            alt="Doctor"
            className="img-fluid"
            style={{ maxWidth: "350px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
