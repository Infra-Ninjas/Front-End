import React from 'react';
import DoctorLayout from './DoctorsLayout';
import { assets } from '../../assets/assets_frontend/assets';
import {FaMoneyBillWave,FaCalendarAlt,FaUser,FaCheck,FaTimes,FaRegCalendarAlt,} from 'react-icons/fa';

const DoctorDashboard = () => {
  const stats = [
    {
      icon: <FaMoneyBillWave size={24} className="text-primary" />,
      label: 'Earnings',
      value: '$80',
    },
    {
      icon: <FaCalendarAlt size={24} className="text-info" />,
      label: 'Appointments',
      value: '4',
    },
    {
      icon: <FaUser size={24} className="text-secondary" />,
      label: 'Patients',
      value: '2',
    },
  ];

  const bookings = [
    { name: 'Avinash Kr', date: '5 Oct 2024', status: 'Pending' },
    { name: 'GreatStack', date: '26 Sep 2024', status: 'Cancelled' },
    { name: 'GreatStack', date: '25 Sep 2024', status: 'Completed' },
    { name: 'GreatStack', date: '23 Sep 2024', status: 'Completed' },
  ];

  return (
    <DoctorLayout>
      <div className="py-4 d-flex flex-column align-items-center" style={{ background: '#f8f9fa' }}>
        {/* Stat Boxes */}
        <div className="d-flex gap-4 flex-wrap justify-content-center mb-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="d-flex flex-column align-items-center p-4"
              style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                width: '180px',
                height: '120px',
              }}
            >
              <div className="mb-2">{stat.icon}</div>
              <h5 className="fw-bold mb-0">{stat.value}</h5>
              <small className="text-muted">{stat.label}</small>
            </div>
          ))}
        </div>

        {/* Bookings Card */}
        <div
          className="p-4 w-100"
          style={{
            maxWidth: '850px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
          }}
        >
          {/* Card Header */}
          <div className="d-flex align-items-center mb-4">
            <FaRegCalendarAlt className="me-2 text-primary" />
            <h5 className="fw-bold mb-0">Latest Bookings</h5>
          </div>

          {/* Bookings List */}
          <div className="d-flex flex-column gap-4">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center pb-2 border-bottom"
              >
                {/* Left side: Image, name, date */}
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={assets.profile_pic}
                    alt="profile"
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                  />
                  <div>
                    <div className="fw-semibold">{booking.name}</div>
                    <small className="text-muted">Booking on {booking.date}</small>
                  </div>
                </div>

                {/* Right side: Action icons or status */}
                {index === 0 ? (
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        background: '#f8d7da',
                        borderRadius: '50%',
                        width: 30,
                        height: 30,
                      }}
                    >
                      <FaTimes className="text-danger" />
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        background: '#d4edda',
                        borderRadius: '50%',
                        width: 30,
                        height: 30,
                      }}
                    >
                      <FaCheck className="text-success" />
                    </div>
                  </div>
                ) : (
                  <span
                    className={`fw-semibold ${
                      booking.status === 'Cancelled' ? 'text-danger' : 'text-success'
                    }`}
                  >
                    {booking.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
