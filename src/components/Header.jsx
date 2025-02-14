import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const headerStyle = {
    background: 'linear-gradient(to bottom right, #E0F7FA, #B2EBF2)',
    padding: '50px 20px',
    position: 'relative',
    overflow: 'hidden',
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #00ACC1, #00838F)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <div style={headerStyle}>
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Left Side (Text Section) */}
        <div className="md:w-1/2">
          <h1 style={{ fontSize: '64px', fontWeight: '900', color: '#007777' }}>
            Your Health, <br /> Your Control
          </h1>
          <p style={{ fontSize: '20px', margin: '20px 0', color: '#37474F' }}>
            Empower your wellness journey. Connect with world-class doctors and schedule your appointment in just a few steps.
          </p>
          <div className="flex gap-4">
            <div
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onClick={() => navigate('/login')} // Navigate to Login page
            >
              Book Appointment Now
            </div>
            <div
              style={{
                ...buttonStyle,
                background: 'linear-gradient(to right, #1abc9c, #16a085)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onClick={() => navigate('/login')} // Navigate to Create Account page
            >
              Create Account
            </div>
          </div>
        </div>

        {/* Right Side (Image Section) */}
        <div className="md:w-1/2">
          <img
            src={assets.header_img}
            alt="Doctor"
            style={{ width: '90%', maxHeight: '500px', borderRadius: '20px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
