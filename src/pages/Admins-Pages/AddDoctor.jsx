import React, { useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { useAdminContext } from "../../contexts/Admin-Context/AdminContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDoctor = () => {
  // Existing states
  const [docImg, setDocImg] = useState(null); // For file upload
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  // New state for image URL
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const { aToken } = useAdminContext();
  const backendUrl =
    import.meta.env.VITE_ADMINSERVICE_URL;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Ensure at least one image source is provided
      if (!docImg && !imageUrl) {
        return toast.error(
          "Please upload doctor picture or provide an image URL"
        );
      }
      if (!aToken) {
        return toast.error("Admin not authenticated. Please log in.");
      }

      // We must send 'date' because it's required (type Number).
      const currentTimestamp = Date.now(); // For date field

      let payload;
      let headers;

      if (docImg) {
        payload = new FormData();
        payload.append("name", name);
        payload.append("email", email);
        payload.append("password", password);
        payload.append("image", docImg);
        payload.append("speciality", speciality);
        payload.append("degree", degree);
        payload.append("experience", experience);
        payload.append("about", about);
        payload.append("fees", fees);
        payload.append("available", true);
        payload.append("address", JSON.stringify({ street, city, state, zip }));
        payload.append("date", currentTimestamp);
        payload.append("slots_booked", JSON.stringify({}));

        headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${aToken}`,
        };
      } else {
        payload = {
          name,
          email,
          password,
          image: imageUrl,
          speciality,
          degree,
          experience,
          about,
          fees: Number(fees),
          available: true,
          address: { street, city, state, zip },
          date: currentTimestamp,
          slots_booked: {},
        };

        headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aToken}`,
        };
      }

      if (docImg) {
        for (let [key, value] of payload.entries()) {
          console.log(`${key}: ${value}`);
        }
      } else {
        console.log("JSON Payload:", payload);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        payload,
        { headers }
      );

      if (data.success) {
        toast.success(data.message || "Doctor added successfully!");
        navigate("/DoctorsList");
      } else {
        toast.error(data.message || "Failed to add doctor. Please try again.");
      }
    } catch (error) {
      console.error("Add Doctor Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add doctor. Please try again."
      );
    }
  };

  return (
    <div
      className="d-flex flex-row"
      style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <div
        className="container mt-0 mb-01 p-4"
        style={{
          maxWidth: "900px",
          borderRadius: "12px",
          backgroundColor: "#f8f9fa",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <h2 className="mb-4 text-dark fw-bold text-center">Add Doctor</h2>

          <div className="row">
            <div className="col-md-3 text-center">
              <label htmlFor="doc-img" className="d-block">
                <img
                  src={
                    docImg ? URL.createObjectURL(docImg) : assets.upload_area
                  }
                  alt="Upload"
                  className="img-fluid border rounded-circle p-2"
                  style={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                    backgroundColor: "#f8f9fa",
                  }}
                />
              </label>
              <input
                onChange={(e) => setDocImg(e.target.files[0])}
                type="file"
                id="doc-img"
                hidden
              />
              <p className="mt-2 text-secondary">Upload doctor picture</p>
            </div>

            <div className="col-md-9">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Doctor Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Speciality</label>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className="form-select"
                    required
                  >
                    <option value="General physician">General physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Doctor Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="form-control"
                    placeholder="Your email"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Education</label>
                  <input
                    onChange={(e) => setDegree(e.target.value)}
                    value={degree}
                    type="text"
                    className="form-control"
                    placeholder="Education"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Doctor Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Street</label>
                  <input
                    onChange={(e) => setStreet(e.target.value)}
                    value={street}
                    type="text"
                    className="form-control"
                    placeholder="Street"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    type="text"
                    className="form-control"
                    placeholder="City"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">State</label>
                  <input
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    type="text"
                    className="form-control"
                    placeholder="State"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Zip</label>
                  <input
                    onChange={(e) => setZip(e.target.value)}
                    value={zip}
                    type="text"
                    className="form-control"
                    placeholder="Zip"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Experience</label>
                  <select
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                    className="form-select"
                    required
                  >
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Years</option>
                    <option value="3 Year">3 Years</option>
                    <option value="4 Year">4 Years</option>
                    <option value="5 Year">5 Years</option>
                    <option value="6 Year">6 Years</option>
                    <option value="7 Year">7 Years</option>
                    <option value="8 Year">8 Years</option>
                    <option value="9 Year">9 Years</option>
                    <option value="10 Year">10 Years</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Fees</label>
                  <input
                    onChange={(e) => setFees(e.target.value)}
                    value={fees}
                    type="number"
                    className="form-control"
                    placeholder="Your fees"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">About Doctor</label>
                  <textarea
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    className="form-control"
                    placeholder="Write about doctor"
                    rows={5}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Moved Optional Image URL input to the right and made it smaller */}
          <div className="d-flex justify-content-end mt-3">
            <div style={{ maxWidth: "300px", width: "100%" }}>
              <label className="form-label">Or provide an Image URL</label>
              <input
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
                type="text"
                className="form-control"
                placeholder="https://example.com/doctor.jpg"
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              type="submit"
              className="btn text-white px-5 py-2 fw-bold"
              style={{
                background:
                  "linear-gradient(to right,rgb(83, 212, 245),rgb(67, 248, 230))",
                borderRadius: "8px",
                border: "none",
              }}
            >
              Add doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
