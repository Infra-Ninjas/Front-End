import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

function Banner() {
  return (
    <div className="flex flex-col items-center bg-white text-gray-900 rounded-xl overflow-hidden py-32 px-8 md:px-16 lg:px-32 shadow-lg mt-64">
      
      {/* Image Section */}
      <div className="mt-24 mb-16">
        <div className="w-56 h-56 bg-teal-100 rounded-full overflow-hidden shadow-md">
          <img
            className="w-full h-full object-cover"
            src={assets.appointment_img}
            alt="Doctor"
          />
        </div>
      </div>

      {/* Text Content Below the Image */}
      <div className="text-center max-w-4xl mb-16">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 leading-snug">
          Book Appointment <br /> With 100+ Trusted Doctors
        </h1>
        <p className="text-2xl text-gray-700 mt-6">
          Easily connect with top doctors and schedule your appointment in just a few simple steps.
        </p>
      </div>

      {/* Button Below Text */}
      <div>
        <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-16 py-5 rounded-full text-xl font-bold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Banner;
