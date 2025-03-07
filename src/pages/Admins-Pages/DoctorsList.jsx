import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useAdminContext } from '../../contexts/Admin-Context/AdminContextProvider';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useAdminContext();

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  return (
    <div
      className="container-fluid py-4"
      style={{
        marginLeft: '220px',           // Adjust if your sidebar is a different width
        maxWidth: 'calc(100% - 220px)' // Prevents right-side cutoff
      }}
    >
      <h1 className="fs-3 mb-4">All Doctors</h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {doctors.map((item) => (
          <div className="col" key={item._id}>
            <div 
              className="card h-100 shadow-sm" 
              style={{ borderRadius: '8px' }}
            >
              {/* Image container to display the full image without cropping */}
              <div
                className="d-flex align-items-center justify-content-center rounded-top"
                style={{
                  width: '100%',
                  height: '140px',
                  overflow: 'hidden',
                  backgroundColor: '#f8f9fa' // Light gray background (optional)
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',     // Ensures the full image is shown
                    objectPosition: 'center'
                  }}
                />
              </div>

              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title mb-1" style={{ fontSize: '1rem' }}>
                  {item.name}
                </h5>
                <p className="card-subtitle text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                  {item.speciality}
                </p>

                <div className="mt-auto">
                  <div className="form-check d-inline-block">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeAvailability(item.id)}
                    />
                    <label className="form-check-label ms-2" style={{ fontSize: '0.9rem' }}>
                      Available
                    </label>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
