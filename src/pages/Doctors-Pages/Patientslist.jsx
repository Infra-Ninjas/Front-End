import React, { useState } from 'react';
// import { DoctorContext } from '../../contexts/Doctors-Context/DoctorContext';
// import { AppContext } from '../../contexts/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { assets } from '../../assets/assets_frontend/assets';

const PatientList = () => {
  // Dummy data for patients
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

  // const { dToken, getPatients } = useContext(DoctorContext);
  // const { calculateAge } = useContext(AppContext);

  // Example Age Calculation
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  // useEffect(() => {
  //   if (dToken) {
  //     getPatients().then(res => setPatients(res));
  //   }
  // }, [dToken]);

  return (
    <div className="container mt-4">
      <h4>Patient List</h4>

      <div className="table-responsive mt-3">
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
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                    />
                    <span>{patient.name}</span>
                  </td>
                  <td>{calculateAge(patient.dob)}</td>
                  <td>{patient.lastVisit}</td>
                  <td>{patient.totalAppointments}</td>
                  <td>
                    {/* Example button to view details or open a modal */}
                    <button className="btn btn-sm btn-primary">View</button>
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
  );
};

export default PatientList;