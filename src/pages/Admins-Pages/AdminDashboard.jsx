import React, { useState } from "react";
import AdminNavbar from "../../components/Admins-Components/AdminNavbar";
import SideBar from "../../components/Admins-Components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserMd, FaUsers, FaCalendarCheck, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    { label: "Total Doctors", value: 25, icon: <FaUserMd /> },
    { label: "Total Patients", value: 120, icon: <FaUsers /> },
    { label: "Appointments Today", value: 15, icon: <FaCalendarCheck /> },
    { label: "Revenue", value: "$4,500", icon: <FaDollarSign /> }
  ];

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
          marginTop: "70px",
          marginLeft: "200px",
          padding: "20px",
          backgroundColor: "#f4f4f6",
          minHeight: "100vh",
        }}
      >
        <div className="container-fluid main-content" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 className="mb-4 fw-bold text-center">Dashboard</h2>

          {/* Stat Cards */}
          <div className="row g-4 mb-4">
            {stats.map((stat, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div className="stat-card shadow-sm d-flex flex-column align-items-center text-center p-3 rounded bg-white">
                  <div className="icon-wrapper mb-2" style={{ fontSize: "24px", color: "#4e73df" }}>
                    {stat.icon}
                  </div>
                  <div className="stat-label text-muted" style={{ fontSize: "14px" }}>
                    {stat.label}
                  </div>
                  <div className="stat-value fw-bold" style={{ fontSize: "22px" }}>
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search + Appointments Table */}
          <div className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <h6 className="fw-bold mb-2 mb-sm-0">Recent Appointments</h6>
            <input
              type="text"
              className="form-control"
              placeholder="Search by doctor, patient, or time"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="card border-0 shadow p-3 table-responsive bg-white rounded">
            <table className="table mb-0">
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
                  <tr key={appointment.id}>
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

      {/* Additional Styles */}
      <style>{`
        .stat-card:hover {
          box-shadow: 0 6px 15px rgba(0,0,0,0.05);
          transform: translateY(-2px);
          transition: 0.2s ease;
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
