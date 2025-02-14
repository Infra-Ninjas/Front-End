import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Header = () => {
  return (
    <div className="relative bg-gradient-to-br from-teal-100 to-cyan-100 overflow-hidden py-32 px-8 md:px-16 lg:px-24 text-gray-900">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-[-100px] w-[300px] h-[300px] bg-teal-300 opacity-30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-[-150px] w-[400px] h-[400px] bg-cyan-400 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* --------------- Left Side (Text Section) -------------- */}
        <div className="md:w-1/2 flex flex-col items-start gap-8">
          <h1 className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 leading-tight">
            Your Health, <br /> Your Control
          </h1>
          <p className="text-xl leading-relaxed text-gray-800">
            Empower your wellness journey. Connect with world-class doctors and schedule your appointment in just a few steps.
          </p>
          <a
            href="#"
            className="flex items-center gap-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-12 py-5 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Book Appointment Now
            <img className="w-6 h-6" src={assets.arrow_icon} alt="Arrow Icon" />
          </a>
        </div>

        {/* --------------- Right Side (Image Section) -------------- */}
        <div className="md:w-1/2 relative">
          <div className="relative z-10">
            <img
              className="w-[90%] max-h-[500px] lg:max-h-[600px] object-cover rounded-2xl shadow-lg border-4 border-teal-300"
              src={assets.header_img}
              alt="Doctor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
