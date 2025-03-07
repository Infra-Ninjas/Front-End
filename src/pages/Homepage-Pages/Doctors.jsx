import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { assets } from "../../assets/assets_frontend/assets";

const specialties = [
  "General Physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
];

const doctors = [
  { name: "Dr. Richard James", specialty: "General Physician", image: assets.doc1 },
  { name: "Dr. Emily Larson", specialty: "Gynecologist", image: assets.doc2 },
  { name: "Dr. Sarah Patel", specialty: "Dermatologist", image: assets.doc3 },
  { name: "Dr. Christopher Lee", specialty: "Pediatrician", image: assets.doc4 },
  { name: "Dr. Jennifer Garcia", specialty: "Neurologist", image: assets.doc5 },
  { name: "Dr. Andrew Williams", specialty: "Neurologist", image: assets.doc6 },
  { name: "Dr. Christopher Davis", specialty: "General Physician", image: assets.doc7 },
  { name: "Dr. Timothy White", specialty: "Gynecologist", image: assets.doc8 },
];

const Doctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [showMore, setShowMore] = useState(false);

  // Filter doctors based on the selected specialty
  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
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
            onMouseLeave={(e) => (e.target.style.background = "linear-gradient(to right, #30cfd0, #007991)")}
          >
            {specialty}
          </button>
        ))}
      </div>

      {/* Doctors Grid - Show All Doctors by Default */}
      <div className="row">
        {doctorsToShow.map((doctor, index) => (
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
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Image hover effect
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              />
              <div className="card-body">
                <h5 className="card-title font-weight-bold">{doctor.name}</h5>
                <p className="text-muted">{doctor.specialty}</p>
                {/* Available Button */}
                <button
                  className="btn btn-info text-white px-4 py-2 rounded-pill shadow"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    background: "linear-gradient(to right, #00ACC1, #00838F)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"} // Button hover effect
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                  Available
                </button>
              </div>
            </div>
          </div>
        ))}
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
