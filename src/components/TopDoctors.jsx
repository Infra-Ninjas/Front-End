import React from 'react';
import { doctors } from '../assets/assets_frontend/assets';

function TopDoctors() {
  return (
    <div className="flex flex-col items-center gap-8 my-16 bg-white py-16 px-8 rounded-xl shadow-lg">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
        Top Doctors to Book
      </h1>
      <p className="text-xl text-gray-700">Choose from our best-rated doctors and schedule your appointment today.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-7xl">
        {doctors.slice(0, 10).map((item, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <img className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-teal-300" src={item.image} alt={item.name} />
            <div className="text-center">
              <p className="text-xl font-bold text-teal-700">{item.name}</p>
              <p className="text-lg text-gray-600">{item.speciality}</p>
              <div className="mt-6">
                <span className="inline-block px-6 py-3 bg-teal-500 text-white text-base font-bold rounded-full shadow-md">
                  Available
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
        View More
      </button>
    </div>
  );
}

export default TopDoctors;
