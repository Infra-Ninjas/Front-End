import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctorContext } from '../../contexts/Doctors-Context/DoctorContextProvider';
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";
import axios from 'axios';
import UserLayout from "./UsersLayout";

const PatientsAppointments = () => {
  const { docId } = useParams();
  const { doctors } = useDoctorContext();
  const { uToken, userData } = useUserContext();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    if (doctors && docId) {
      const foundDoc = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoc);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      generateSlots();
    }
  }, [docInfo]);

  const generateSlots = () => {
    const newSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const currentHour = new Date().getHours();
        currentDate.setHours(currentHour > 10 ? currentHour : 10);
        currentDate.setMinutes(0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      newSlots.push(timeSlots);
    }
    setDocSlots(newSlots);
  };

  useEffect(() => {
    if (docSlots[slotIndex] && docSlots[slotIndex].length > 0) {
      const dateObj = docSlots[slotIndex][0].datetime;
      setSelectedDate(dateObj.toISOString().split("T")[0]); 
    }
  }, [slotIndex, docSlots]);

  const handleConfirmBooking = async () => {
    try {
      if (!uToken) {
        return navigate('/login');
      }
      if (!slotTime) {
        return alert('Please select a time slot first!');
      }
      if (!selectedDate) {
        return alert('Date not determined. Please select a day slot first!');
      }

      const userId = userData?._id || localStorage.getItem("uId");

      if (!userId) {
        return alert("User ID not found. Please log in again.");
      }

      const requestBody = {
        userId,
        docId: docInfo._id,
        slotDate: selectedDate,
        slotTime,
      };

      const response = await axios.post(
        'http://localhost:4002/api/user/book-appointment',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      );

      if (response.data && response.data.success) {
        alert('Appointment booked successfully!');
      } else {
        alert('Failed to book appointment: ' + response.data?.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error booking appointment: ' + error.message);
    }
  };

  return (
    <UserLayout>
      <div className="container my-5">
        <h2 className="text-center mb-5" style={{ color: '#007991', fontWeight: 'bold' }}>
          Book an Appointment
        </h2>

        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0">
              <img
                src={docInfo?.image}
                alt={docInfo?.name}
                className="card-img-top"
                style={{
                  objectFit: 'cover',
                  height: '300px',
                  backgroundColor: '#e7f3ff',
                }}
              />
            </div>
          </div>

          <div className="col-12 col-md-8">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h4 className="card-title mb-2" style={{ color: '#007991' }}>
                  {docInfo?.name}
                </h4>
                <p className="mb-1 text-muted">
                  {docInfo?.degree} - {docInfo?.speciality}
                </p>
                <button className="btn btn-sm text-white" style={{ background: '#00ACC1', border: 'none', fontWeight: '600' }}>
                  {docInfo?.experience}
                </button>

                <div className="mt-3">
                  <h6 style={{ fontWeight: 'bold', color: '#007991' }}>About</h6>
                  <p className="text-muted">{docInfo?.about}</p>
                </div>

                <p className="fw-semibold mt-4">
                  Appointment fee: <span style={{ color: '#007991' }}>{docInfo?.fees}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <h5 className="text-center mt-5" style={{ color: '#007991', fontWeight: 'bold' }}>
          Booking Slots
        </h5>

        <div className="d-flex justify-content-center mt-3 flex-wrap gap-3">
          {docSlots.map((slotsForDay, index) => {
            const firstSlot = slotsForDay[0];
            const dayName = firstSlot ? daysOfWeek[firstSlot.datetime.getDay()] : '';
            const dayDate = firstSlot ? firstSlot.datetime.getDate() : '';
            return (
              <button key={index} className={`btn ${slotIndex === index ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setSlotIndex(index)}>
                {dayName} {dayDate}
              </button>
            );
          })}
        </div>

        <div className="d-flex justify-content-center mt-3 flex-wrap gap-2">
          {docSlots[slotIndex] &&
            docSlots[slotIndex].map((timeObj, idx) => (
              <button key={idx} className={`btn ${slotTime === timeObj.time ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setSlotTime(timeObj.time)}>
                {timeObj.time}
              </button>
            ))}
        </div>

        <div className="text-center mt-4">
          <button onClick={handleConfirmBooking} className="btn btn-lg text-white" style={{ background: '#007991', borderRadius: '20px' }}>
            Confirm Booking
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default PatientsAppointments;
