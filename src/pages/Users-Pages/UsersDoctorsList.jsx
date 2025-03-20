// UsersDoctorsList.jsx
import React, { useEffect } from "react";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider.jsx";
import UserLayout from "./UsersLayout";

const UsersDoctorsList = () => {
  const { doctors, uToken, getAllDoctors } = useUserContext();

  // Fetch doctors on mount (if user is logged in)
  useEffect(() => {
    if (uToken) {
      getAllDoctors();
    }
  }, [uToken, getAllDoctors]);

  return (
    <UserLayout>
      {/* 1) Matching the admin snippet’s container & styles */}
      <div
        className="user-content"
        style={{
          marginTop: "70px",     // same as admin-content
          marginLeft: "200px",   // same as admin-content
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            className="mb-4 fw-bold text-center"
            style={{ marginTop: 0 }}
          >
            All Doctors
          </h2>

          {/* 2) Same row/col structure: row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {doctors.map((item) => (
              <div className="col" key={item._id}>
                {/* 3) Same .card styling, with hover-lift effect */}
                <div
                  className="card h-100 shadow-sm doctor-card"
                  style={{ borderRadius: "8px" }}
                >
                  {/* Top image container (height 140px, objectFit: contain) */}
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

                  {/* Card body: name, specialty, Book Now button at the bottom */}
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
                      {/* 4) Book Now button, teal style */}
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

      {/* 5) Same hover-lift CSS from admin snippet */}
      <style>{`
        .doctor-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        /* On smaller screens, remove the left margin to match admin snippet */
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
