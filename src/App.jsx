import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
import AdminDashboard from "./pages/Admin-Dashboard";
import AllAppointments from "./pages/AllAppointments";
import DoctorsList from "./pages/DoctorsList";
//import Dashboard from "./pages/Doctorspages/Dashboard";

// Components
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

// ✅ Correctly Import useAdminContext
import { useAdminContext } from "./contexts/AdminContextProvider";

const App = () => {
    const { aToken, navbarRefresh } = useAdminContext(); // ✅ Use hook directly (no errors now)
    const [isLoggedIn, setIsLoggedIn] = useState(!!aToken);

    // ✅ Sync login state whenever token changes
    useEffect(() => {
        setIsLoggedIn(!!aToken);
    }, [navbarRefresh]);

    return (
        <div className="sm:mx-[10%]">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme="colored" />
            {/* ✅ Show Navbar and Sidebar */}
            {isLoggedIn ? (
                <>
                    <AdminNavbar />
                    <SideBar />
                </>
            ) : (
                <Navbar />
            )}

            {/* ✅ Routes */}
            <Routes>
                {/* Landing Page Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctors/:speciality" element={<Doctors />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/myappointments" element={<MyAppointments />} />
                <Route path="/appointment/:docId" element={<Appointment />} />
               

                {/* ✅ Admin Routes With Protection */}
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                    path="/Admin-Dashboard"
                    element={aToken ? <AdminDashboard /> : <Navigate to="/admin-login" replace />}
                />
                <Route
                    path="/AddDoctor"
                    element={aToken ? <AddDoctor /> : <Navigate to="/admin-login" replace />}
                />
                <Route
                    path="/DoctorsList"
                    element={aToken ? <DoctorsList /> : <Navigate to="/admin-login" replace />}
                />
                 <Route 
                    path="/AllAppointments"
                    element={aToken ? <AllAppointments /> : <Navigate to="/admin-login" replace />} />
            </Routes>

            <Footer />
        </div>
    );
};

export default App;
