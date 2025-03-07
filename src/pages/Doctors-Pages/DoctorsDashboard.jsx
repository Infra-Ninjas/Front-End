
import React, { useEffect, useState } from 'react';
// import { DoctorContext } from '../../contexts/Doctors-Context/DoctorContext';
// import { AppContext } from '../../contexts/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { assets } from '../../assets/assets_frontend/assets';

const DoctorDashboard = () => {
  // Dummy data for demonstration
  const [stats, setStats] = useState({
    totalAppointments: 25,
    completedAppointments: 15,
    cancelledAppointments: 3,
    totalEarnings: 1200,
  });

  // const { dToken, getDashboardStats } = useContext(DoctorContext);
  // const { currency } = useContext(AppContext);

  // Mocked currency symbol
  const currency = '$';

  // useEffect(() => {
  //   if (dToken) {
  //     getDashboardStats().then(res => setStats(res));
  //   }
  // }, [dToken]);

  return (
    <div className="container mt-4">
      <h4>Doctor Dashboard</h4>
      <div className="row mt-3">
        {/* Total Appointments */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm mb-3">
            <div className="card-body">
              <h6 className="card-title">Total Appointments</h6>
              <p className="card-text fs-4">{stats.totalAppointments}</p>
            </div>
          </div>
        </div>

        {/* Completed Appointments */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm mb-3">
            <div className="card-body">
              <h6 className="card-title">Completed Appointments</h6>
              <p className="card-text fs-4 text-success">{stats.completedAppointments}</p>
            </div>
          </div>
        </div>

        {/* Cancelled Appointments */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm mb-3">
            <div className="card-body">
              <h6 className="card-title">Cancelled Appointments</h6>
              <p className="card-text fs-4 text-danger">{stats.cancelledAppointments}</p>
            </div>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="col-md-3">
          <div className="card text-center shadow-sm mb-3">
            <div className="card-body">
              <h6 className="card-title">Total Earnings</h6>
              <p className="card-text fs-4 text-primary">
                {currency} {stats.totalEarnings}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Dashboard Content (Example: Next Appointments) */}
      <div className="mt-4">
        <h5>Upcoming Appointments</h5>

        {/* Dummy upcoming appointments list */}
        <div className="list-group">
          <div className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img
                src={assets.profile_pic}
                alt="Patient"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <p className="mb-1 fw-bold">Jane Doe</p>
                <small>Tomorrow, 10:00 AM</small>
              </div>
            </div>
            <span className="badge bg-info text-dark">Online</span>
          </div>

          <div className="list-group-item d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <img
                src={assets.profile_pic}
                alt="Patient"
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <p className="mb-1 fw-bold">Mark Smith</p>
                <small>Tomorrow, 11:30 AM</small>
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