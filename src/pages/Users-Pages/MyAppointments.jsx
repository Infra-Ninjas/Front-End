// MyAppointments.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "./UsersLayout";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";

const MyAppointments = () => {
  // State to store fetched appointments
  const [appointments, setAppointments] = useState([]);

  // Grab user token (uToken) and user data (so we know their userId)
  const { uToken, userData } = useUserContext();

  // On component mount, fetch appointments from the backend
  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, []);

  // GET /api/user/list-appointments?userId=xxx
  const fetchAppointments = async () => {
    try {
      if (!uToken) {
        console.log("User not logged in. Cannot fetch appointments.");
        return;
      }
      // If your user context stores the user ID as userData._id
      const userId = userData?._id || "67d99f28fc52e4a3bd0caf78"; // fallback if needed

      const url = `http://localhost:4002/api/user/list-appointments?userId=${userId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      });

      if (response.data && response.data.success) {
        // Store the appointments in local state
        setAppointments(response.data.appointments);
      } else {
        console.error("Failed to fetch appointments:", response.data?.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <UserLayout>
      {/* Centered Title, matching admin/doctor style */}
      <h2 className="mb-4 fw-bold text-center">My Appointments</h2>

      {/* Main container for consistent width */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="row g-4">
          {appointments.length === 0 ? (
            <p className="text-center">No appointments found.</p>
          ) : (
            appointments.map((apt) => {
              // Destructure relevant info from apt
              const appointmentId = apt._id;
              const doc = apt.docData; // Contains doctor info
              const slotDate = apt.slotDate;
              const slotTime = apt.slotTime;

              // Fallback if doc is missing
              const docName = doc?.name || "Doctor Name";
              const docSpecialty = doc?.speciality || "Specialty";
              const docImage = doc?.image || "";
              const docAddress = doc?.address || {};
              const line1 = docAddress.street || "No street";
              const line2 = docAddress.city || "No city";

              return (
                <div className="col-12" key={appointmentId}>
                  <div className="card border-0 shadow-lg p-4 d-flex flex-md-row flex-column align-items-center">
                    {/* Doctor Image */}
                    <div className="me-md-4 mb-3 mb-md-0">
                      <img
                        src={docImage}
                        alt={docName}
                        className="rounded-3"
                        style={{
                          width: "160px",
                          height: "160px",
                          objectFit: "cover",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>

                    {/* Doctor & Appointment Details */}
                    <div className="flex-grow-1">
                      <h5 className="fw-bold text-dark">{docName}</h5>
                      <p className="text-muted">{docSpecialty}</p>

                      {/* Example: Show address from docData.address */}
                      <p className="fw-semibold text-dark mb-1">Address:</p>
                      <p className="text-secondary mb-0">{line1}</p>
                      <p className="text-secondary">{line2}</p>

                      {/* Show slot date & time */}
                      <p className="mt-2">
                        <span className="fw-semibold text-dark">
                          Date &amp; Time:
                        </span>{" "}
                        {slotDate} | {slotTime}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex flex-column gap-3">
                      <button
                        className="btn px-4 py-2 fw-semibold rounded-pill"
                        style={{
                          border: "2px solid #00838F",
                          backgroundColor: "white",
                          color: "#00838F",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
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

                      <button
                        className="btn px-4 py-2 fw-semibold rounded-pill"
                        style={{
                          border: "2px solid #f44336",
                          backgroundColor: "white",
                          color: "#f44336",
                          transition:
                            "background-color 0.3s ease, color 0.3s ease",
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
              );
            })
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default MyAppointments;
