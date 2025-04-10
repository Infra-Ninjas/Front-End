import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "./UsersLayout";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { uToken, uId } = useUserContext();
  const userServiceUrl = import.meta.env.VITE_USERSERVICE_URL;

  useEffect(() => {
    if (uToken && uId) {
      fetchAppointments();
    } else {
      console.error("uToken or uId missing!", { uToken, uId });
    }
  }, [uToken, uId]);

  const fetchAppointments = async () => {
    try {
      const url = `${userServiceUrl}/api/user/list-appointments?userId=${uId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${uToken}` },
      });

      if (response.data?.success) {
        const sortedAppointments = [...response.data.appointments].sort((a, b) => {
          if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setAppointments(sortedAppointments);
      } else {
        toast.error("Failed to fetch appointments.");
        console.error("API response failed:", response.data);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching appointments.");
      console.error("Error fetching appointments:", error.response || error.message);
    }
  };

  const baseBtnStyle = {
    minWidth: "200px",
    height: "48px",
    borderRadius: "50px",
    fontWeight: "600",
    transition: "all 0.2s ease",
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
              const {
                _id: appointmentId,
                docData: doc,
                slotDate,
                slotTime,
                isCompleted,
                cancelled,
              } = apt;
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

                    <div className="d-flex flex-column gap-3 mt-3 mt-md-0 align-items-center">
                      {isCompleted ? (
                        <button
                          className="btn"
                          style={{
                            ...baseBtnStyle,
                            border: "2px solid #4CAF50",
                            backgroundColor: "#4CAF50",
                            color: "white",
                          }}
                        >
                          Completed
                        </button>
                      ) : cancelled ? (
                        <button
                          className="btn"
                          style={{
                            ...baseBtnStyle,
                            border: "2px solid #8B0000",
                            backgroundColor: "#8B0000",
                            color: "white",
                          }}
                        >
                          Cancelled
                        </button>
                      ) : (
                        <button
                          className="btn"
                          style={{
                            ...baseBtnStyle,
                            border: "2px solid #555",
                            backgroundColor: "#555",
                            color: "white",
                          }}
                        >
                          Pending
                        </button>
                      )}
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
