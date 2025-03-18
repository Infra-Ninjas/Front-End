import React, { useState } from 'react';
import DoctorLayout from './DoctorsLayout'; // or your actual layout path
import { assets } from '../../assets/assets_frontend/assets';

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 25,
    completedAppointments: 15,
    cancelledAppointments: 3,
    totalEarnings: 1200,
  });

  const currency = '$';

  return (
    <DoctorLayout>
      {/* Centered Title */}
      <h2 className="mb-4 fw-bold text-center">Doctor Dashboard</h2>

      {/* Stats Row (max-width = 900px, centered) */}
      <div className="row g-3 mb-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Card 1: Total Appointments */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm text-center"
            style={{ minHeight: '130px' }}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h6 className="fw-semibold text-secondary">Total Appts</h6>
              <p className="fs-4 fw-bold mb-0">{stats.totalAppointments}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Completed Appointments */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm text-center"
            style={{ minHeight: '130px' }}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h6 className="fw-semibold text-secondary">Completed Appts</h6>
              <p className="fs-4 fw-bold text-success mb-0">
                {stats.completedAppointments}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Cancelled Appointments */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm text-center"
            style={{ minHeight: '130px' }}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h6 className="fw-semibold text-secondary">Cancelled Appts</h6>
              <p className="fs-4 fw-bold text-danger mb-0">
                {stats.cancelledAppointments}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Total Earnings */}
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm text-center"
            style={{ minHeight: '130px' }}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h6 className="fw-semibold text-secondary">Total Earnings</h6>
              <p className="fs-4 fw-bold text-primary mb-0">
                {currency}
                {stats.totalEarnings}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments (max-width = 900px, centered) */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
            <span
              className="badge"
              style={{
                background: 'linear-gradient(to right, #22c1c3, #40e0d0)',
                color: '#fff',
                borderRadius: '12px',
                padding: '6px 12px',
              }}
            >
              Online
            </span>
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
            <span
              className="badge"
              style={{
                background: 'linear-gradient(to right, #22c1c3, #40e0d0)',
                color: '#fff',
                borderRadius: '12px',
                padding: '6px 12px',
              }}
            >
              Cash
            </span>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
