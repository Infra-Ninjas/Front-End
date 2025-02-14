import React from 'react';
import { doctors } from '../assets/assets_frontend/assets';

function TopDoctors() {
  const containerStyle = {
    backgroundColor: '#f9f9f9',
    padding: '50px 20px',
    borderRadius: '15px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '40px',
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: '20px',
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: '#666',
    marginBottom: '40px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '10px',
    border: '3px solid #ddd',
  };

  const availableBadgeStyle = {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#1abc9c', // Turquoise for "Available"
    color: '#ffffff',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #16a085, #1abc9c)', // Another shade of turquoise for "View More"
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '30px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Top Doctors to Book</h1>
      <p style={subtitleStyle}>
        Choose from our best-rated doctors and schedule your appointment today.
      </p>
      <div style={gridStyle}>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img src={item.image} alt={item.name} style={imageStyle} />
            <div>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#2c3e50' }}>{item.name}</p>
              <p style={{ fontSize: '16px', color: '#888' }}>{item.speciality}</p>
              <div style={{ marginTop: '10px' }}>
                <span style={availableBadgeStyle}>Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0px 6px 14px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0px 2px 8px rgba(0, 0, 0, 0.1)';
        }}
      >
        View More
      </button>
    </div>
  );
}

export default TopDoctors;
