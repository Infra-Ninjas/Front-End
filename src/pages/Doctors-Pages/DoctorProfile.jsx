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
  const [loading, setLoading] = useState(true);

  const doctorServiceUrl = import.meta.env.VITE_DOCTORSERVICE_URL;

  const [profileData, setProfileData] = useState({
    docId: doctorData?._id || localStorage.getItem("docId") || "",
    name: "",
    image: assets.doc1,
    degree: "MBBS",
    speciality: "General Physician",
    experience: "1 year",
    about: "Doctor description not set.",
    fees: 0,
    available: false,
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await axios.get(`${doctorServiceUrl}/api/doctor/profile`, {
          headers: { Authorization: `Bearer ${dToken}` },
        });

        if (res.data.success) {
          const data = res.data.doctorData;
          setProfileData({
            docId: data._id,
            name: data.name,
            image: data.image || assets.doc1,
            degree: data.degree || "MBBS",
            speciality: data.speciality || "General Physician",
            experience: data.experience || "1 year",
            about: data.about || "Doctor description not set.",
            fees: data.fees || 0,
            available: data.available || false,
            address: data.address || {
              street: "",
              city: "",
              state: "",
              zip: "",
            },
          });
        } else {
          toast.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [doctorServiceUrl, dToken]);

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
        [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        docId: profileData.docId,
        name: profileData.name,
        speciality: profileData.speciality,
        experience: profileData.experience,
        about: profileData.about,
        address: profileData.address,
        available: profileData.available,
      };

      const res = await axios.post(
        `${doctorServiceUrl}/api/doctor/update-profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
            "Content-Type": "application/json",
          },
        }
      );

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

  if (loading) {
    return (
      <DoctorLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </DoctorLayout>
    );
  }

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
                <h2 className="fw-bold" style={{ color: "#00838F" }}>{profileData.name}</h2>
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

            {/* Availability */}
            <h4 className="mb-3 mt-4" style={{ color: "#00838F" }}>Availability</h4>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                checked={profileData.available}
                onChange={isEdit ? (e) => handleInputChange(e, "available") : undefined}
              />
              <label className="form-check-label text-secondary">
                Available
              </label>
            </div>

            {/* Buttons */}
            <div className="text-end">
              {isEdit ? (
                <>
                  <button
                    className="btn btn-secondary me-3"
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    Cancel
                  </button>
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
