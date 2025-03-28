import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDoctorContext } from "../../contexts/Doctors-Context/DoctorContextProvider.jsx";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Use the login function from your DoctorContext
  const { login } = useDoctorContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Using VITE_BACKEND_URL for doctor authentication
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctor/login`,
        { email, password }
      );
      // response.data should be { token, role }
      login(response.data, "Welcome Doctor!");
      navigate("/doctorprofile"); // Redirect to doctor profile page
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Doctor login failed"
      );
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f7f7f7",
    },
    card: {
      backgroundColor: "#fff",
      padding: "20px",
      width: "100%",
      maxWidth: "400px",
      borderRadius: "10px",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      textAlign: "center",
      transition: "transform 0.3s ease, boxShadow 0.3s ease",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    description: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "24px",
    },
    formGroup: {
      width: "100%",
      marginBottom: "20px",
      textAlign: "left",
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#333",
      marginBottom: "10px",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    inputFocus: {
      borderColor: "#008c8c",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#40e0d0",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#008c8c",
    },
    footer: {
      fontSize: "14px",
      color: "#555",
      marginTop: "30px",
    },
    link: {
      color: "#40e0d0",
      textDecoration: "underline",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#008c8c",
    },
  };

  return (
    <form onSubmit={onSubmitHandler} style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Doctor Login</h2>
        <p style={styles.description}>Please log in to manage appointments</p>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            style={styles.input}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            style={styles.input}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.button.backgroundColor)
          }
        >
          Login
        </button>
        <p style={styles.footer}>
          Login as{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/admin-login")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = styles.linkHover.color)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = styles.link.color)
            }
          >
            Admin
          </span>
        </p>
      </div>
    </form>
  );
};

export default DoctorLogin;
