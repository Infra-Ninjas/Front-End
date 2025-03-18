import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "../../components/Admins-Components/AdminNavbar";
import SideBar from "../../components/Admins-Components/SideBar";

const Appointments = () => {
  // Dummy data
  const initialAppointments = [
    { id: 1, doctor: 'Dr. John Doe', patient: 'Alice', time: '10:30 AM' },
    { id: 2, doctor: 'Dr. Sarah Lee', patient: 'Bob', time: '11:00 AM' },
    { id: 3, doctor: 'Dr. Michael Smith', patient: 'Charlie', time: '11:30 AM' },
    { id: 4, doctor: 'Dr. Emily Clark', patient: 'David', time: '12:00 PM' },
    { id: 5, doctor: 'Dr. John Doe', patient: 'Emma', time: '12:30 PM' }
  ];

  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Search filter function
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = initialAppointments.filter(
      (appointment) =>
        appointment.doctor.toLowerCase().includes(value) ||
        appointment.patient.toLowerCase().includes(value) ||
        appointment.time.toLowerCase().includes(value)
    );
    setAppointments(filtered);
  };

  // Sorting function
  const handleSort = (column) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);

    const sorted = [...appointments].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setAppointments(sorted);
  };

  return (
    <>
      <AdminNavbar />
      <SideBar />

      {/* Main content container using a dedicated class for responsiveness */}
      <div className="admin-content">
        <div className="container-fluid" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 className="mb-4 fw-bold text-center" style={{ marginTop: 0 }}>Appointments</h2>

          {/* Search Bar */}
          <div className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <h6 className="fw-bold mb-0">List of Appointments</h6>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search by doctor, patient, or time"
              value={search}
              onChange={handleSearch}
            />
          </div>

          {/* Appointments Table */}
          <div className="card border-0 shadow p-3" style={{ fontSize: "14px" }}>
            <table className="table table-hover table-bordered mb-0">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>ID</th>
                  <th onClick={() => handleSort("doctor")} style={{ cursor: "pointer" }}>Doctor</th>
                  <th onClick={() => handleSort("patient")} style={{ cursor: "pointer" }}>Patient</th>
                  <th onClick={() => handleSort("time")} style={{ cursor: "pointer" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="interactive-row">
                    <td>{appointment.id}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.patient}</td>
                    <td>{appointment.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inline styles for hover effects and responsiveness */}
        <style>{`
          .interactive-row {
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .interactive-row:hover {
            background: #40E0D0;
            color: white;
          }
          th {
            position: relative;
          }
          th:hover {
            background-color: #40E0D0;
            color: white;
          }
          .admin-content {
            margin-top: 70px;      /* Fixed navbar height */
            margin-left: 200px;    /* Fixed sidebar width on large screens */
            padding: 20px;
            background-color: #f5f5f5;
            min-height: 100vh;
            transition: margin 0.3s ease;
          }
          @media (max-width: 991px) {
            .admin-content {
              margin-left: 0 !important;  /* Remove left margin on small screens */
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Appointments;
