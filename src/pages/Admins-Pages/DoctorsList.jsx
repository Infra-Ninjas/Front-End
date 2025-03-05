
//dummy data

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorsList = () => {
    // Dummy data
    const initialDoctors = [
        { id: 1, name: 'Dr. John Doe', specialty: 'General Physician', email: 'john@example.com', experience: '5 Years' },
        { id: 2, name: 'Dr. Sarah Lee', specialty: 'Dermatologist', email: 'sarah@example.com', experience: '8 Years' },
        { id: 3, name: 'Dr. Michael Smith', specialty: 'Pediatrician', email: 'michael@example.com', experience: '6 Years' },
        { id: 4, name: 'Dr. Emily Clark', specialty: 'Gynecologist', email: 'emily@example.com', experience: '7 Years' }
    ];

    const [doctors, setDoctors] = useState(initialDoctors);
    const [search, setSearch] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    // Search filter function
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        const filtered = initialDoctors.filter(
            (doctor) =>
                doctor.name.toLowerCase().includes(value) ||
                doctor.specialty.toLowerCase().includes(value) ||
                doctor.email.toLowerCase().includes(value)
        );
        setDoctors(filtered);
    };

    // Sorting function
    const handleSort = (column) => {
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(order);

        const sorted = [...doctors].sort((a, b) => {
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });

        setDoctors(sorted);
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
            <div className="d-flex">
                {/* Main Content */}
                <div className="container-fluid" style={{ maxWidth: "900px", marginLeft: "260px" }}>
                    <h2 className="mb-4 fw-bold text-center">Doctors List</h2>

                    {/* Search Bar */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <h6 className="fw-bold mb-0">List of Doctors</h6>
                        <input
                            type="text"
                            className="form-control w-50"
                            placeholder="Search by name, specialty, or email"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>

                    {/* Doctors List Table */}
                    <div className="card border-0 shadow p-3" style={{ fontSize: "14px" }}>
                        <table className="table table-hover table-bordered mb-0">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort('id')} style={{ cursor: "pointer" }}>ID</th>
                                    <th onClick={() => handleSort('name')} style={{ cursor: "pointer" }}>Name</th>
                                    <th onClick={() => handleSort('specialty')} style={{ cursor: "pointer" }}>Specialty</th>
                                    <th onClick={() => handleSort('email')} style={{ cursor: "pointer" }}>Email</th>
                                    <th onClick={() => handleSort('experience')} style={{ cursor: "pointer" }}>Experience</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor) => (
                                    <tr key={doctor.id} className="interactive-row">
                                        <td>{doctor.id}</td>
                                        <td>{doctor.name}</td>
                                        <td>{doctor.specialty}</td>
                                        <td>{doctor.email}</td>
                                        <td>{doctor.experience}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Styles */}
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
            `}</style>
        </div>
    );
};

export default DoctorsList;
