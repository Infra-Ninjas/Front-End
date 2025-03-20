import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctorContext } from '../../contexts/Doctors-Context/DoctorContextProvider';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useDoctorContext();
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  if (!relDoc || relDoc.length === 0) return null; // Hide if no related doctors

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4"
        style={{ color: '#007991', fontWeight: 'bold' }}
      >
        Top Doctors to Book
      </h2>
      <p className="text-center text-muted mb-4">
        Simply browse through our extensive list
      </p>

      <div className="row justify-content-center">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="col-sm-6 col-md-4 col-lg-3 mb-4"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
          >
            <div className="card h-100 shadow-sm border-0">
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
                style={{
                  backgroundColor: '#e7f3ff',
                  objectFit: 'cover',
                  height: '180px',
                  transition: 'transform 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div className="card-body text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'green',
                      borderRadius: '50%',
                      marginRight: '5px',
                    }}
                  ></div>
                  <small className="text-success">Available</small>
                </div>
                <h5
                  className="card-title mb-1"
                  style={{ color: '#007991', fontWeight: 'bold', fontSize: '1rem' }}
                >
                  {item.name}
                </h5>
                <p className="card-text text-muted" style={{ fontSize: '0.85rem' }}>
                  {item.speciality}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <button
          onClick={() => {
            navigate('/doctors');
            window.scrollTo(0, 0);
          }}
          className="btn text-white px-4 py-2 rounded-pill shadow"
          style={{
            background: 'linear-gradient(to right, #30cfd0, #007991)',
            fontWeight: '600',
            transition: 'transform 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
        >
          View All Doctors
        </button>
      </div>
    </div>
  );
};

export default RelatedDoctors;
