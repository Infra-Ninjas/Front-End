import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import doc1 from "../assets/assets_frontend/doc1.png";
import doc2 from "../assets/assets_frontend/doc2.png";
import doc3 from "../assets/assets_frontend/doc3.png";
import doc4 from "../assets/assets_frontend/doc4.png";
import doc5 from "../assets/assets_frontend/doc5.png";
import doc6 from "../assets/assets_frontend/doc6.png";
import doc7 from "../assets/assets_frontend/doc7.png";
import doc8 from "../assets/assets_frontend/doc8.png";

const specialties = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
];

const doctors = [
  { name: "Dr. Richard James", specialty: "General Physician", image: doc1 },
  { name: "Dr. Emily Larson", specialty: "Gynecologist", image: doc2 },
  { name: "Dr. Sarah Patel", specialty: "Dermatologist", image: doc3 },
  { name: "Dr. Christopher Lee", specialty: "Pediatrician", image: doc4 },
  { name: "Dr. Jennifer Garcia", specialty: "Neurologist", image: doc5 },
  { name: "Dr. Andrew Williams", specialty: "Neurologist", image: doc6 },
  { name: "Dr. Christopher Davis", specialty: "General Physician", image: doc7 },
  { name: "Dr. Timothy White", specialty: "Gynecologist", image: doc8 },
];

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [showDoctors, setShowDoctors] = useState(false);

  // Filter doctors based on the selected specialty
  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
    : doctors;

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
            onClick={() => {
              setSelectedSpecialty(specialty);
              setShowDoctors(true);
            }}
            style={{
              background: "linear-gradient(to right, #30cfd0, #007991)",
              border: "none",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            {specialty}
          </button>
        ))}
        {/* Show All Button */}
        <button
          className="btn m-2 text-white"
          onClick={() => {
            setSelectedSpecialty(null);
            setShowDoctors(true);
          }}
          style={{
            background: "linear-gradient(to right, #30cfd0, #007991)",
            border: "none",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          Show All
        </button>
      </div>

      {/* Doctors Grid - Show Only When a Specialty is Selected */}
      {showDoctors && (
        <div className="row">
          {filteredDoctors.map((doctor, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-4">
              <div className="card text-center shadow-sm p-3 border-0">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-circle mx-auto d-block border"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    padding: "5px",
                    border: "3px solid #e0e0e0",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">{doctor.name}</h5>
                  <p className="text-muted">{doctor.specialty}</p>
                  {/* Turquoise Gradient Button */}
                  <button
                    className="btn w-100 text-white"
                    style={{
                      background: "linear-gradient(to right, #30cfd0, #007991)",
                      border: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Available
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
