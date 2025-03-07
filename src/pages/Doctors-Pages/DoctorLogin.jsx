import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Doctor login submitted", { email, password });

    // Navigate to Doctor Dashboard on successful login
    navigate("/doctorDashboard");
  };

  const styles = {
    formContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f7f7f7",
    },
    formContent: {
      backgroundColor: "white",
      padding: "20px",
      maxWidth: "400px",
      width: "100%",
      borderRadius: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      transition: "transform 0.3s ease, boxShadow 0.3s ease",
    },
    formHeading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    formDescription: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "24px",
    },
    formGroup: {
      width: "100%",
      marginBottom: "20px",
      textAlign: "left",
    },
    formLabel: {
      display: "block",
      fontSize: "14px",
      color: "#333",
      marginBottom: "10px",
    },
    formInput: {
      width: "100%",
      padding: "10px",
      fontSize: "14px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    formInputFocus: {
      borderColor: "#008c8c",
    },
    formButton: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#40e0d0",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    formButtonHover: {
      backgroundColor: "#008c8c",
    },
  };

  return (
    <form onSubmit={onSubmitHandler} style={styles.formContainer}>
      <div style={styles.formContent}>
        <h2 style={styles.formHeading}>Doctor Login</h2>
        <p style={styles.formDescription}>Please log in to manage appointments</p>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.formLabel}>
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            style={styles.formInput}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = styles.formInputFocus.borderColor)
            }
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.formLabel}>
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            style={styles.formInput}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = styles.formInputFocus.borderColor)
            }
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
        </div>

        <button
          type="submit"
          style={styles.formButton}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = styles.formButtonHover.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = styles.formButton.backgroundColor)
          }
          onClick={() => navigate("/doctorDashboard")} // Ensure navigation when button is clicked
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default DoctorLogin;