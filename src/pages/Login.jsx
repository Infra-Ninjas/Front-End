

import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Add form submission logic here
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
      backgroundColor: "#40e0d0", // Turquoise background
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
    formFooter: {
      fontSize: "14px",
      color: "#555",
      marginTop: "30px",
    },
    formLink: {
      color: "white",
      cursor: "pointer",
      textDecoration: "underline",
      transition: "color 0.3s ease",
      backgroundColor: "turquoise", // Turquoise background
      padding: "5px",
      borderRadius: "5px",
      fontWeight: "bold",
    },
    formLinkHover: {
      color: "#005f5f",
    },
  };

  return (
    <form onSubmit={onSubmitHandler} style={styles.formContainer}>
      <div style={styles.formContent}>
        <h2 style={styles.formHeading}>{state === "Sign Up" ? "Create Account" : "Login"}</h2>
        <p style={styles.formDescription}>
          Please {state === "Sign Up" ? "Sign up" : "Log in"} to book an appointment
        </p>

        {state === "Sign Up" && (
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.formLabel}>Full Name</label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              style={styles.formInput}
              onFocus={(e) => (e.currentTarget.style.borderColor = styles.formInputFocus.borderColor)}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
            />
          </div>
        )}

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.formLabel}>Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            style={styles.formInput}
            onFocus={(e) => (e.currentTarget.style.borderColor = styles.formInputFocus.borderColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.formLabel}>Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            style={styles.formInput}
            onFocus={(e) => (e.currentTarget.style.borderColor = styles.formInputFocus.borderColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
        </div>

        <button
          type="submit"
          style={styles.formButton}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.formButtonHover.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.formButton.backgroundColor)}
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p style={styles.formFooter}>
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
          className="p-2"
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            style={styles.formLink}
            onMouseEnter={(e) => (e.currentTarget.style.color = styles.formLinkHover.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = styles.formLink.color)}
          >
            {state === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;

