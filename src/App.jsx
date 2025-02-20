import React from "react";
import { Route, Routes } from "react-router-dom";
import './index.css'; 

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login"; 
import AdminLogin from "./pages/admin-Login"; 
import Appointment from "./pages/Appointment";
import AddDoctor from "./pages/AddDoctor";
import AdminDashboard from "./pages/AdminDashboard";
import AllAppointments from "./pages/AllAppointments";
import DoctorsList from "./pages/DoctorsList";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminNavbar from "./components/AdminNavbar";

// Context Providers
import AppProvider from "./contexts/AppContext"; 
import AdminContextProvider, { useAdminContext } from "./contexts/AdminContextProvider"; 

// Toast Notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// ✅ Main App Component
const App = () => {
    const { aToken } = useAdminContext();  // ✅ Use hook to access token

    return (
        <AppProvider> 
            <AdminContextProvider> 
                <div className="sm:mx-[10%]">
                    <ToastContainer />

                    {/* ✅ Show correct Navbar based on token */}
                    {aToken ? <AdminNavbar /> : <Navbar />}

                    {/* ✅ Routes */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/doctors/:speciality" element={<Doctors />} />
                        <Route path="/login" element={<Login />} /> 
                        <Route path="/AddDoctor" element={<AddDoctor />} /> 
                        <Route path="/AdminDashboard" element={<AdminDashboard />} /> 
                        <Route path="/AllAppointments" element={<AllAppointments />} /> 
                        <Route path="/DoctorsList" element={<DoctorsList />} /> 
                        <Route path="/admin-login" element={<AdminLogin />} /> 
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/myprofile" element={<MyProfile />} />
                        <Route path="/myappointments" element={<MyAppointments />} />
                        <Route path="/appointment/:docId" element={<Appointment />} />
                    </Routes>

                    <Footer />
                </div>
            </AdminContextProvider> 
        </AppProvider>
    );
};

export default App;
