import React, { useEffect, useState } from "react";
import DoctorLayout from "./DoctorsLayout";
import { useDoctorContext } from "../../contexts/Doctors-Context/DoctorContextProvider";
import axios from "axios";
import { assets } from "../../assets/assets_frontend/assets";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const PatientList = () => {
  const { docId, dToken } = useDoctorContext();
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const doctorserviceurl = import.meta.env.VITE_DOCTORSERVICE_URL || "http://localhost:4003";

  const getDoctorAppointments = async () => {
    try {
      const url = `${doctorserviceurl}/api/doctor/appointments?docId=${docId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      if (response.data?.success) {
        const sorted = response.data.appointments.sort((a, b) => b.date - a.date);
        setAllAppointments(sorted);
        setStatusFilter("All");
        setCurrentPage(1);
      } else {
        setAllAppointments([]);
      }
    } catch (error) {
      console.error("❌ Error fetching doctor appointments:", error);
      setAllAppointments([]);
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${doctorserviceurl}/api/doctor/complete-appointment`,
        { docId, appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (response.data.success) {
        toast.success("Appointment marked as completed");
        getDoctorAppointments();
      }
    } catch (error) {
      console.error("❌ Error completing appointment:", error);
      toast.error("Could not complete appointment");
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${doctorserviceurl}/api/doctor/cancel-appointment`,
        { docId, appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (response.data.success) {
        toast.success("Appointment cancelled");
        getDoctorAppointments();
      }
    } catch (error) {
      console.error("❌ Error cancelling appointment:", error);
      toast.error("Could not cancel appointment");
    }
  };

  useEffect(() => {
    if (docId && dToken) {
      getDoctorAppointments();
    }
  }, [docId, dToken]);

  useEffect(() => {
    let filtered = allAppointments;

    if (statusFilter === "Pending") {
      filtered = allAppointments.filter((apt) => !apt.cancelled && !apt.isCompleted);
    } else if (statusFilter === "Completed") {
      filtered = allAppointments.filter((apt) => apt.isCompleted);
    } else if (statusFilter === "Cancelled") {
      filtered = allAppointments.filter((apt) => apt.cancelled);
    }

    setFilteredAppointments(filtered);
    setCurrentPage(1);
  }, [statusFilter, allAppointments]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  return (
    <DoctorLayout>
      <div className="py-4" style={{ background: "#f8f9fc", minHeight: "100vh" }}>
        <h3 className="fw-bold text-center mb-4">All Appointments</h3>

        {/* Filter */}
        <div className="d-flex justify-content-center mb-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select w-auto"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-responsive" style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)"
        }}>
          <table className="table align-middle mb-0" style={{ fontSize: "15px" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Payment</th>
                <th>Age</th>
                <th>Date & Time</th>
                <th>Fees</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? currentItems.map((apt, index) => (
                <tr key={apt._id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img src={assets.profile_pic} alt="patient" style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        objectFit: "cover"
                      }} />
                      <span className="fw-semibold text-capitalize">
                        {apt.userData?.name || "Unknown Patient"}
                      </span>
                    </div>
                  </td>

                  {/* Dynamic Payment with Icon */}
                  <td>
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontSize: "13px",
                        fontWeight: "500",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor:
                          apt.paymentType === "cash"
                            ? "#e7f1ff"
                            : apt.paymentType === "card"
                            ? "#e7fce7"
                            : apt.paymentType === "online"
                            ? "#f3e7ff"
                            : "#f0f0f0",
                        color:
                          apt.paymentType === "cash"
                            ? "#0d6efd"
                            : apt.paymentType === "card"
                            ? "#198754"
                            : apt.paymentType === "online"
                            ? "#6f42c1"
                            : "#6c757d",
                      }}
                    >
                      {apt.paymentType === "cash" && <>💵 CASH</>}
                      {apt.paymentType === "card" && <>💳 CARD</>}
                      {apt.paymentType === "online" && <>🌐 ONLINE</>}
                      {!["cash", "card", "online"].includes(apt.paymentType) && <> {apt.paymentType?.toUpperCase() || "Cash"}</>}
                    </span>
                  </td>

                  <td>24</td>
                  <td>{apt.slotDate}, {apt.slotTime}</td>
                  <td>${apt.fees || "40"}</td>
                  <td>
                    {!apt.cancelled && !apt.isCompleted ? (
                      <div className="d-flex gap-2 align-items-center">
                        <button
                          onClick={() => handleCancel(apt._id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <FaTimes />
                        </button>
                        <button
                          onClick={() => handleComplete(apt._id)}
                          className="btn btn-sm btn-outline-success"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <span className={`fw-semibold ${apt.cancelled ? "text-danger" : "text-success"}`}>
                        {apt.cancelled ? "Cancelled" : "Completed"}
                      </span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-3">No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4 gap-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span className="fw-semibold">Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
};

export default PatientList;
