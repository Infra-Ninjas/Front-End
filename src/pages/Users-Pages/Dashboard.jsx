// UserDashboard.jsx
import React from "react";
import UserLayout from "./UsersLayout";

const UserDashboard = () => {
  // Example stats (replace with real data if desired)
  const stats = {
    totalAppointments: 5,
    upcomingAppointments: 2,
    completedAppointments: 3,
    paymentHistory: 4,
  };

  return (
    <UserLayout>
      {/* Centered Title */}
      <h2 className="mb-4 fw-bold text-center">User Dashboard</h2>

      {/* Main container for consistent width */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Stats Row */}
        <div className="row g-3 mb-4">
          {/* Card 1: Total Appointments */}
          <div className="col-md-3">
            <div className="card border-0 shadow-sm text-center" style={{ minHeight: "120px" }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h6 className="fw-semibold text-secondary">Total Appointments</h6>
                <p className="fs-4 fw-bold mb-0">{stats.totalAppointments}</p>
              </div>
            </div>
          </div>

          {/* Card 2: Upcoming Appointments */}
          <div className="col-md-3">
            <div className="card border-0 shadow-sm text-center" style={{ minHeight: "120px" }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h6 className="fw-semibold text-secondary">Upcoming Appts</h6>
                <p className="fs-4 fw-bold text-info mb-0">{stats.upcomingAppointments}</p>
              </div>
            </div>
          </div>

          {/* Card 3: Completed Appointments */}
          <div className="col-md-3">
            <div className="card border-0 shadow-sm text-center" style={{ minHeight: "120px" }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h6 className="fw-semibold text-secondary">Completed Appts</h6>
                <p className="fs-4 fw-bold text-success mb-0">{stats.completedAppointments}</p>
              </div>
            </div>
          </div>

          {/* Card 4: Payment History */}
          <div className="col-md-3">
            <div className="card border-0 shadow-sm text-center" style={{ minHeight: "120px" }}>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h6 className="fw-semibold text-secondary">Payment History</h6>
                <p className="fs-4 fw-bold text-primary mb-0">{stats.paymentHistory}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Example "Upcoming Section" */}
        <h5 className="fw-bold mb-3">Upcoming Appointments</h5>
        <div className="list-group">
          <div className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              {/* Replace with your actual user or doctor data */}
              <img
                src="https://via.placeholder.com/40"
                alt="Doctor"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <div>
                <p className="mb-1 fw-bold">Dr. Jane Doe</p>
                <small className="text-muted">Tomorrow, 10:00 AM</small>
              </div>
            </div>
            <span
              className="badge"
              style={{
                background: "linear-gradient(to right, #22c1c3, #40e0d0)",
                color: "#fff",
                borderRadius: "12px",
                padding: "6px 12px",
              }}
            >
              Online
            </span>
          </div>
          {/* Additional appointments as needed... */}
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
