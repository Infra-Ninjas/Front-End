import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctorContext } from '../../contexts/Doctors-Context/DoctorContextProvider';
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";
import axios from 'axios';
import UserLayout from "./UsersLayout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientsAppointments = () => {
  const { docId } = useParams();
  const { getAllDoctors } = useDoctorContext();
  const { uToken, userData } = useUserContext();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const userServiceUrl = import.meta.env.VITE_USERSERVICE_URL;

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    const loadInitialDoctor = async () => {
      const freshDoctors = await getAllDoctors();
      const foundDoc = freshDoctors.find((doc) => doc._id === docId);
      if (foundDoc) setDocInfo(foundDoc);
    };
    loadInitialDoctor();
  }, [docId]);

  useEffect(() => {
    if (docInfo) {
      generateSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    if (docSlots[slotIndex] && docSlots[slotIndex].length > 0) {
      const dateObj = docSlots[slotIndex][0].datetime;
      setSelectedDate(dateObj.toISOString().split("T")[0]);
    }
  }, [slotIndex, docSlots]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const freshDoctors = await getAllDoctors();
        const thisDoctor = freshDoctors.find((doc) => doc._id === docId);
        if (!thisDoctor) return;

        setDocInfo(thisDoctor);
        const bookedTimes = thisDoctor.slots_booked?.[selectedDate] || [];
        setBookedSlots(bookedTimes);
      } catch (err) {
        console.error("Failed to fetch booked slots:", err);
      }
    };

    if (selectedDate && docId) {
      fetchBookedSlots();
    }
  }, [selectedDate, docId]);

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

  const handleConfirmBooking = async () => {
    try {
      if (!uToken) return navigate('/login');
      if (!slotTime) return toast.warn('Please select a time slot first!');
      if (!selectedDate) return toast.warn('Please select a day first!');

      const userId = userData?._id || localStorage.getItem("uId");
      if (!userId) return toast.error("User ID not found. Please log in again.");

      const requestBody = {
        userId,
        docId: docInfo._id,
        slotDate: selectedDate,
        slotTime,
      };

      const response = await axios.post(
        `${userServiceUrl}/api/user/book-appointment`,
        requestBody,
        { headers: { Authorization: `Bearer ${uToken}` } }
      );

      if (response.data && response.data.success) {
        toast.success('Appointment booked successfully!');

        const updatedDoctors = await getAllDoctors();
        const thisDoctor = updatedDoctors.find((doc) => doc._id === docId);
        setDocInfo(thisDoctor);

        const newBooked = thisDoctor.slots_booked?.[selectedDate] || [];
        setBookedSlots(newBooked);
        setSlotTime('');

        setTimeout(() => navigate('/myappointments'), 1500);
      } else {
        toast.error('Failed to book appointment: ' + response.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error booking appointment: ' + error.message);
    }
  };

  return (
    <UserLayout>
      <ToastContainer />
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold" style={{ color: '#007991' }}>
          Book an Appointment
        </h2>

        {/* Doctor Info */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <img
              src={docInfo?.image}
              alt={docInfo?.name}
              style={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '10px',
                backgroundColor: '#e7f3ff',
              }}
            />
          </div>

          <div className="col-12 col-md-8">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-4">
                <h4 className="mb-2 fw-bold" style={{ color: '#007991' }}>
                  {docInfo?.name}
                </h4>
                <p className="mb-1 text-muted">{docInfo?.degree} - {docInfo?.speciality}</p>
                <div className="mb-2">
                  <span className="badge bg-info text-white px-3 py-2 fw-semibold rounded-pill">
                    {docInfo?.experience}
                  </span>
                </div>

                <h6 className="fw-bold" style={{ color: '#007991' }}>About</h6>
                <p className="text-muted">{docInfo?.about}</p>

                <p className="fw-semibold mt-3 mb-0">
                  Appointment fee: <span style={{ color: '#007991' }}>{docInfo?.fees}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Slots */}
        <h5 className="fw-bold mb-3" style={{ color: '#007991' }}>Booking Slots</h5>

        {/* Day Buttons */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          {docSlots.map((slotsForDay, index) => {
            const firstSlot = slotsForDay[0];
            const dayName = firstSlot ? daysOfWeek[firstSlot.datetime.getDay()] : '';
            const dayDate = firstSlot ? firstSlot.datetime.getDate() : '';
            const isActive = slotIndex === index;

            return (
              <button
                key={index}
                onClick={() => setSlotIndex(index)}
                className="d-flex flex-column align-items-center justify-content-center fw-bold"
                style={{
                  borderRadius: '50px',
                  padding: '10px 16px',
                  minWidth: '60px',
                  border: isActive ? 'none' : '2px solid #007991',
                  backgroundColor: isActive ? '#007991' : 'transparent',
                  color: isActive ? 'white' : '#007991',
                  fontSize: '14px',
                }}
              >
                {dayName}
                <span>{dayDate}</span>
              </button>
            );
          })}
        </div>

        {/* Time Buttons */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          {docSlots[slotIndex] &&
            docSlots[slotIndex].map((timeObj, idx) => {
              const isSelected = slotTime === timeObj.time;
              const isBooked = bookedSlots.includes(timeObj.time);

              return (
                <button
                  key={idx}
                  onClick={() => !isBooked && setSlotTime(timeObj.time)}
                  disabled={isBooked}
                  style={{
                    borderRadius: '30px',
                    padding: '10px 20px',
                    border: isBooked
                      ? '2px solid #ccc'
                      : isSelected
                      ? '2px solid #004d4d'
                      : '2px solid #007991',
                    backgroundColor: isBooked
                      ? '#ccc'
                      : isSelected
                      ? '#007991'
                      : 'white',
                    color: isBooked
                      ? '#666'
                      : isSelected
                      ? 'white'
                      : '#007991',
                    fontWeight: isBooked ? 500 : 700,
                    fontSize: '14px',
                    cursor: isBooked ? 'not-allowed' : 'pointer',
                    opacity: isBooked ? 0.6 : 1,
                    boxShadow: isBooked ? 'none' : '0 2px 6px rgba(0, 121, 145, 0.15)',
                  }}
                >
                  {timeObj.time}
                </button>
              );
            })}
        </div>

        {/* Confirm Booking */}
        <div className="text-center mt-4">
          <button
            onClick={handleConfirmBooking}
            className="fw-bold text-white"
            style={{
              padding: '12px 40px',
              borderRadius: '40px',
              background: 'linear-gradient(to right, #4dd0e1, #007991)',
              border: 'none',
              fontSize: '16px',
              boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
            }}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default PatientsAppointments;
