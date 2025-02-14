// import React from 'react'

import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/myappointments' element={<MyAppointments />} />
        <Route path='/appointment:docId' element={<Appointment />} />
        <Route path="/headers" element={<Header />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App