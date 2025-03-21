import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDoctorContext } from "../../contexts/Doctors-Context/DoctorContextProvider";
import RelatedDoctors from "./RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams(); // Get doctor ID from the URL
  const navigate = useNavigate(); // to navigate to login page
  const { doctors } = useDoctorContext(); // Get doctors list from context
  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    if (doctors.length > 0 && docId) {
      const foundDoctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoctor);
    }
  }, [doctors, docId]);

  if (!docInfo) {
    return (
      <div className="container my-5">
        <h4 className="text-center text-danger">Doctor not found.</h4>
      </div>
    );
  }

  // Navigate to login page on click
  const handleLoginToBook = () => {
    navigate('/login');
  };

  return (
    <div className="container my-4">
      <h4 className="text-center mb-4" style={{ color: "#007991", fontWeight: "bold" }}>
        Book an Appointment
      </h4>

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-0">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="card-img-top"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "300px",
                objectFit: "contain",
                objectPosition: "center",
                backgroundColor: "transparent",
              }}
            />
          </div>
        </div>

        <div className="col-12 col-md-8">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body p-3">
              <h5 className="card-title mb-1" style={{ color: "#007991", fontSize: "1rem" }}>
                {docInfo.name}
              </h5>
              <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button
                className="btn btn-sm text-white"
                style={{
                  background: "linear-gradient(to right, #00ACC1, #00838F)",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                }}
              >
                {docInfo.experience}
              </button>

              <div className="mt-2">
                <h6 style={{ fontWeight: "bold", color: "#007991", fontSize: "0.9rem" }}>
                  About
                </h6>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {docInfo.about}
                </p>
              </div>

              <p className="fw-semibold mt-3" style={{ fontSize: "0.9rem" }}>
                Appointment fee:{" "}
                <span style={{ color: "#007991", fontSize: "0.95rem" }}>
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* "Login to Book an Appointment" button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleLoginToBook}
          className="btn text-white shadow"
          style={{
            padding: "10px 40px",
            borderRadius: "30px",
            background: "linear-gradient(to right, #30cfd0, #007991)",
            fontWeight: "600",
            transition: "transform 0.3s ease-in-out",
            fontSize: "0.9rem",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Login to Book an Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} />
    </div>
  );
};

export default Appointment;
