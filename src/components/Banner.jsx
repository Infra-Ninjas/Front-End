import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';

function Banner() {
  const navigate = useNavigate();

  const imageStyle = {
    width: '350px',    // Increased width for better visibility
    height: 'auto',    // Keep proportional height
    borderRadius: '0', // No border radius
    objectFit: 'cover',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '50px 20px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', margin: '20px 0' }}>
      <div style={{ flex: 1, paddingRight: '20px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#008080' }}>Book Appointment With 100+ Trusted Doctors</h1>
        <p style={{ fontSize: '16px', color: '#555', marginTop: '10px' }}>Easily connect with top doctors and schedule your appointment in just a few simple steps.</p>
        <button
          onClick={() => navigate('/login')}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#006666')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#008080')}
        >
          Book Appointment Now
        </button>
      </div>

      <div style={{ flex: 1, textAlign: 'right' }}>
        <img src={assets.appointment_img} alt="Doctor" style={imageStyle} />
      </div>
    </div>
  );
}

export default Banner;
