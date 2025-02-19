import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-5" style={{ background: "linear-gradient(to bottom, #f0fdfd, white)" }}>
        <div className="container">
          <h1 className="fw-bold" style={{ color: "#008080" }}>About Us</h1>
          <p className="text-muted">Learn more about our mission and the services we offer.</p>
        </div>
      </section>

      {/* About Section - Image + Text */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Image Section */}
            <div className="col-md-5">
              <img
                className="img-fluid rounded shadow-lg"
                src={assets.about_image}
                alt="About Us"
                style={{ borderRadius: "15px" }}
              />
            </div>
            {/* Text Section */}
            <div className="col-md-7">
              <h2 className="fw-bold mb-3 text-dark">Welcome to <span style={{ color: "#008080" }}>HealthSync Official Website</span></h2>
              <p className="text-muted">
                The HealthSync website helps users track and manage their heart rate data effortlessly using Android Health Connect.
                It allows you to save, load, and view heart rate history in a secure and user-friendly interface.
              </p>
              <p className="text-muted">
                With a focus on privacy and accuracy, this website ensures that your health data is stored safely and accessible only to you.
                Whether for fitness tracking or general well-being, it provides valuable insights to support a healthier lifestyle.
              </p>
              <h4 className="fw-bold mt-4" style={{ color: "#008080" }}>Our Vision</h4>
              <p className="text-muted">
                The HealthSync website aims to provide users with a seamless way to track and manage their health data securely.
                It focuses on accuracy, privacy, and accessibility to empower individuals with real-time health insights.
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* Why Choose Us Section */}
<section className="py-5" style={{ background: "linear-gradient(to bottom, white, #f0fdfd)" }}>
  <div className="container text-center">
    <h2 className="fw-bold mb-4" style={{ color: "#008080" }}>Why Choose Us</h2>
    <div className="row">
      {/* Efficiency */}
      <div className="col-md-4 d-flex">
        <div className="p-4 rounded shadow-lg w-100 h-100 d-flex flex-column justify-content-center" style={{
          background: "white",
          borderRadius: "15px",
          transition: "0.3s",
          boxShadow: "0 8px 16px rgba(0, 128, 128, 0.15)"
        }}>
          <h5 className="fw-bold" style={{ color: "#008080" }}>Efficiency</h5>
          <p className="text-muted">The Health Connect App simplifies tracking and managing heart rate data with a user-friendly interface.</p>
        </div>
      </div>
      {/* Personalization */}
      <div className="col-md-4 d-flex">
        <div className="p-4 rounded shadow-lg w-100 h-100 d-flex flex-column justify-content-center" style={{
          background: "white",
          borderRadius: "15px",
          transition: "0.3s",
          boxShadow: "0 8px 16px rgba(0, 128, 128, 0.15)"
        }}>
          <h5 className="fw-bold" style={{ color: "#008080" }}>Personalization</h5>
          <p className="text-muted">Tailor the app to your health needs with customizable features and settings.</p>
        </div>
      </div>
      {/* Convenience */}
      <div className="col-md-4 d-flex">
        <div className="p-4 rounded shadow-lg w-100 h-100 d-flex flex-column justify-content-center" style={{
          background: "white",
          borderRadius: "15px",
          transition: "0.3s",
          boxShadow: "0 8px 16px rgba(0, 128, 128, 0.15)"
        }}>
          <h5 className="fw-bold" style={{ color: "#008080" }}>Convenience</h5>
          <p className="text-muted">Access real-time health data securely anytime, anywhere with ease.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      
    </div>
  );
};

export default About;
