import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAdminContext } from '../../contexts/Admin-Context/AdminContextProvider';
import AdminNavbar from "../../components/Admins-Components/AdminNavbar";
import SideBar from "../../components/Admins-Components/SideBar";
import axios from "axios";

const DoctorsList = () => {
  const { aToken, changeAvailability } = useAdminContext();
  const [doctors, setDoctors] = useState([]);
  const adminserviceurl = import.meta.env.VITE_ADMINSERVICE_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${adminserviceurl}/api/doctors/all-doctors`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });
      setDoctors(data.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <>
      <AdminNavbar />
      <SideBar />
      <div className="admin-content">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h2 className="fw-bold text-center page-title">All Doctors</h2>

          <div className="row g-4">
            {doctors.map((item) => (
              <div className="col-12 col-sm-6 col-md-4" key={item._id}>
                <div className="card border-0 shadow-lg p-3 h-100 doctor-card">
                  
                  {/* Doctor Image */}
                  <div className="d-flex justify-content-center mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-circle"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title mb-1" style={{ fontSize: '1rem' }}>{item.name}</h5>
                    <p className="card-subtitle text-muted mb-2" style={{ fontSize: '0.85rem' }}>{item.speciality}</p>
                    <div className="mt-auto">
                      <div className="form-check d-inline-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={item.available}
                          onChange={() => changeAvailability(item._id)}
                        />
                        <label className="form-check-label ms-2" style={{ fontSize: '0.9rem' }}>Available</label>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .admin-content {
          margin-top: 60px;
          margin-left: 220px;
          padding: 40px 20px;
          min-height: 100vh;
          background-color: #f9f9f9;
          display: flex;
          justify-content: center;
        }

        .page-title {
          margin-bottom: 24px;
          margin-top: -10px;
        }

        .doctor-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 16px;
        }

        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        @media (max-width: 991px) {
          .admin-content {
            margin-left: 0;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default DoctorsList;
