// DoctorAppointments.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorLayout from './DoctorsLayout';
import { assets } from '../../assets/assets_frontend/assets';

const DoctorAppointments = () => {
  const appointments = [
    {
      userData: { image: assets.profile_pic, name: "John Doe", dob: "1990-05-20" },
      payment: true,
      slotDate: "2025-03-01",
      slotTime: "10:00 AM",
      amount: 50,
      cancelled: false,
      isCompleted: false
    },
    {
      userData: { image: assets.profile_pic, name: "Jane Smith", dob: "1985-09-15" },
      payment: false,
      slotDate: "2025-03-02",
      slotTime: "3:00 PM",
      amount: 75,
      cancelled: false,
      isCompleted: true
    }
  ];

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  };

  const slotDateFormat = (date) => new Date(date).toDateString();
  const currency = "$";

  return (
    <DoctorLayout>
      <div className="container mt-4">
        <h4>All Appointments</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Payment</th>
                <th>Age</th>
                <th>Date & Time</th>
                <th>Fees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="d-flex align-items-center gap-2">
                      <img
                        src={item.userData.image}
                        alt="Patient"
                        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                      />
                      <span>{item.userData.name}</span>
                    </td>
                    <td>{item.payment ? "Online" : "Cash"}</td>
                    <td>{calculateAge(item.userData.dob)}</td>
                    <td>{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                    <td>{currency} {item.amount}</td>
                    <td>
                      {item.cancelled ? (
                        <span className="text-danger">Cancelled</span>
                      ) : item.isCompleted ? (
                        <span className="text-success">Completed</span>
                      ) : (
                        <div className="d-flex gap-2">
                          <img
                            src={assets.cancel_icon}
                            alt="Cancel"
                            style={{ width: "20px", cursor: "pointer" }}
                          />
                          <img
                            src={assets.check_icon}
                            alt="Complete"
                            style={{ width: "20px", cursor: "pointer" }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No appointments available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorAppointments;
