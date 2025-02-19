import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-5" style={{ background: "linear-gradient(to bottom, #f0fdfd, white)" }}>
        <div className="container">
          <h1 className="fw-bold" style={{ color: "#008080" }}>About Health Sync Website</h1>
          <p className="text-muted">A seamless solution for booking doctor appointments, managing schedules, and ensuring secure online payments.</p>
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
                alt="About Health Sync"
                style={{ borderRadius: "15px" }}
              />
            </div>
            {/* Text Section */}
            <div className="col-md-7">
              <h2 className="fw-bold mb-3 text-dark">Welcome to <span style={{ color: "#008080" }}>Health Sync Website</span></h2>
              <p className="text-muted">
                The Health Sync website is a scalable and secure platform designed to simplify healthcare scheduling for patients, doctors, and administrators.
              </p>
              <p className="text-muted">
                Patients can book appointments, doctors can manage their schedules, and administrators can oversee the entire system—all from one intuitive interface.
              </p>
              <p className="text-muted">
                Integrated with Stripe and Razorpay, the website ensures secure online payments, while Azure Cloud guarantees data safety and system performance.
              </p>
              <p className="text-muted">
                Whether you're tracking your medical history or managing clinic operations, the Health Sync website enhances healthcare accessibility while ensuring data security.
              </p>
              <h4 className="fw-bold mt-4" style={{ color: "#008080" }}>Our Vision</h4>
              <p className="text-muted">
                Our goal is to provide a seamless, secure, and user-friendly platform that empowers individuals and healthcare professionals.
                With real-time appointment scheduling, cloud-based data storage, and role-based access, we aim to make healthcare more efficient and accessible for everyone.
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
                <p className="text-muted">Simplifies scheduling and managing doctor appointments with a user-friendly interface, ensuring quick and hassle-free bookings.</p>
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
                <p className="text-muted">Tailor the website to your needs with customized features for patients, doctors, and administrators. Manage profiles, track earnings, and update availability with ease.</p>
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
                <p className="text-muted">Access real-time data and manage healthcare tasks anytime, anywhere. With secure online payments and cloud-based data storage, the app is accessible and reliable for all users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
