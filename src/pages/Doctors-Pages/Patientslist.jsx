import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorLayout from './DoctorsLayout';
import axios from 'axios';
// import { assets } from '../../assets/assets_frontend/assets'; // If needed

const PatientList = () => {
  // We'll store the fetched appointments here
  const [appointments, setAppointments] = useState([]);

  // If you have a doctor context that stores docId & token:
  // import and use it. For now, let's hardcode or assume you have them:
  const docId = "6731d59f1adb95ab4ee9867"; // your example doc ID
  const doctorToken = localStorage.getItem("dToken") || ""; 
    // or from a context: const { dToken } = useDoctorContext();

  // On mount, fetch doctor appointments
  useEffect(() => {
    fetchDoctorAppointments();
    // eslint-disable-next-line
  }, []);

  const fetchDoctorAppointments = async () => {
    try {
      if (!doctorToken) {
        console.log("No doctor token found. Cannot fetch appointments.");
        return;
      }

      const url = `http://localhost:4003/api/doctor/appointments?docId=${docId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${doctorToken}`,
        },
      });

      if (response.data && response.data.success) {
        setAppointments(response.data.appointments);
      } else {
        console.error("Failed to fetch appointments:", response.data?.message);
      }
    } catch (error) {
      console.error("Error fetching doctor appointments:", error);
    }
  };

  // For demonstration, if you want to compute an index (1-based)
  const renderTableRows = () => {
    if (appointments.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center">
            No appointments found
          </td>
        </tr>
      );
    }

    return appointments.map((apt, index) => {
      // The backend returns docId, userId, slotDate, slotTime, cancelled, etc.
      const userId = apt.userId;
      const slotDate = apt.slotDate;
      const slotTime = apt.slotTime;
      const isCancelled = apt.cancelled;

      return (
        <tr key={apt._id}>
          <td>{index + 1}</td>
          {/* For "Patient Name", we only have userId unless there's another call or populated data */}
          <td>{userId}</td>
          {/* We no longer have DOB or lastVisit from the API. We'll show slotDate, slotTime. */}
          <td>{slotDate}</td>
          <td>{slotTime}</td>
          <td>{isCancelled ? "Yes" : "No"}</td>
          <td>
            {/* Actions (View or something else) */}
            <button
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(to right, #22c1c3, #40e0d0)',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 16px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              View
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <DoctorLayout>
      <h2 className="mb-4 fw-bold text-center">My Appointments</h2>

      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 15px',
        }}
      >
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Patient (User ID)</th>
                <th>Date</th>
                <th>Time</th>
                <th>Cancelled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default PatientList;
