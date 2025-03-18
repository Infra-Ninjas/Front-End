import React, { useState } from "react";
import AdminNavbar from "../../components/Admins-Components/AdminNavbar";
import SideBar from "../../components/Admins-Components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  // Dummy stats data
  const stats = {
    totalDoctors: 25,
    totalPatients: 120,
    appointmentsToday: 15,
    revenue: "$4,500"
  };

  const initialAppointments = [
    { id: 1, doctor: "Dr. John Doe", patient: "Alice", time: "10:30 AM" },
    { id: 2, doctor: "Dr. Sarah Lee", patient: "Bob", time: "11:00 AM" },
    { id: 3, doctor: "Dr. Michael Smith", patient: "Charlie", time: "11:30 AM" },
    { id: 4, doctor: "Dr. Emily Clark", patient: "David", time: "12:00 PM" }
  ];

  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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
      <div
        className="admin-content"
        style={{
          marginTop: "70px",      // offset for navbar
          marginLeft: "200px",    // offset for sidebar on large screens
          padding: "20px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh"
        }}
      >
        <div className="container-fluid main-content" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 className="mb-4 fw-bold text-center" style={{ marginTop: 0 }}>Dashboard</h2>
          {/* Stats Section */}
          <div className="row g-3 mb-4">
            {Object.entries(stats).map(([key, value]) => (
              <div className="col-6 col-sm-6 col-md-3" key={key}>
                <div className="card border-0 shadow p-2 text-center interactive-card">
                  <h6 className="text-secondary">{key.replace(/([A-Z])/g, " $1")}</h6>
                  <h4 className="fw-bold">{value}</h4>
                </div>
              </div>
            ))}
          </div>
          {/* Search Bar */}
          <div className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <h6 className="fw-bold mb-2 mb-sm-0">Recent Appointments</h6>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by doctor, patient, or time"
              value={search}
              onChange={handleSearch}
            />
          </div>
          {/* Appointments Table */}
          <div className="card border-0 shadow p-3 table-responsive" style={{ fontSize: "14px" }}>
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
      </div>
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
        @media (max-width: 991px) {
          .admin-content {
            margin-left: 0 !important;
          }
          .main-content {
            max-width: 100% !important;
            padding: 0 15px;
          }
        }
      `}</style>
    </>
  );
};

export default Dashboard;
