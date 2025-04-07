import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faUser,
  faCalendarAlt,
  faIdCard,
  faSpinner,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserLayout from "./UsersLayout";
import "react-toastify/dist/ReactToastify.css";
import defaultAvatar from "../../assets/assets_frontend/image.png";

const MyProfile = () => {
  const { uToken } = useUserContext();
  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isEDIT, setIsEDIT] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const dropRef = useRef();
  const userServiceUrl = import.meta.env.VITE_USERSERVICE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${userServiceUrl}/api/user/get-profile`, {
          headers: { Authorization: `Bearer ${uToken}` },
        });
        if (res.data.success) {
          const user = res.data.userData;
          const cleanedUser = {
            ...user,
            name: user.name === "Not Set" ? "" : user.name,
            phone: user.phone === "0000000000" || user.phone === "Not Set" ? "" : user.phone,
            dob: user.dob === "Not Selected" ? "" : user.dob,
            gender: user.gender === "Not Selected" ? "" : user.gender,
            address: {
              line1: user.address?.line1 || "",
              line2: user.address?.line2 || "",
            },
            image: !user.image || user.image === "Not Set" ? defaultAvatar : user.image,
          };
          setUserData(cleanedUser);
          setOriginalData(cleanedUser);
          setPreviewImage(cleanedUser.image);
        }
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    if (uToken) fetchProfile();
  }, [uToken]);

  const handleInputChange = (e, field, subField) => {
    setUserData((prev) => {
      if (subField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: e.target.value,
          },
        };
      }
      return { ...prev, [field]: e.target.value };
    });
  };

  const handleImageChange = (file) => {
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("address", JSON.stringify(userData.address));
      if (newImage) formData.append("image", newImage);

      const res = await axios.post(`${userServiceUrl}/api/user/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${uToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Profile updated successfully");
        setIsEDIT(false);
        setNewImage(null);
        setOriginalData({ ...userData, image: previewImage });
      } else toast.error("Failed to update profile");
    } catch (err) {
      toast.error("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  if (loading) return <UserLayout><p className="text-center mt-5">Loading profile...</p></UserLayout>;
  if (!userData) return <UserLayout><p className="text-center mt-5">No user data found.</p></UserLayout>;

  return (
    <UserLayout>
      <ToastContainer />
      <h2 className="mb-4 fw-bold text-center">My Profile</h2>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "700px" }}>
          <div className="d-flex align-items-center mb-4">
            <div
              ref={dropRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{
                cursor: "pointer",
                position: "relative",
                transition: "0.3s",
                border: isDragging ? "2px dashed #007991" : "none",
                borderRadius: "50%",
                padding: isDragging ? "5px" : 0,
              }}
            >
              <img
                src={previewImage}
                alt="Profile"
                className="rounded-circle shadow-sm me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              {isEDIT && (
                <FontAwesomeIcon
                  icon={faCamera}
                  className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1"
                  style={{ fontSize: "14px" }}
                />
              )}
            </div>
            <div>
              {isEDIT ? (
                <>
                  <input type="text" value={userData.name} onChange={(e) => handleInputChange(e, "name")} required className="form-control fs-5 fw-semibold mb-2" />
                  <input type="file" accept="image/*" className="form-control" onChange={(e) => handleImageChange(e.target.files[0])} />
                </>
              ) : (
                <h2 className="fw-bold" style={{ color: "#00838F" }}>{userData.name}</h2>
              )}
            </div>
          </div>

          <h4 className="mb-3" style={{ color: "#00838F" }}>Contact Information</h4>
          <div className="mb-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" style={{ color: "#00838F" }} />
            <p className="text-secondary mb-0">{userData.email}</p>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faIdCard} className="me-2" style={{ color: "#00838F" }} />
            <p className="text-secondary mb-0">{userData._id}</p>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faPhone} className="me-2" style={{ color: "#00838F" }} />
            {isEDIT ? (
              <input type="text" value={userData.phone} onChange={(e) => handleInputChange(e, "phone")} required className="form-control" />
            ) : (
              <p className="text-secondary mb-0">{userData.phone}</p>
            )}
          </div>

          <h4 className="mb-3" style={{ color: "#00838F" }}>Address</h4>
          <div className="mb-3 d-flex align-items-start">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 mt-1" style={{ color: "#00838F" }} />
            <div>
              {isEDIT ? (
                <>
                  <input type="text" value={userData.address.line1} onChange={(e) => handleInputChange(e, "address", "line1")} required className="form-control mb-2" />
                  <input type="text" value={userData.address.line2} onChange={(e) => handleInputChange(e, "address", "line2")} required className="form-control" />
                </>
              ) : (
                <>
                  <p className="text-secondary mb-1">{userData.address.line1}</p>
                  <p className="text-secondary">{userData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          <h4 className="mb-3" style={{ color: "#00838F" }}>Basic Information</h4>
          <div className="mb-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className="me-2" style={{ color: "#00838F" }} />
            {isEDIT ? (
              <select value={userData.gender} onChange={(e) => handleInputChange(e, "gender")} required className="form-select" style={{ maxWidth: "200px" }}>
                <option value="">Select</option>
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
              <input type="date" value={userData.dob} onChange={(e) => handleInputChange(e, "dob")} required className="form-control" />
            ) : (
              <p className="text-secondary mb-0">{userData.dob}</p>
            )}
          </div>

          <div className="d-flex justify-content-end gap-3 mt-3">
            {isEDIT && (
              <button className="btn btn-outline-secondary rounded-pill" onClick={() => {
                setUserData(originalData);
                setPreviewImage(originalData.image || defaultAvatar);
                setNewImage(null);
                setIsEDIT(false);
              }} disabled={saving}>Cancel</button>
            )}
            <button className="btn btn-outline-info rounded-pill" onClick={() => {
              if (isEDIT) handleSave();
              else {
                setOriginalData({ ...userData });
                setIsEDIT(true);
              }
            }} disabled={saving}>
              {saving ? (<><FontAwesomeIcon icon={faSpinner} spin className="me-2" />Saving...</>) : isEDIT ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default MyProfile;
