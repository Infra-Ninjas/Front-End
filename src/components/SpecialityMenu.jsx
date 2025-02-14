import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  const containerStyle = {
    backgroundColor: '#ffffff',
    padding: '50px 20px',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: '800',
    color: '#008080',
    marginBottom: '20px',
  };

  const subtitleStyle = {
    fontSize: '20px',
    color: '#555',
    marginBottom: '40px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle = {
    backgroundColor: '#f2f2f2', // Light grey background for the cards
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '15px',
    transition: 'border 0.3s ease',
    border: '4px solid #ddd', // Light grey border for the profile picture
  };

  const specialityTextStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333', // Black text for the speciality
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Explore by Speciality</h1>
      <p style={subtitleStyle}>
        Find the best doctors based on your specific needs and schedule your appointment.
      </p>
      <div style={gridStyle}>
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0px 6px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img
              src={item.image}
              alt={item.speciality}
              style={imageStyle}
              onMouseEnter={(e) => (e.currentTarget.style.border = '4px solid #00b3b3')}
              onMouseLeave={(e) => (e.currentTarget.style.border = '4px solid #ddd')}
            />
            <p style={specialityTextStyle}>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
