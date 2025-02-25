//Main App Component
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Homepage Pages Imports
import Home from "./pages/Homepage-Pages/Home";
import About from "./pages/Homepage-Pages/About";
import Contact from "./pages/Homepage-Pages/Contact";
import AdminLogin from "./pages/Homepage-Pages/AdminLogin";
import Doctors from "./pages/Homepage-Pages/Doctors";

//User Pages Imports
import Dashboard from "./pages/Users-Pages/Dashboard";
import MyAppointments from "./pages/Users-Pages/MyAppointments";
import MyProfile from "./pages/Users-Pages/MyProfile";
import Login from "./pages/Users-Pages/Login";

//Admin Pages Imports
import AddDoctor from "./pages/Admins-Pages/AddDoctor";
import AdminDashboard from "./pages/Admins-Pages/AdminDashboard";
import AllAppointments from "./pages/Admins-Pages/AllAppointments";
import DoctorsList from "./pages/Admins-Pages/DoctorsList";

//Doctor Pages Imports
import DoctorsDashboard from "./pages/Doctors-Pages/DoctorsDashboard";
import Patientslist from "./pages/Doctors-Pages/Patientslist";


// Homepage Components
import Navbar from "./components/Homepage-Components/Navbar";
import Footer from "./components/Homepage-Components/Footer";

// Admin Components
import AdminNavbar from "./components/Admins-Components/AdminNavbar";
import SideBar from "./components/Admins-Components/SideBar";

//User Conponents
//import UserNavbar from "./components/Users-Components/UserNavbar";
//import UserSidebar from "./components/Users-Components/UserSidebar";

//Doctor Components
//import DoctorNavbar from "./components/Doctors-Components/DoctorNavbar";
//import DoctorSidebar from "./components/Doctors-Components/DoctorSidebar";


// ✅ Correctly Import useAdminContext
import { useAdminContext } from "./contexts/Admin-Context/AdminContextProvider";

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
               
                
               

                {/* ✅ Admin Routes With Protection */}
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                    path="/admin-dashboard"
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


                

                {/*User Routes*/}
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/myappointments" element={<MyAppointments />} />
                
                
                {/*Admin Routes*/}
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/doctorslist" element={<DoctorsList />} />
                <Route path="/addDoctor" element={<AddDoctor />} />
                <Route path="/allappointments" element={<AllAppointments />} />
                
                
                {/*Doctor Routes*/}
                <Route path="/doctorDashboard" element={<DoctorsDashboard />} />
                <Route path="/patientslist" element={<Patientslist />} />


                
                
               
                
            </Routes>

            <Footer />
        </div>
    );
};

export default App;
