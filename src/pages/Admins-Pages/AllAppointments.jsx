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

      <div className="admin-content">
        <div className="container-fluid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="mb-4 fw-bold">All Appointments</h2>

          {/* Search Bar */}
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

          {/* Appointments Table */}
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td className="d-flex align-items-center gap-2">
                      <img
                        src="https://via.placeholder.com/30"
                        alt="patient"
                        className="rounded-circle"
                      />
                      <span>{appointment.patient}</span>
                    </td>
                    <td>24</td>
                    <td>{appointment.time}</td>
                    <td className="d-flex align-items-center gap-2">
                      <img
                        src="https://via.placeholder.com/30"
                        alt="doctor"
                        className="rounded-circle"
                      />
                      <span>{appointment.doctor}</span>
                    </td>
                    <td>$40</td>
                    <td className="text-success fw-semibold">Completed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Styles */}
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
            border-bottom: 1px solid #f0f0f0;
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
