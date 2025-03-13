import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdminContext } from "../../contexts/Admin-Context/AdminContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAdminContext();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/login", {
        email,
        password,
      });
      if (data.success) {
        login(data.token);
        // Further actions or redirection can be added here
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      toast.error("Login failed. Please try again.");
    }
  };

  // Styles identical to the other login pages
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
        <h2 style={styles.heading}>Admin Login</h2>
        <p style={styles.description}>
          Please log in to access the admin dashboard
        </p>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            style={styles.input}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor =
                styles.inputFocus.borderColor)
            }
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            style={styles.input}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor =
                styles.inputFocus.borderColor)
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
            onClick={() => navigate("/doctor-login")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = styles.linkHover.color)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = styles.link.color)
            }
          >
            Doctor
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
