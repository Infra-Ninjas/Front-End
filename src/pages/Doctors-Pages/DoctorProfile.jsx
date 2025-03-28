// DoctorProfile.jsx - Editable name & address with API integration
import React, { useState, useEffect } from "react";
import DoctorLayout from "./DoctorsLayout";
import { assets } from "../../assets/assets_frontend/assets";
import { useDoctorContext } from "../../contexts/Doctors-Context/DoctorContextProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorProfile = () => {
  const { dToken, doctorData } = useDoctorContext();
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    docId: doctorData?._id || localStorage.getItem("docId") || "",

    name: doctorData?.name || "",
    image: doctorData?.image || assets.doc1,
    degree: doctorData?.degree || "MBBS",
    speciality: doctorData?.speciality || "General Physician",
    experience: doctorData?.experience || "1 year",
    about: doctorData?.about || "Doctor description not set.",
    fees: doctorData?.fees || 0,
    available: doctorData?.available || false,
    address: doctorData?.address || {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const handleInputChange = (e, field, subField = null) => {
    if (subField) {
      setProfileData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [subField]: e.target.value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        docId: profileData.docId,
        name: profileData.name,
        address: profileData.address,
      };

      const res = await axios.post("http://localhost:4003/api/doctor/update-profile", payload, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      if (res.data.success) {
        toast.success("Profile updated successfully");
        setIsEdit(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DoctorLayout>
      <ToastContainer />
      <div className="py-4" style={{ minHeight: "100vh", marginLeft: "250px" }}>
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
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange(e, "name")}
                    className="form-control fw-bold"
                  />
                ) : (
                  <h2 className="fw-bold" style={{ color: "#00838F" }}>{profileData.name}</h2>
                )}
                <p className="text-secondary mb-0">
                  {profileData.degree} - {profileData.speciality}
                </p>
              </div>
            </div>

            {/* Professional Info */}
            <h4 className="mb-3" style={{ color: "#00838F" }}>Professional Information</h4>
            <p className="text-secondary mb-1"><strong>Experience:</strong> {profileData.experience}</p>

            {/* About */}
            <h4 className="mb-3" style={{ color: "#00838F" }}>About</h4>
            <p className="text-secondary mb-4">{profileData.about}</p>

            {/* Fee */}
            <h4 className="mb-3" style={{ color: "#00838F" }}>Appointment Fee</h4>
            <p className="text-secondary mb-4"><strong>$</strong> {profileData.fees}</p>

            {/* Address */}
            <h4 className="mb-3" style={{ color: "#00838F" }}>Address</h4>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={profileData.address.street}
                  placeholder="Street"
                  className="form-control mb-2"
                  onChange={(e) => handleInputChange(e, "address", "street")}
                />
                <input
                  type="text"
                  value={profileData.address.city}
                  placeholder="City"
                  className="form-control mb-2"
                  onChange={(e) => handleInputChange(e, "address", "city")}
                />
                <input
                  type="text"
                  value={profileData.address.state}
                  placeholder="State"
                  className="form-control mb-2"
                  onChange={(e) => handleInputChange(e, "address", "state")}
                />
                <input
                  type="text"
                  value={profileData.address.zip}
                  placeholder="Zip Code"
                  className="form-control"
                  onChange={(e) => handleInputChange(e, "address", "zip")}
                />
              </>
            ) : (
              <>
                <p className="text-secondary mb-1">{profileData.address.street}</p>
                <p className="text-secondary">{profileData.address.city}, {profileData.address.state} {profileData.address.zip}</p>
              </>
            )}

            {/* Availability (view only) */}
            <h4 className="mb-3 mt-4" style={{ color: "#00838F" }}>Availability</h4>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                checked={profileData.available}
                readOnly
              />
              <label className="form-check-label text-secondary">
                Available
              </label>
            </div>

            {/* Action Buttons */}
            <div className="text-end">
              {isEdit ? (
                <>
                  <button
                    className="btn btn-secondary me-3"
                    onClick={() => {
                      setIsEdit(false);
                      setProfileData((prev) => ({ ...prev, name: doctorData.name, address: doctorData.address }));
                    }}
                  >Cancel</button>
                  <button
                    className="btn btn-info text-white fw-semibold"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <button
                  className="btn px-4 py-2 fw-semibold rounded-pill"
                  style={{
                    border: "2px solid #00838F",
                    backgroundColor: "white",
                    color: "#00838F",
                  }}
                  onClick={() => setIsEdit(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorProfile;
