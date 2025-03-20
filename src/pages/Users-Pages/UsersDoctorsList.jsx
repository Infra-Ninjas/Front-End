import React, { useEffect } from "react";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";
import UserLayout from "./UsersLayout";
import { useNavigate } from "react-router-dom";

const UsersDoctorsList = () => {
  const { doctors, uToken, getAllDoctors } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (uToken) {
      getAllDoctors();
    }
  }, [uToken, getAllDoctors]);

  // Handler to go to PatientsAppointments page
  const handleBookNow = (doctorId) => {
    // navigate to /patientsbookappointments/:docId
    navigate(`/patientsbookappointments/${doctorId}`);
  };

  return (
    <UserLayout>
      <div
        className="user-content"
        style={{
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 className="mb-4 fw-bold text-center" style={{ marginTop: 0 }}>
            All Doctors
          </h2>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {doctors.map((item) => (
              <div className="col" key={item._id}>
                <div
                  className="card h-100 shadow-sm doctor-card"
                  style={{ borderRadius: "8px" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-top"
                    style={{
                      width: "100%",
                      height: "140px",
                      overflow: "hidden",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>

                  <div className="card-body d-flex flex-column text-center">
                    <h5
                      className="card-title mb-1"
                      style={{ fontSize: "1rem" }}
                    >
                      {item.name}
                    </h5>
                    <p
                      className="card-subtitle text-muted mb-2"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {item.speciality}
                    </p>

                    <div className="mt-auto">
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#00838F",
                          color: "#fff",
                          fontWeight: "600",
                          border: "none",
                          transition: "opacity 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                        // Navigate to the appointment page for this doctor
                        onClick={() => handleBookNow(item._id)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .doctor-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        @media (max-width: 991px) {
          .user-content {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </UserLayout>
  );
};

export default UsersDoctorsList;
