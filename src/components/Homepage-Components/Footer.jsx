import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const footerStyle = {
    background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)', // Soft gradient background
    color: '#333',
    padding: '20px 40px',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '14px',
  };

  const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const linkStyle = {
    color: '#00796b',
    textDecoration: 'none',
    margin: '0 10px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = '#004d40';
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = '#00796b';
  };

  return (
    <footer style={footerStyle}>
      <div style={sectionStyle}>
        <div style={{ flex: '1 1 100%', textAlign: 'center', marginBottom: '10px' }}>
          <span style={{ color: '#00796b', fontWeight: 'bold' }}>© {new Date().getFullYear()} HealthSync</span> — Your trusted healthcare partner.
        </div>
        <div style={{ textAlign: 'center', flex: '1 1 100%' }}>
          <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Home
          </Link>
          <Link to="/about" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            About
          </Link>
          <Link to="/contact" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Contact
          </Link>
          <a href="#privacy" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Privacy Policy
          </a>
          <a href="#terms" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Terms of Service
          </a>
        </div>
        <div style={{ textAlign: 'center', flex: '1 1 100%', marginTop: '10px' }}>
          <a href="tel:+14373272732" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            📞 437-327-2732
          </a>
          <a href="mailto:healthsync@gmail.com" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            ✉️ healthsync@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
