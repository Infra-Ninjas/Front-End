import React, { useEffect, useState } from "react";
import DoctorLayout from "./DoctorsLayout";
import { useDoctorContext } from "../../contexts/Doctors-Context/DoctorContextProvider";
import axios from "axios";

const PatientList = () => {
  const { docId, dToken } = useDoctorContext();
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const doctorserviceurl = import.meta.env.VITE_DOCTORSERVICE_URL || "http://localhost:4003";

  // Fetch the doctor's booked appointments
  const getDoctorAppointments = async () => {
    try {
      if (!dToken || !docId) {
        console.log("🚨 No token or docId; cannot fetch appointments.");
        return;
      }

      console.log("📡 Fetching appointments for doctor:", docId);

      const url = `${doctorserviceurl}/api/doctor/appointments?docId=${docId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      if (response.data && response.data.success) {
        setDoctorAppointments(response.data.appointments || []);
        console.log("✅ Appointments loaded:", response.data.appointments);
      } else {
        console.error("⚠️ Failed to fetch doc appointments:", response.data?.message);
        setDoctorAppointments([]);
      }
    } catch (error) {
      console.error("❌ Error fetching doctor appointments:", error);
      setDoctorAppointments([]);
    }
  };

  // Fetch appointments when the component mounts
  useEffect(() => {
    if (docId && dToken) {
      getDoctorAppointments();
    }
  }, [docId, dToken]);

  return (
    <DoctorLayout>
      <h2 className="mb-4 fw-bold text-center">Booked Appointments</h2>
      <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 15px" }}>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctorAppointments.length > 0 ? (
                doctorAppointments.map((apt, index) => (
                  <tr key={apt._id}>
                    <td>{index + 1}</td>
                    <td>{apt.userData?.name || "Unknown Patient"}</td>
                    <td>-Age-</td>
                    <td>{apt.slotDate}</td>
                    <td>{apt.slotTime}</td>
                    <td>
                      <button className="btn btn-sm btn-info">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No appointments found</td>
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
