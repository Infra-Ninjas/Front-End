import React from "react";
import { assets } from "../../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <p className="text-center mb-5">You can reach us at</p>
      
      <div className="row align-items-center">
        {/* Left Column: Doctor Image */}
        <div className="col-md-6">
          <img 
            src={assets.contact_image} 
            alt="Doctor" 
            className="img-fluid rounded shadow" 
            style={{ maxWidth: "100%", height: "auto" }} // Ensures responsive image
          />
        </div>
        
        {/* Right Column: Contact Information */}
        <div className="col-md-6">
          <h5>Our Office</h5>
          <p>Seneca Polytechnic, 1750 Finch Avenue East, Toronto</p>
          <p>Tel: (437) 262-4620</p>
          <p>Email: agidado1@myseneca.ca</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;