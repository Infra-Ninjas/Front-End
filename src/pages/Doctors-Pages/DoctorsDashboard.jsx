import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { assets } from '../../assets/assets_frontend/assets';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  // Dummy data for demonstration
  const [stats, setStats] = useState({
    totalAppointments: 25,
    completedAppointments: 15,
    cancelledAppointments: 3,
    totalEarnings: 1200,
  });

  // Mocked currency symbol
  const currency = '$';

  // Reusable gradient button style
  const gradientButtonBase = {
    background: 'linear-gradient(to right, #22c1c3, #00b3b3)',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    padding: '0.5rem 1.25rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  };

  return (
    <div className="container my-4">
      {/* Top Row: Title + Action Buttons */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-3 mb-md-0">Doctor Dashboard</h2>
        <div>
          <button
            // We keep Bootstrap's spacing classes but remove color classes
            className="me-2 mb-2 mb-md-0"
            style={gradientButtonBase}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            onClick={() => navigate('/patientslist')}
          >
            View Patients List
          </button>
          <button
            className="me-2 mb-2 mb-md-0"
            style={gradientButtonBase}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            onClick={() => navigate('/doctorprofile')}
          >
            View Profile
          </button>
          <button
            className="mb-2 mb-md-0"
            style={gradientButtonBase}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            onClick={() => navigate('/doctorappointment')}
          >
            Manage Appointments
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row g-3">
        {/* Total Appointments */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <h6 className="fw-semibold text-secondary">Total Appointments</h6>
              <p className="fs-4 fw-bold mb-0">{stats.totalAppointments}</p>
            </div>
          </div>
        </div>

        {/* Completed Appointments */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <h6 className="fw-semibold text-secondary">Completed Appointments</h6>
              <p className="fs-4 fw-bold text-success mb-0">
                {stats.completedAppointments}
              </p>
            </div>
          </div>
        </div>

        {/* Cancelled Appointments */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <h6 className="fw-semibold text-secondary">Cancelled Appointments</h6>
              <p className="fs-4 fw-bold text-danger mb-0">
                {stats.cancelledAppointments}
              </p>
            </div>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <h6 className="fw-semibold text-secondary">Total Earnings</h6>
              <p className="fs-4 fw-bold text-primary mb-0">
                {currency}
                {stats.totalEarnings}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-5">
        <h5 className="fw-bold mb-3">Upcoming Appointments</h5>
        <div className="list-group">
          {/* Appointment Item 1 */}
          <div className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <img
                src={assets.profile_pic}
                alt="Patient"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <p className="mb-1 fw-bold">Jane Doe</p>
                <small className="text-muted">Tomorrow, 10:00 AM</small>
              </div>
            </div>
            <span className="badge bg-info text-dark">Online</span>
          </div>

          {/* Appointment Item 2 */}
          <div className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <img
                src={assets.profile_pic}
                alt="Patient"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <p className="mb-1 fw-bold">Mark Smith</p>
                <small className="text-muted">Tomorrow, 11:30 AM</small>
              </div>
            </div>
            <span className="badge bg-primary">Cash</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
