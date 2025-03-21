import React from "react";
import DoctorLayout from "./DoctorsLayout";
import { assets } from "../../assets/assets_frontend/assets";

const DoctorProfile = () => {
  // Dummy data (since backend is not configured)
  const profileData = {
    image: assets.doc1,
    name: "Dr. John Doe",
    degree: "MD",
    speciality: "Cardiology",
    experience: "10+ years",
    about:
      "Dr. John Doe is an experienced cardiologist with over a decade of expertise in treating heart-related conditions.",
    fees: 100,
    address: {
      line1: "123 Medical Street",
      line2: "New York, USA",
    },
  };

  const currency = "$"; // Mocked currency symbol

  return (
    <DoctorLayout>
      <div className="container py-3">
        <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
          {/* Profile Picture & Name */}
          <div className="d-flex align-items-center mb-4">
            <img
              src={profileData.image}
              alt="Doctor"
              className="rounded-circle shadow-sm me-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h2 className="fw-bold" style={{ color: "#00838F" }}>
                {profileData.name}
              </h2>
              <p className="text-secondary mb-0">
                {profileData.degree} - {profileData.speciality}
              </p>
            </div>
          </div>

          {/* Professional Information */}
          <h4 className="mb-3" style={{ color: "#00838F" }}>
            Professional Information
          </h4>
          <div className="mb-3">
            <p className="text-secondary mb-1">
              <strong>Experience:</strong> {profileData.experience}
            </p>
          </div>

          {/* About */}
          <h4 className="mb-3" style={{ color: "#00838F" }}>
            About
          </h4>
          <p className="text-secondary mb-4">{profileData.about}</p>

          {/* Appointment Fee */}
          <h4 className="mb-3" style={{ color: "#00838F" }}>
            Appointment Fee
          </h4>
          <p className="text-secondary mb-4">
            <strong>{currency}</strong> {profileData.fees}
          </p>

          {/* Address */}
          <h4 className="mb-3" style={{ color: "#00838F" }}>
            Address
          </h4>
          <p className="text-secondary mb-1">{profileData.address.line1}</p>
          <p className="text-secondary">{profileData.address.line2}</p>

          {/* Availability */}
          <h4 className="mb-3" style={{ color: "#00838F" }}>
            Availability
          </h4>
          <div className="form-check mb-4">
            <input
              type="checkbox"
              className="form-check-input"
              id="availabilityCheck"
            />
            <label
              className="form-check-label text-secondary"
              htmlFor="availabilityCheck"
            >
              Available
            </label>
          </div>

          {/* Edit Profile Button */}
          <div className="text-end">
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
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorProfile;
