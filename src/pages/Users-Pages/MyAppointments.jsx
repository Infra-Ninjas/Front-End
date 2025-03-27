import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "./UsersLayout";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { uToken, uId } = useUserContext();

  useEffect(() => {
    if (uToken && uId) {
      fetchAppointments();
    } else {
      console.error("uToken or uId missing!", { uToken, uId });
    }
  }, [uToken, uId]);

  const fetchAppointments = async () => {
    try {
      const url = `http://localhost:4002/api/user/list-appointments?userId=${uId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${uToken}` },
      });

      if (response.data?.success) {
        setAppointments(response.data.appointments);
      } else {
        console.error("API response failed:", response.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.response || error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    try {
      const response = await axios.post(
        "http://localhost:4002/api/user/cancel-appointment",
        {
          userId: uId,
          appointmentId: appointmentId,
        },
        {
          headers: { Authorization: `Bearer ${uToken}` },
        }
      );

      if (response.data?.success) {
        alert("Appointment Cancelled");
        // Remove the cancelled appointment from the state
        setAppointments((prev) => prev.filter((apt) => apt._id !== appointmentId));
      } else {
        alert("Failed to cancel appointment");
        console.error("Cancel error:", response.data);
      }
    } catch (error) {
      alert("Something went wrong");
      console.error("Error cancelling appointment:", error.response || error.message);
    }
  };

  return (
    <UserLayout>
      <h2 className="mb-4 fw-bold text-center">My Appointments</h2>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="row g-4">
          {appointments.length === 0 ? (
            <p className="text-center">No appointments found.</p>
          ) : (
            appointments.map((apt) => {
              const { _id: appointmentId, docData: doc, slotDate, slotTime } = apt;
              const docName = doc?.name || "Doctor Name";
              const docSpecialty = doc?.speciality || "Specialty";
              const docImage = doc?.image || "";
              const line1 = doc?.address?.street || "No street";
              const line2 = doc?.address?.city || "No city";

              return (
                <div className="col-12" key={appointmentId}>
                  <div className="card border-0 shadow-lg p-4 d-flex flex-md-row flex-column align-items-center">
                    <div className="me-md-4 mb-3 mb-md-0">
                      <img
                        src={docImage}
                        alt={docName}
                        className="rounded-circle"
                        style={{
                          width: "140px",
                          height: "140px",
                          objectFit: "cover",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>

                    <div className="flex-grow-1">
                      <h5 className="fw-bold text-dark">{docName}</h5>
                      <p className="text-muted">{docSpecialty}</p>

                      <p className="fw-semibold text-dark mb-1">Address:</p>
                      <p className="text-secondary mb-0">{line1}</p>
                      <p className="text-secondary">{line2}</p>

                      <p className="mt-2">
                        <span className="fw-semibold text-dark">Date &amp; Time:</span>{" "}
                        {slotDate} | {slotTime}
                      </p>
                    </div>

                    <div className="d-flex flex-column gap-3 mt-3 mt-md-0">
                      <button
                        className="btn px-4 py-2 fw-semibold rounded-pill"
                        style={{
                          border: "2px solid #00838F",
                          backgroundColor: "white",
                          color: "#00838F",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#00838F";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.color = "#00838F";
                        }}
                      >
                        Pay Online
                      </button>

                      <button
                        className="btn px-4 py-2 fw-semibold rounded-pill"
                        style={{
                          border: "2px solid #f44336",
                          backgroundColor: "white",
                          color: "#f44336",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#f44336";
                          e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.color = "#f44336";
                        }}
                        onClick={() => cancelAppointment(appointmentId)}
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default MyAppointments;
