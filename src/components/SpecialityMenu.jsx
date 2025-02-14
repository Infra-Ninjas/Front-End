import React from 'react';
import { specialityData } from '../assets/assets_frontend/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="relative bg-white py-24 text-gray-900 flex flex-col items-center ml-16">
      <div className="text-center mb-16 max-w-4xl">
      <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 leading-tight">
        Explore by Speciality   
    </h1>


        <p className="text-2xl text-gray-600 mt-4">
          Find the best doctors based on your specific needs and schedule your appointment.
        </p>
      </div>

      {/* Centered and Shifted Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            className="group flex flex-col items-center bg-gray-100 rounded-xl shadow-md p-8 transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <img
              className="w-28 h-28 object-cover rounded-full mb-6 border-4 border-teal-400 transition-all duration-300 group-hover:border-cyan-500"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-2xl font-bold text-teal-600 group-hover:text-cyan-500">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
