import React from 'react';

function Footer() {
  return (
    <div className="bg-white text-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-12 md:px-20">
        <div className="flex items-start gap-16">

          {/* -------- Left Section (with extra padding/margin for alignment) -------- */}
          <div className="w-1/3 text-right">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
              HealthSync
            </h1>
            <p className="text-gray-600 mb-4">
              Your trusted healthcare partner, connecting you with top professionals for seamless health solutions.
            </p>
          </div>

          {/* -------- Center Section -------- */}
          <div className="w-1/3 text-center">
            <h2 className="text-lg font-semibold text-teal-700 mb-4">Company</h2>
            <ul className="space-y-2">
              <li className="text-gray-700 hover:text-teal-600 transition-colors duration-300">Home</li>
              <li className="text-gray-700 hover:text-teal-600 transition-colors duration-300">About Us</li>
              <li className="text-gray-700 hover:text-teal-600 transition-colors duration-300">Contact Us</li>
              <li className="text-gray-700 hover:text-teal-600 transition-colors duration-300">Privacy Policy</li>
            </ul>
          </div>

          {/* -------- Right Section -------- */}
          <div className="w-1/3 text-right">
            <h2 className="text-lg font-semibold text-teal-700 mb-4">Get in Touch</h2>
            <ul className="space-y-2">
              <li className="text-gray-700">📞 437-327-2732</li>
              <li className="text-gray-700">✉️ healthsync@gmail.com</li>
            </ul>
          </div>

        </div>

        {/* -------- Bottom Section -------- */}
        <div className="mt-12 border-t border-gray-300 pt-8 text-center text-gray-500">
          © {new Date().getFullYear()} HealthSync. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
