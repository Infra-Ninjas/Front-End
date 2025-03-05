import React from "react";
import { doctors } from "../../assets/assets_frontend/assets";

function TopDoctors() {
  return (
    <div className="text-center py-5" style={{ backgroundColor: "#f9f9f9" }}> 
      {/* Title & Subtitle */}
      <h1 className="fw-bold display-5 text-dark">Top Doctors to Book</h1>
      <p className="fs-5 text-muted mb-4">
        Choose from our best-rated doctors and schedule your appointment today.
      </p>

      {/* Doctors Grid */}
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {doctors.slice(0, 10).map((item, index) => (
            <div className="col" key={index}>
              <div
                className="card border-0 shadow-sm text-center p-4"
                style={{
                  backgroundColor: "#ffffff", // Keep original card background
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Doctor Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-circle mx-auto border border-3 shadow-sm"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    transition: "border 0.3s ease",
                    borderColor: "#00838F", // Dark turquoise border
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.border = "4px solid #00B3B3")}
                  onMouseLeave={(e) => (e.currentTarget.style.border = "3px solid #00838F")}
                />

                {/* Doctor Name & Speciality */}
                <h5 className="fw-bold mt-3 text-dark">{item.name}</h5>
                <p className="text-muted">{item.speciality}</p>

                {/* Availability Badge (Turquoise) */}
                <span className="badge px-3 py-2 fs-6" style={{ backgroundColor: "#00ACC1", color: "white" }}>
                  Available
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <button
        className="btn mt-4 px-4 py-3 fw-semibold rounded-pill"
        style={{
          fontSize: "18px",
          backgroundColor: "#00838F", // Dark turquoise button
          color: "white",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
          e.currentTarget.style.backgroundColor = "#00ACC1"; // Lighter turquoise on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
          e.currentTarget.style.backgroundColor = "#00838F";
        }}
      >
        View More
      </button>
    </div>
  );
}

export default TopDoctors;
