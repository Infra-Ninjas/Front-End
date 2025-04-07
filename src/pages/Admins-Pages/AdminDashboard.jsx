import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../components/Admins-Components/AdminNavbar";
import SideBar from "../../components/Admins-Components/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserMd, FaUsers, FaCalendarCheck, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { label: "Total Doctors", value: 0, icon: <FaUserMd /> },
    { label: "Total Patients", value: 0, icon: <FaUsers /> },
    { label: "Appointments Today", value: 0, icon: <FaCalendarCheck /> },
    { label: "Revenue", value: "$0", icon: <FaDollarSign /> },
  ]);

  const [appointments, setAppointments] = useState([]);
  const [allAppointmentsBackup, setAllAppointmentsBackup] = useState([]);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const adminServiceUrl = import.meta.env.VITE_ADMINSERVICE_URL;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("aToken");
        const res = await axios.get(`${adminServiceUrl}/api/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          const dashData = res.data.dashData;

          setStats([
            { label: "Total Doctors", value: dashData.doctors, icon: <FaUserMd /> },
            { label: "Total Patients", value: dashData.patients, icon: <FaUsers /> },
            { label: "Appointments Today", value: dashData.appointments, icon: <FaCalendarCheck /> },
            { label: "Revenue", value: `$${dashData.totalRevenue}`, icon: <FaDollarSign /> },
          ]);

          const formattedAppointments = dashData.latestAppointments.map((item, index) => ({
            id: index + 1,
            doctor: item.docData?.name || "Doctor",
            patient: item.userData?.name || "Patient",
            time: `${item.slotDate} ${item.slotTime}`,
            status: item.cancelled
              ? "Cancelled"
              : item.isCompleted
              ? "Completed"
              : "Pending",
          }));

          setAppointments(formattedAppointments);
          setAllAppointmentsBackup(formattedAppointments);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [adminServiceUrl]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value === "") {
      setAppointments(allAppointmentsBackup);
    } else {
      const filtered = allAppointmentsBackup.filter(
        (a) =>
          a.doctor.toLowerCase().includes(value) ||
          a.patient.toLowerCase().includes(value) ||
          a.time.toLowerCase().includes(value)
      );
      setAppointments(filtered);
    }
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
                  <th style={{ paddingLeft: "100px" }}>Status</th>


                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.id}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.patient}</td>
                      <td>{appointment.time}</td>
                      <td>
                        <span
                          className="badge text-white fw-semibold"
                          style={{
                            backgroundColor:
                              appointment.status === "Completed"
                                ? "#2E7D32" 
                                : appointment.status === "Cancelled"
                                ? "#B71C1C"
                                : "#455A64",
                            padding: "6px 12px",
                            borderRadius: "9px",
                            fontSize: "14px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "22px",
                            width: "90px",
                            margin: "0 auto",
                            textAlign: "center",
                            
                          }}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3 text-muted">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
