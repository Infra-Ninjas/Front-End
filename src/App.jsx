import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './index.css'; 
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login"; 
import AdminLogin from "./pages/admin-Login"; 
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppProvider from "./contexts/AppContext"; 
import AdminContextProvider from "./contexts/AdminContextProvider";  // ✅ Import AdminContextProvider

const App = () => {
  return (
    
      <AppProvider> 
        <AdminContextProvider> {/* ✅ Wrap inside AdminContextProvider */}
          <div className="sm:mx-[10%]">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctors/:speciality" element={<Doctors />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/admin-login" element={<AdminLogin />} /> 
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/myappointments" element={<MyAppointments />} />
              <Route path="/appointment/:docId" element={<Appointment />} />
            </Routes>
            <Footer />
          </div>
        </AdminContextProvider> {/* ✅ Closing tag */}
      </AppProvider>
    
  );
};

export default App;
