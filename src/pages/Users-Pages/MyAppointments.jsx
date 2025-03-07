import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { AppContext } from "../../contexts/AppContext";
// Import pages (if needed for lazy loading or references)

const MyAppointments = () => {
  const { doctorList } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="container py-5">

      {/* Header + TOP Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold border-bottom pb-3 mb-0 text-dark">
          My Appointments
        </h2>
        <div className="d-flex gap-3">
          {/* My Profile Button (Turquoise scheme) */}
          <button
            className="btn px-4 py-2 fw-semibold rounded-pill"
            style={{
              border: "2px solid #00838F",
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
            onClick={() => navigate("/myprofile")}
          >
            Go to My Profile
          </button>

        
        </div>
      </div>

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
                  className="rounded-3"
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
                  <span className="fw-semibold text-dark">Date & Time:</span>{" "}
                  25, July, 2024 | 8:30 PM
                </p>
              </div>

              {/* Existing Buttons (Pay Online & Cancel) */}
              <div className="d-flex flex-column gap-3">
                {/* Pay Online Button */}
                <button
                  className="btn px-4 py-2 fw-semibold rounded-pill"
                  style={{
                    border: "2px solid #00838F",
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
                    border: "2px solid #f44336",
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
