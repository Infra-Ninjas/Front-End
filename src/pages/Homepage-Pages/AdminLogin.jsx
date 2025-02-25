import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets_admin/assets";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAdminContext } from "../../contexts/Admin-Context/AdminContextProvider"; // ✅ Correct import
import axios from "axios";
import { toast } from "react-toastify";
import { data } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAdminContext(); // ✅ This is correct


  // Correct backend URL
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          login(data.token); // ✅ Use login() instead of setAToken()
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      toast.error("Login failed. Please try again.");
    }
  };

  // return statement to render the login form
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={onSubmitHandler}
        className="p-4 rounded shadow-lg bg-white"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <img
            src={assets.logo}
            alt="Logo"
            className="mb-3"
            style={{ width: "60px" }}
          />
          <h2 className="fw-bold">
            <span
              style={{
                background: "linear-gradient(to right, #008080, #00b3b3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {state}
            </span>{" "}
            <span className="text-dark">Login</span>
          </h2>
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="form-label text-secondary fw-semibold">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="form-control"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn w-100 fw-semibold text-white"
          style={{
            background: "linear-gradient(to right, #22c1c3, #00b3b3)",
            borderRadius: "50px",
            padding: "12px",
            transition: "0.3s",
            fontSize: "18px",
            border: "none",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Login
        </button>

        {/* Switch User Type */}
        <p className="text-center mt-3 fw-semibold text-dark">
          Login as{" "}
          <span
            className="fw-bold"
            style={{
              background: "linear-gradient(to right, #00b3b3, #008080)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
          >
            {state === "Admin" ? "Doctor" : "Admin"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
