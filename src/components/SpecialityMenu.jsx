import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div className="text-center py-5 bg-white">
      {/* Title */}
      <h1 className="fw-bold display-5 text-info">Explore by Speciality</h1>
      <p className="fs-5 text-muted mb-4">
        Find the best doctors based on your specific needs and schedule your appointment.
      </p>

      {/* Speciality Cards */}
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {specialityData.map((item, index) => (
            <div className="col" key={index}>
              <Link
                to={`/doctors/${item.speciality}`}
                className="text-decoration-none card shadow-sm border-0 rounded-4 d-flex align-items-center p-4"
                style={{
                  backgroundColor: "#f9f9f9",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  cursor: "pointer",
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
                {/* Profile Picture - Centered */}
                <div className="d-flex justify-content-center">
                  <img
                    src={item.image}
                    alt={item.speciality}
                    className="rounded-circle border border-3 shadow-sm"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      transition: "border 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.border = "4px solid #00b3b3")}
                    onMouseLeave={(e) => (e.currentTarget.style.border = "3px solid #ddd")}
                  />
                </div>

                {/* Speciality Name */}
                <p className="fw-bold fs-5 text-dark mt-3">{item.speciality}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
