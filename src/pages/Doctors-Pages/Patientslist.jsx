import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorLayout from './DoctorsLayout';
import { assets } from '../../assets/assets_frontend/assets';

const PatientList = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      dob: '1992-01-15',
      image: assets.profile_pic,
      lastVisit: '2025-02-20',
      totalAppointments: 5,
    },
    {
      id: 2,
      name: 'Jane Smith',
      dob: '1988-06-10',
      image: assets.profile_pic,
      lastVisit: '2025-02-25',
      totalAppointments: 2,
    },
  ]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  };

  // Gradient style for buttons (if needed elsewhere)
  const gradientButtonStyle = {
    background: 'linear-gradient(to right, #22c1c3, #40e0d0)',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 16px',
    fontSize: '14px',
    cursor: 'pointer',
  };

  return (
    <DoctorLayout>
      {/* Centered Title */}
      <h2 className="mb-4 fw-bold text-center">Patient List</h2>

      {/* Responsive Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 15px', // add some horizontal padding on small screens
        }}
      >
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Last Visit</th>
                <th>Total Appointments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((patient, index) => (
                  <tr key={patient.id}>
                    <td>{index + 1}</td>
                    <td className="d-flex align-items-center gap-2">
                      <img
                        src={patient.image}
                        alt="Patient"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                        }}
                      />
                      <span>{patient.name}</span>
                    </td>
                    <td>{calculateAge(patient.dob)}</td>
                    <td>{patient.lastVisit}</td>
                    <td>{patient.totalAppointments}</td>
                    <td>
                      <button className="btn btn-sm" style={gradientButtonStyle}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default PatientList;
