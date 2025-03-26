import React, { useEffect, useState } from "react";
import DoctorLayout from "./DoctorsLayout";
import { useDoctorContext } from "../../contexts/Doctors-Context/DoctorContextProvider";
import axios from "axios";
import { assets } from "../../assets/assets_frontend/assets";
import { FaCheck, FaTimes } from "react-icons/fa";

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

  useEffect(() => {
    if (docId && dToken) {
      getDoctorAppointments();
    }
  }, [docId, dToken]);

  return (
    <DoctorLayout>
  <div className="py-4" style={{ background: "#f8f9fc", minHeight: "100vh" }}>
    <h3 className="fw-bold text-center mb-4">All Appointments</h3>

    <div
      className="table-responsive"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
      }}
    >
      <table className="table align-middle mb-0" style={{ fontSize: "15px" }}>
        <thead>
          <tr className="align-middle">
            <th className="fw-bold">#</th>
            <th className="fw-bold">Patient</th>
            <th className="fw-bold">Payment</th>
            <th className="fw-bold">Age</th>
            <th className="fw-bold">Date & Time</th>
            <th className="fw-bold">Fees</th>
            <th className="fw-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {doctorAppointments.length > 0 ? (
            doctorAppointments.map((apt, index) => (
              <tr key={apt._id} style={{ verticalAlign: "middle", height: "65px" }}>
                <td>{index}</td>

                {/* Patient Name + Avatar */}
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={assets.profile_pic}
                      alt="patient"
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span className="fw-semibold text-capitalize">
                      {apt.userData?.name || "Unknown Patient"}
                    </span>
                  </div>
                </td>

                {/* Payment */}
                <td>
                  <span
                    style={{
                      border: "1px solid #ccc",
                      padding: "2px 10px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    CASH
                  </span>
                </td>

                {/* Age (static value) */}
                <td>24</td>

                {/* Date & Time */}
                <td>
                  <span style={{ whiteSpace: "nowrap" }}>
                    {apt.slotDate}, {apt.slotTime}
                  </span>
                </td>

                {/* Fees */}
                <td>${apt.fees || "40"}</td>

                {/* Action */}
                <td>
                  {index === 0 ? (
                    <div className="d-flex gap-2 align-items-center">
                      <div
                        style={{
                          background: "#f8d7da",
                          borderRadius: "999px",
                          width: 30,
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaTimes className="text-danger" size={14} />
                      </div>
                      <div
                        style={{
                          background: "#d4edda",
                          borderRadius: "999px",
                          width: 30,
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FaCheck className="text-success" size={14} />
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`fw-semibold ${
                        index === 1 ? "text-danger" : "text-success"
                      }`}
                    >
                      {index === 1 ? "Cancelled" : "Completed"}
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-3">
                No appointments found
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
