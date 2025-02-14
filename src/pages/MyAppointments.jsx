import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const MyAppointments = () => {
  const { doctorList } = useContext(AppContext);

  const containerStyle = {
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyle = {
    fontSize: "26px",
    fontWeight: "700",
    color: "#333",
    borderBottom: "2px solid #e0e0e0",
    paddingBottom: "10px",
    marginBottom: "20px",
  };

  const appointmentItemStyle = {
    display: "grid",
    gridTemplateColumns: "120px 1fr auto",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "12px", 
    objectFit: "cover",
    backgroundColor: "#e6f4f1",
  };

  const buttonStyle = {
    padding: "10px 15px",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textAlign: "center",
    backgroundColor: "transparent",
    color: "#333",
    border: "1px solid #ddd",
  };

  const payHoverStyle = {
    backgroundColor: "#2c7a7d",
    color: "white",
  };

  const cancelHoverStyle = {
    backgroundColor: "#f44336",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <p style={headerStyle}>My appointments</p>
      <div>
        {doctorList.slice(0, 3).map((item, index) => (
          <div style={appointmentItemStyle} key={index}>
            <div>
              <img style={imageStyle} src={item.image} alt={item.name} />
            </div>
            <div>
              <p className="text-neutral-800 font-semibold text-lg">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-sm">{item.address.line1}</p>
              <p className="text-sm">{item.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span> 25, July, 2024 | 8:30 PM
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              <button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, payHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
              >
                Pay Online
              </button>
              <button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, cancelHoverStyle)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
