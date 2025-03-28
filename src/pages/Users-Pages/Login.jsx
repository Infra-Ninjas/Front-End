import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider.jsx";
import { set } from "mongoose";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUserContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "login") {
      try {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        login(response.data, "Login successful!", "/myprofile");
        setEmail("");
        setPassword("");
      } catch (error) {
        toast.error(
          error?.response?.data?.message || error.message || "Login failed"
        );
      }
    } else {
      try {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        toast.success("Account created successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setState("login"); // Switch to login state after sign up
        // navigate("/login"); // ✅ Go to login page after sign up
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Registration failed"
        );
      }
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
        <h2 style={styles.heading}>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p style={styles.description}>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              style={styles.input}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor =
                  styles.inputFocus.borderColor)
              }
              onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
            />
          </div>
        )}

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
              (e.currentTarget.style.borderColor =
                styles.inputFocus.borderColor)
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
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <p style={styles.footer}>
          {state === "Sign Up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            style={styles.link}
            onClick={() => setState(state === "Sign Up" ? "login" : "Sign Up")}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = styles.linkHover.color)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = styles.link.color)
            }
          >
            {state === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
