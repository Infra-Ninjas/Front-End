import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const MyAppointments = () => {
  const { doctorList } = useContext(AppContext);

  return (
    <div className="container py-5">
      {/* Header */}
      <h2 className="fw-bold border-bottom pb-3 mb-4 text-dark">My Appointments</h2>

      {/* Appointments List */}
      <div className="row g-4">
        {doctorList.slice(0, 3).map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card border-0 shadow-lg p-4 d-flex flex-md-row flex-column align-items-center">
              {/* Doctor Image */}
              <div className="me-md-4 mb-3 mb-md-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-3 "
                  style={{
                    width: "160px", // Increased size for better visibility
                    height: "160px",
                    objectFit: "cover",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for subtle lift
                  }}
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-grow-1">
                <h5 className="fw-bold text-dark">{item.name}</h5>
                <p className="text-muted">{item.speciality}</p>
                <p className="fw-semibold text-dark mb-1">Address:</p>
                <p className="text-secondary mb-0">{item.address.line1}</p>
                <p className="text-secondary">{item.address.line2}</p>
                <p className="mt-2">
                  <span className="fw-semibold text-dark">Date & Time:</span> 25, July, 2024 | 8:30 PM
                </p>
              </div>

              {/* Buttons (Pay Online & Cancel) */}
              <div className="d-flex flex-column gap-3">
                {/* Pay Online Button */}
                <button
                  className="btn px-4 py-2 fw-semibold rounded-pill"
                  style={{
                    border: "2px solid #00838F", // Default white with turquoise border
                    backgroundColor: "white",
                    color: "#00838F",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#00838F";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#00838F";
                  }}
                >
                  Pay Online
                </button>

                {/* Cancel Appointment Button */}
                <button
                  className="btn px-4 py-2 fw-semibold rounded-pill"
                  style={{
                    border: "2px solid #f44336", // Default white with red border
                    backgroundColor: "white",
                    color: "#f44336",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f44336";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = "#f44336";
                  }}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
