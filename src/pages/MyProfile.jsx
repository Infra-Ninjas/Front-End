import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faUser, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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

  const renderField = (value, field, subField = null) => {
    if (isEDIT) {
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e, field, subField)}
          required
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            marginBottom: "15px",
          }}
        />
      );
    }
    return <p style={{ color: "#2c7a7d", fontSize: "16px", fontWeight: "500", marginBottom: "10px" }}>{value}</p>;
  };

  return (
    <div style={{ backgroundColor: "#f7f7f7", minHeight: "100vh", padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
        {/* Profile Picture and Name */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <img
            src={userData.image}
            alt="Profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
          />
          <div>
            {isEDIT ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) => handleInputChange(e, "name")}
                required
                style={{
                  fontSize: "20px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "100%",
                  maxWidth: "300px",
                }}
              />
            ) : (
              <h2 style={{ fontSize: "24px", color: "#2c7a7d", fontWeight: "600" }}>{userData.name}</h2>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#2c7a7d", fontSize: "18px", fontWeight: "600", paddingBottom: "10px" }}>Contact Information</h3>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "10px", color: "#2c7a7d" }} />
            {renderField(userData.email, "email")}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "10px", color: "#2c7a7d" }} />
            {renderField(userData.phone, "phone")}
          </div>
        </div>

        {/* Address Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#2c7a7d", fontSize: "18px", fontWeight: "600", paddingBottom: "10px" }}>Address</h3>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: "10px", color: "#2c7a7d" }} />
          </div>
          {renderField(userData.address.line1, "address", "line1")}
          {renderField(userData.address.line2, "address", "line2")}
        </div>

        {/* Basic Information */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#2c7a7d", fontSize: "18px", fontWeight: "600", paddingBottom: "10px" }}>Basic Information</h3>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px", color: "#2c7a7d" }} />
            {isEDIT ? (
              <select
                value={userData.gender}
                onChange={(e) => handleInputChange(e, "gender")}
                required
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p style={{ color: "#2c7a7d", fontSize: "16px", fontWeight: "500", marginBottom: "10px" }}>{userData.gender}</p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: "10px", color: "#2c7a7d" }} />
            {renderField(userData.dob, "dob")}
          </div>
        </div>

        {/* Edit / Save Button */}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button
            onClick={() => setIsEDIT(!isEDIT)}
            style={{
              backgroundColor: "#2c7a7d",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {isEDIT ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
