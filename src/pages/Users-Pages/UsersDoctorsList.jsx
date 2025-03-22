import React, { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";
import UserLayout from "./UsersLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userserviceurl = import.meta.env.VITE_USERSERVICE_URL;

const UsersDoctorsList = () => {
  const { uToken } = useUserContext();
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // Fetch all doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!uToken) return;
      try {
        const { data } = await axios.get(`${userserviceurl}/api/user/list-doctors`, {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        });

        if (data.success) {
          setDoctors(data.doctors);
        } else {
          console.error("Failed to fetch doctors:", data.message);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [uToken]);

  const handleBookNow = (doctorId) => {
    navigate(`/patientsbookappointments/${doctorId}`);
  };

  return (
    <UserLayout>
      <div className="container" style={{ maxWidth: "1000px" }}>
<<<<<<< HEAD
        {/* Adjusted Title Position */}
        <h2 className="fw-bold text-center page-title">All Doctors</h2>
=======
        <h2 className="mb-4 fw-bold text-center">All Doctors</h2>
>>>>>>> a1dd7bf4bf98ac6aad52f5b15e3e079b437ef448

        <div className="row g-4">
          {doctors.map((item) => (
            <div className="col-12 col-sm-6 col-md-4" key={item._id}>
              <div className="card border-0 shadow-lg p-3 h-100 doctor-card">
                {/* Doctor Image */}
                <div className="d-flex justify-content-center mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-circle"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>

                {/* Doctor Info */}
                <div className="text-center flex-grow-1">
                  <h5 className="fw-bold text-dark mb-1">{item.name}</h5>
                  <p className="text-muted mb-2">{item.speciality}</p>
                </div>

                {/* Book Now Button */}
                <div className="d-flex justify-content-center mt-auto">
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
                    onClick={() => handleBookNow(item._id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Fix: Move "All Doctors" Up Slightly */}
      <style>{`
        .page-title {
          margin-bottom: 24px;
          margin-top: -10px; /* Moves title slightly up */
        }

        .doctor-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 16px;
        }
        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </UserLayout>
  );
};

export default UsersDoctorsList;
