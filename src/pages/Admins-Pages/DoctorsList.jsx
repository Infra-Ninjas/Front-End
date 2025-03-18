import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAdminContext } from '../../contexts/Admin-Context/AdminContextProvider';
import AdminNavbar from "../../components/Admins-Components/AdminNavbar";
import SideBar from "../../components/Admins-Components/SideBar";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useAdminContext();

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <>
      <AdminNavbar />
      <SideBar />
      <div
        className="admin-content"
        style={{
          marginTop: '70px',
          marginLeft: '200px',
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="mb-4 fw-bold text-center" style={{ marginTop: 0 }}>All Doctors</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
            {doctors.map((item) => (
              <div className="col" key={item._id}>
                <div className="card h-100 shadow-sm doctor-card" style={{ borderRadius: '8px' }}>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-top"
                    style={{
                      width: '100%',
                      height: '140px',
                      overflow: 'hidden',
                      backgroundColor: '#f8f9fa',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
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
                          onChange={() => changeAvailability(item.id)}
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
        .doctor-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .doctor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        @media (max-width: 991px) {
          .admin-content {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default DoctorsList;
