import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { assets } from "../../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom"; // 1) Import useNavigate

const specialties = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
];

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate(); // 2) Initialize the hook

  const doctorserviceurl = import.meta.env.VITE_DOCTORSERVICE_URL;

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const { data } = await axios.get(doctorserviceurl + "/api/doctor/list");

        // Check if response has a "doctors" property
        if (data && Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
        } else {
          console.error("Unexpected API response format", data);
          setDoctors([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]); // Ensure it's always an array to prevent .map() errors
      }
    };
    getAllDoctors();
  }, [doctorserviceurl]);

  // Filter doctors based on the selected specialty
  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.speciality === selectedSpecialty)
    : doctors;

  // Slice the doctors to show only 4 by default
  const doctorsToShow = showMore ? filteredDoctors : filteredDoctors.slice(0, 4);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Choose from our best-rated doctors and schedule your appointment today.
      </h2>

      {/* Specialty Filter Buttons */}
      <div className="d-flex flex-wrap justify-content-center mb-4">
        {specialties.map((specialty, index) => (
          <button
            key={index}
            className="btn m-2 text-white"
            onClick={() => setSelectedSpecialty(specialty)}
            style={{
              background: "linear-gradient(to right, #30cfd0, #007991)",
              border: "none",
              fontWeight: "bold",
              padding: "10px 20px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#007991")}
            onMouseLeave={(e) =>
              (e.target.style.background = "linear-gradient(to right, #30cfd0, #007991)")
            }
          >
            {specialty}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="row">
        {Array.isArray(doctorsToShow) && doctorsToShow.length > 0 ? (
          doctorsToShow.map((doctor, index) => (
            <div key={doctor._id || index} className="col-md-3 col-sm-6 mb-4">
              <div className="card text-center shadow-sm p-3 border-0">
                <img
                  src={doctor.image || assets.doc1} // Fallback image
                  alt={doctor.name}
                  className="rounded-circle mx-auto d-block border"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    padding: "5px",
                    border: "3px solid #e0e0e0",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">{doctor.name}</h5>
                  <p className="text-muted">{doctor.speciality}</p>
                  {/* Availability indicator */}
                  <button
                    className="btn btn-info text-white px-4 py-2 rounded-pill shadow"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      background: "linear-gradient(to right, #00ACC1, #00838F)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    // 3) onClick to navigate to the appointment page
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No doctors available</p>
        )}
      </div>

      {/* Show More Button */}
      {filteredDoctors.length > 4 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-info text-white px-4 py-2 rounded-pill shadow"
            style={{
              fontSize: "16px",
              fontWeight: "600",
              background: "linear-gradient(to right, #00ACC1, #00838F)",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Doctors;
