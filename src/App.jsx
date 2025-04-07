import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Homepage Pages
import Home from "./pages/Homepage-Pages/Home";
import About from "./pages/Homepage-Pages/About";
import Contact from "./pages/Homepage-Pages/Contact";
import Doctors from "./pages/Homepage-Pages/Doctors";
import Appointment from "./pages/Homepage-Pages/appointments";

// User Pages
import MyAppointments from "./pages/Users-Pages/MyAppointments";
import MyProfile from "./pages/Users-Pages/MyProfile";
import Login from "./pages/Users-Pages/Login";
import UsersDoctosList from "./pages/Users-Pages/UsersDoctorsList";
import PatientsAppointments from "./pages/Users-Pages/PatientsAppointments";

// Admin Pages
import AddDoctor from "./pages/Admins-Pages/AddDoctor";
import AdminDashboard from "./pages/Admins-Pages/AdminDashboard";
import AllAppointments from "./pages/Admins-Pages/AllAppointments";
import DoctorsList from "./pages/Admins-Pages/DoctorsList";
import AdminLogin from "./pages/Admins-Pages/AdminLogin";

// Doctor Pages
import DoctorsDashboard from "./pages/Doctors-Pages/DoctorsDashboard";
import Patientslist from "./pages/Doctors-Pages/Patientslist";
import DoctorAppointments from "./pages/Doctors-Pages/DoctorAppointment";
import DoctorProfile from "./pages/Doctors-Pages/DoctorProfile";
import DoctorLogin from "./pages/Doctors-Pages/DoctorLogin";

// Common Components
import Navbar from "./components/Homepage-Components/Navbar";
import Footer from "./components/Homepage-Components/Footer";

// Contexts
import { useAdminContext } from "./contexts/Admin-Context/AdminContextProvider";
import { useUserContext } from "./contexts/Users-Context/UserContextProvider";
import { useDoctorContext } from "./contexts/Doctors-Context/DoctorContextProvider";

const App = () => {
  const { aToken, navbarRefresh } = useAdminContext();
  const { uToken } = useUserContext();
  const { dToken } = useDoctorContext();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!(aToken || uToken || dToken));

  useEffect(() => {
    setIsLoggedIn(!!(aToken || uToken || dToken));
  }, [navbarRefresh, aToken, uToken, dToken]);

  const protectedRoutes = [
    "/admin-dashboard",
    "/AddDoctor",
    "/DoctorsList",
    "/AllAppointments",
    "/admindashboard",
    "/doctorslist",
    "/addDoctor",
    "/allappointments",
    "/myprofile",
    "/myappointments",
    "/doctorDashboard",
    "/patientslist",
    "/doctorprofile",
    "/doctorappointment",
    "/usersdoctorslist",
    "/patientsbookappointments"
  ];

  const shouldShowNavbar = !protectedRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  const footerAllowedPaths = [
    "/",
    "/about",
    "/contact",
    "/doctors",
    "/login",
    "/admin-login",
    "/doctor-login"
  ];

  const shouldShowFooter = footerAllowedPaths.some(
    (path) => location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <div className="sm:mx-[10%]">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {shouldShowNavbar && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment/:docId" element={<Appointment />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={aToken ? <AdminDashboard /> : <Navigate to="/admin-login" replace />} />
        <Route path="/AddDoctor" element={aToken ? <AddDoctor /> : <Navigate to="/admin-login" replace />} />
        <Route path="/DoctorsList" element={aToken ? <DoctorsList /> : <Navigate to="/admin-login" replace />} />
        <Route path="/AllAppointments" element={aToken ? <AllAppointments /> : <Navigate to="/admin-login" replace />} />
        <Route path="/admindashboard" element={aToken ? <AdminDashboard /> : <Navigate to="/admin-login" replace />} />
        <Route path="/doctorslist" element={aToken ? <DoctorsList /> : <Navigate to="/admin-login" replace />} />
        <Route path="/addDoctor" element={aToken ? <AddDoctor /> : <Navigate to="/admin-login" replace />} />
        <Route path="/allappointments" element={aToken ? <AllAppointments /> : <Navigate to="/admin-login" replace />} />

        {/* User */}
        <Route path="/myprofile" element={uToken ? <MyProfile /> : <Navigate to="/login" replace />} />
        <Route path="/myappointments" element={uToken ? <MyAppointments /> : <Navigate to="/login" replace />} />
        <Route path="/usersdoctorslist" element={uToken ? <UsersDoctosList /> : <Navigate to="/login" replace />} />
        <Route path="/patientsbookappointments/:docId" element={uToken ? <PatientsAppointments /> : <Navigate to="/login" replace />} />

        {/* Doctor */}
        <Route path="/doctorDashboard" element={dToken ? <DoctorsDashboard /> : <Navigate to="/doctor-login" replace />} />
        <Route path="/patientslist" element={dToken ? <Patientslist /> : <Navigate to="/doctor-login" replace />} />
        <Route path="/doctorprofile" element={dToken ? <DoctorProfile /> : <Navigate to="/doctor-login" replace />} />
        <Route path="/doctorappointment" element={dToken ? <DoctorAppointments /> : <Navigate to="/doctor-login" replace />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default App;
