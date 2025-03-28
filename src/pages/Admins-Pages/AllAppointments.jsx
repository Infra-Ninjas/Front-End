// Note: Dependencies required:
// npm install xlsx jspdf jspdf-autotable

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "../../components/Admins-Components/AdminNavbar";
import SideBar from "../../components/Admins-Components/SideBar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyCancelled, setShowOnlyCancelled] = useState(false);
  const itemsPerPage = 5;

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("aToken");
      const response = await axios.get("http://localhost:4001/api/admin/list-appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const mapped = response.data.data
          .sort((a, b) => b.date - a.date)
          .map((appt, index) => ({
            id: index + 1,
            _id: appt._id,
            doctor: appt.docData?.name || "Unknown",
            doctorImage: appt.docData?.image || "https://via.placeholder.com/30",
            patient: appt.userData?.name || "Unknown",
            patientImage: appt.userData?.image !== "Not Set" ? appt.userData?.image : "https://via.placeholder.com/30",
            time: `${appt.slotDate} (${appt.slotTime})`,
            fees: `$${appt.amount}`,
            cancelled: appt.cancelled,
            isCompleted: appt.isCompleted,
          }));
        setAppointments(mapped);
      }
    } catch (err) {
      setToastType("danger");
      setToastMessage("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value.toLowerCase());

  const handleCancelConfirmed = async () => {
    try {
      const token = localStorage.getItem("aToken");
      const response = await axios.post(
        "http://localhost:4001/api/admin/cancel-appointment",
        { appointmentId: selectedAppointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setToastType("success");
        setToastMessage("Appointment cancelled successfully.");
        fetchAppointments();
      }
    } catch {
      setToastType("danger");
      setToastMessage("Failed to cancel appointment.");
    } finally {
      setShowCancelModal(false);
    }
  };

  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  const filtered = appointments.filter((appt) => {
    const matchesSearch =
      appt.doctor.toLowerCase().includes(search) ||
      appt.patient.toLowerCase().includes(search) ||
      appt.time.toLowerCase().includes(search);
    return matchesSearch && (!showOnlyCancelled || appt.cancelled);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortColumn) return 0;
    return sortOrder === "asc"
      ? a[sortColumn] < b[sortColumn] ? -1 : 1
      : a[sortColumn] > b[sortColumn] ? -1 : 1;
  });

  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  return (
    <>
      <AdminNavbar />
      <SideBar />

      <div className="admin-content">
        <div className="container-fluid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="mb-4 fw-bold">All Appointments</h2>

          <div className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <h6 className="fw-bold mb-2 mb-sm-0">List of Appointments</h6>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search by doctor, patient, or time"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="card border-0 shadow p-3" style={{ fontSize: "14px" }}>
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th onClick={() => handleSort("id")}>#</th>
                  <th onClick={() => handleSort("patient")}>Patient</th>
                  <th>Age</th>
                  <th onClick={() => handleSort("time")}>Date & Time</th>
                  <th onClick={() => handleSort("doctor")}>Doctor</th>
                  <th>Fees</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((appt) => (
                  <tr key={appt._id}>
                    <td>{appt.id}</td>
                    <td className="d-flex align-items-center gap-2">
                      <img src={appt.patientImage} alt="patient" className="rounded-circle" style={{ width: "30px", height: "30px", objectFit: "cover" }} />
                      <span>{appt.patient}</span>
                    </td>
                    <td>24</td>
                    <td>{appt.time}</td>
                    <td className="d-flex align-items-center gap-2">
                      <img src={appt.doctorImage} alt="doctor" className="rounded-circle" style={{ width: "30px", height: "30px", objectFit: "cover" }} />
                      <span>{appt.doctor}</span>
                    </td>
                    <td>{appt.fees}</td>
                    <td>
                      <span className={`badge ${appt.cancelled ? "bg-danger" : "bg-success"}`}>
                        {appt.cancelled ? "Cancelled" : "Completed"}
                      </span>
                    </td>
                    <td>
                      {!appt.cancelled && (
                        <span
                          className="badge border border-danger text-danger fw-normal"
                          style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: '12px' }}
                          onClick={() => {
                            setSelectedAppointmentId(appt._id);
                            setShowCancelModal(true);
                          }}
                        >
                          Cancel
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <button className="btn btn-outline-secondary btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button className="btn btn-outline-secondary btn-sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
            </div>
          </div>

          {showCancelModal && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Cancel</h5>
                    <button type="button" className="btn-close" onClick={() => setShowCancelModal(false)}></button>
                  </div>
                  <div className="modal-body">Are you sure you want to cancel this appointment?</div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>Close</button>
                    <button className="btn btn-danger" onClick={handleCancelConfirmed}>Yes, Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {toastMessage && (
            <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
              <div className={`toast show text-white bg-${toastType}`}>
                <div className="d-flex">
                  <div className="toast-body">{toastMessage}</div>
                  <button className="btn-close btn-close-white me-2 m-auto" onClick={() => setToastMessage("")}></button>
                </div>
              </div>
            </div>
          )}
        </div>

        <style>{`
          .admin-content {
            margin-top: 70px;
            margin-left: 200px;
            padding: 20px;
            background-color: #f5f5f5;
            min-height: 100vh;
            transition: margin 0.3s ease;
          }

          @media (max-width: 991px) {
            .admin-content {
              margin-left: 0 !important;
            }
          }

          table th {
            cursor: pointer;
            vertical-align: middle;
            white-space: nowrap;
          }

          table td, table th {
            vertical-align: middle;
            background-color: white;
            border-bottom: 10px solid #f0f0f0;
          }

          table tr:hover {
            background-color: #f0f8ff;
          }

          table img {
            width: 30px;
            height: 30px;
            object-fit: cover;
          }
        `}</style>
      </div>
    </>
  );
};

export default Appointments;