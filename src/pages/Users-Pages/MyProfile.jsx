import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faUser, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { assets } from "../../assets/assets_frontend/assets";
import UserLayout from "./UsersLayout";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Oyetade Olayinka",
    image: assets.Profile_picture,
    email: "olayinkaoyetade2914@gmail.com",
    phone: "08012345678",
    address: {
      line1: "No 1, Oyetade Close",
      line2: "Oke Afa Toronto",
    },
    gender: "Female",
    dob: "1999-04-19",
  });

  const [isEDIT, setIsEDIT] = useState(false);

  const handleInputChange = (e, field, subField) => {
    setUserData((prev) => {
      if (subField) {
        return { ...prev, [field]: { ...prev[field], [subField]: e.target.value } };
      }
      return { ...prev, [field]: e.target.value };
    });
  };

  return (
    <UserLayout>
      {/* Centered Title */}
      <h2 className="mb-4 fw-bold text-center">My Profile</h2>

      {/* Main container for consistent width */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
          {/* Profile Picture & Name */}
          <div className="d-flex align-items-center mb-4">
            <img
              src={userData.image}
              alt="Profile"
              className="rounded-circle shadow-sm me-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              {isEDIT ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  required
                  className="form-control fs-5 fw-semibold"
                />
              ) : (
                <h2 className="fw-bold" style={{ color: "#00838F" }}>
                  {userData.name}
                </h2>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <h4 className="mb-3" style={{ color: "#00838F" }}>Contact Information</h4>
          <div className="mb-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" style={{ color: "#00838F" }} />
            {isEDIT ? (
              <input
                type="text"
                value={userData.email}
                onChange={(e) => handleInputChange(e, "email")}
                required
                className="form-control"
              />
            ) : (
              <p className="text-secondary mb-0">{userData.email}</p>
            )}
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faPhone} className="me-2" style={{ color: "#00838F" }} />
            {isEDIT ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => handleInputChange(e, "phone")}
                required
                className="form-control"
              />
            ) : (
              <p className="text-secondary mb-0">{userData.phone}</p>
            )}
          </div>

          {/* Address Section */}
          <h4 className="mb-3" style={{ color: "#00838F" }}>Address</h4>
          <div className="mb-3 d-flex align-items-start">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 mt-1" style={{ color: "#00838F" }} />
            <div>
              {isEDIT ? (
                <>
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) => handleInputChange(e, "address", "line1")}
                    required
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) => handleInputChange(e, "address", "line2")}
                    required
                    className="form-control"
                  />
                </>
              ) : (
                <>
                  <p className="text-secondary mb-1">{userData.address.line1}</p>
                  <p className="text-secondary">{userData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <h4 className="mb-3" style={{ color: "#00838F" }}>Basic Information</h4>
          <div className="mb-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className="me-2" style={{ color: "#00838F" }} />
            {isEDIT ? (
              <select
                value={userData.gender}
                onChange={(e) => handleInputChange(e, "gender")}
                required
                className="form-select"
                style={{ maxWidth: "200px" }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-secondary mb-0">{userData.gender}</p>
            )}
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" style={{ color: "#00838F" }} />
            {isEDIT ? (
              <input
                type="text"
                value={userData.dob}
                onChange={(e) => handleInputChange(e, "dob")}
                required
                className="form-control"
              />
            ) : (
              <p className="text-secondary mb-0">{userData.dob}</p>
            )}
          </div>

          {/* Edit / Save Button */}
          <div className="text-end mt-3">
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
              onClick={() => setIsEDIT(!isEDIT)}
            >
              {isEDIT ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default MyProfile;
