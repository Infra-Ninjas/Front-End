// // Updated Dashboard.jsx
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Dashboard = () => {
//     // Dummy data
//     const stats = {
//         totalDoctors: 25,
//         totalPatients: 120,
//         appointmentsToday: 15,
//         revenue: '$4,500'
//     };

//     const initialAppointments = [
//         { id: 1, doctor: 'Dr. John Doe', patient: 'Alice', time: '10:30 AM' },
//         { id: 2, doctor: 'Dr. Sarah Lee', patient: 'Bob', time: '11:00 AM' },
//         { id: 3, doctor: 'Dr. Michael Smith', patient: 'Charlie', time: '11:30 AM' },
//         { id: 4, doctor: 'Dr. Emily Clark', patient: 'David', time: '12:00 PM' }
//     ];

//     const [appointments, setAppointments] = useState(initialAppointments);
//     const [search, setSearch] = useState('');
//     const [sortColumn, setSortColumn] = useState(null);
//     const [sortOrder, setSortOrder] = useState('asc');

//     // Search filter function
//     const handleSearch = (e) => {
//         const value = e.target.value.toLowerCase();
//         setSearch(value);
//         const filtered = initialAppointments.filter(
//             (appointment) =>
//                 appointment.doctor.toLowerCase().includes(value) ||
//                 appointment.patient.toLowerCase().includes(value) ||
//                 appointment.time.toLowerCase().includes(value)
//         );
//         setAppointments(filtered);
//     };

//     // Sorting function
//     const handleSort = (column) => {
//         const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
//         setSortColumn(column);
//         setSortOrder(order);

//         const sorted = [...appointments].sort((a, b) => {
//             if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
//             if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
//             return 0;
//         });

//         setAppointments(sorted);
//     };

//     return (
//         <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "10px" }}>  {/* ✅ Reduced padding */}
//             <div className="d-flex">
//                 {/* Main Content */}
//                 <div className="container-fluid" style={{ maxWidth: "900px", marginLeft: "240px", marginTop: "0px" }}>  {/* ✅ Reduced marginTop */}
//                     <h2 className="mb-4 fw-bold text-center">Dashboard</h2>

//                     {/* Stats Section */}
//                     <div className="row g-3 mb-4">
//                         {Object.entries(stats).map(([key, value]) => (
//                             <div className="col-sm-6 col-md-3" key={key}>
//                                 <div className="card border-0 shadow p-2 text-center interactive-card">
//                                     <h6 className="text-secondary">{key.replace(/([A-Z])/g, ' $1')}</h6>
//                                     <h4 className="fw-bold">{value}</h4>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Search Bar */}
//                     <div className="mb-3 d-flex justify-content-between align-items-center">
//                         <h6 className="fw-bold mb-0">Recent Appointments</h6>
//                         <input
//                             type="text"
//                             className="form-control w-50"
//                             placeholder="Search by doctor, patient, or time"
//                             value={search}
//                             onChange={handleSearch}
//                         />
//                     </div>

//                     {/* Recent Appointments Section */}
//                     <div className="card border-0 shadow p-3" style={{ fontSize: "14px" }}>
//                         <table className="table table-hover table-bordered mb-0">
//                             <thead>
//                                 <tr>
//                                     <th onClick={() => handleSort('id')} style={{ cursor: "pointer" }}>ID</th>
//                                     <th onClick={() => handleSort('doctor')} style={{ cursor: "pointer" }}>Doctor</th>
//                                     <th onClick={() => handleSort('patient')} style={{ cursor: "pointer" }}>Patient</th>
//                                     <th onClick={() => handleSort('time')} style={{ cursor: "pointer" }}>Time</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {appointments.map((appointment) => (
//                                     <tr key={appointment.id}>
//                                         <td>{appointment.id}</td>
//                                         <td>{appointment.doctor}</td>
//                                         <td>{appointment.patient}</td>
//                                         <td>{appointment.time}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             {/* Styles */}
//             <style>{`
//                 .interactive-card {
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }
//                 .interactive-card:hover {
//                     background: #40E0D0;
//                     color: white;
//                     transform: translateY(-5px);
//                 }
//                 th {
//                     position: relative;
//                 }
//                 th:hover {
//                     background-color: #40E0D0;
//                     color: white;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default Dashboard;


// Updated Dashboard.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    // Dummy data
    const stats = {
        totalDoctors: 25,
        totalPatients: 120,
        appointmentsToday: 15,
        revenue: '$4,500'
    };

    const initialAppointments = [
        { id: 1, doctor: 'Dr. John Doe', patient: 'Alice', time: '10:30 AM' },
        { id: 2, doctor: 'Dr. Sarah Lee', patient: 'Bob', time: '11:00 AM' },
        { id: 3, doctor: 'Dr. Michael Smith', patient: 'Charlie', time: '11:30 AM' },
        { id: 4, doctor: 'Dr. Emily Clark', patient: 'David', time: '12:00 PM' }
    ];

    const [appointments, setAppointments] = useState(initialAppointments);
    const [search, setSearch] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

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
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(order);

        const sorted = [...appointments].sort((a, b) => {
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });

        setAppointments(sorted);
    };

    return (
        <div className="dashboard-container">
            <div className="d-flex">
                {/* Main Content */}
                <div className="container-fluid main-content">
                    <h2 className="mb-4 fw-bold text-center">Dashboard</h2>

                    {/* Stats Section */}
                    <div className="row g-3 mb-4">
                        {Object.entries(stats).map(([key, value]) => (
                            <div className="col-6 col-sm-6 col-md-3" key={key}>
                                <div className="card border-0 shadow p-2 text-center interactive-card">
                                    <h6 className="text-secondary">{key.replace(/([A-Z])/g, ' $1')}</h6>
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

                    {/* Recent Appointments Section */}
                    <div className="card border-0 shadow p-3 table-responsive">
                        <table className="table table-hover table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('id')} style={{ cursor: "pointer" }}>ID</th>
                                    <th onClick={() => handleSort('doctor')} style={{ cursor: "pointer" }}>Doctor</th>
                                    <th onClick={() => handleSort('patient')} style={{ cursor: "pointer" }}>Patient</th>
                                    <th onClick={() => handleSort('time')} style={{ cursor: "pointer" }}>Time</th>
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

            {/* Styles */}
            <style>{`
                .dashboard-container {
                    background-color: #f5f5f5;
                    min-height: 100vh;
                    padding: 10px;
                    margin-left: 50px; /* Shift dashboard slightly to the right */
                }

                .main-content {
                    max-width: 900px;
                    margin: 0 auto;
                }

                .interactive-card {
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .interactive-card:hover {
                    background: #40E0D0;
                    color: white;
                    transform: translateY(-5px);
                }

                th {
                    position: relative;
                }

                th:hover {
                    background-color: #40E0D0;
                    color: white;
                }

                .table-responsive {
                    overflow-x: auto;
                }

                .search-input {
                    width: 100%;
                    max-width: 400px;
                }

                @media (max-width: 768px) {
                    .row.g-3.mb-4 .col-6 {
                        flex: 0 0 50%;
                        max-width: 50%;
                    }
                }

                @media (max-width: 576px) {
                    .row.g-3.mb-4 .col-6 {
                        flex: 0 0 100%;
                        max-width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
