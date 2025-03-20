import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctorContext } from '../../contexts/Doctors-Context/DoctorContextProvider';
// If you store user token in user context:
import { useUserContext } from "../../contexts/Users-Context/UserContextProvider";
import axios from 'axios';
import UserLayout from "./UsersLayout";

const PatientsAppointments = () => {
  const { docId } = useParams(); // route param name is docId
  const { doctors } = useDoctorContext();
  const { uToken, userData } = useUserContext(); // userData might have user._id
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // 1) Find the doctor by docId
  useEffect(() => {
    if (doctors && docId) {
      const foundDoc = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoc);
    }
  }, [doctors, docId]);

  // 2) Generate booking slots once docInfo is found
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
        const currentMinutes = new Date().getMinutes();
        currentDate.setHours(currentHour > 10 ? currentHour : 10);
        currentDate.setMinutes(currentMinutes > 30 ? 30 : 0);
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

  // 3) Whenever slotIndex changes, update selectedDate in YYYY-MM-DD
  useEffect(() => {
    if (docSlots[slotIndex] && docSlots[slotIndex].length > 0) {
      const dateObj = docSlots[slotIndex][0].datetime;
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      setSelectedDate(`${year}-${month}-${day}`);
    }
  }, [slotIndex, docSlots]);

  // 4) Confirm Booking
  const handleConfirmBooking = async () => {
    try {
      if (!uToken) {
        // If user is not logged in, redirect to login
        return navigate('/login');
      }
      if (!slotTime) {
        return alert('Please select a time slot first!');
      }
      if (!selectedDate) {
        return alert('Date not determined. Please select a day slot first!');
      }

      // We'll assume userData._id is the patient's userId
      const userId = userData?._id || "67d99f28fc52e4a3bd0caf78";
      const docID = docInfo._id; // doctor ID from docInfo

      // Prepare request body
      const requestBody = {
        userId,
        docId: docID,
        slotDate: selectedDate,
        slotTime,
      };

      // Post to booking endpoint
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
        // Optionally navigate to MyAppointments
        // navigate('/myAppointments');
      } else {
        alert('Failed to book appointment: ' + response.data?.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error booking appointment: ' + error.message);
    }
  };

  if (!docInfo) {
    return (
      <UserLayout>
        <div className="container my-5">
          <h4 className="text-center">Loading doctor details...</h4>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="container my-5">
        {/* Title */}
        <h2
          className="text-center mb-5"
          style={{ color: '#007991', fontWeight: 'bold' }}
        >
          Book an Appointment
        </h2>

        {/* Doctor Details Section */}
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="card shadow-sm border-0">
              <img
                src={docInfo.image}
                alt={docInfo.name}
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
                  {docInfo.name}
                </h4>
                <p className="mb-1 text-muted">
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button
                  className="btn btn-sm text-white"
                  style={{
                    background: 'linear-gradient(to right, #00ACC1, #00838F)',
                    border: 'none',
                    fontWeight: '600',
                  }}
                >
                  {docInfo.experience}
                </button>

                <div className="mt-3">
                  <h6 style={{ fontWeight: 'bold', color: '#007991' }}>About</h6>
                  <p className="text-muted">{docInfo.about}</p>
                </div>

                <p className="fw-semibold mt-4">
                  Appointment fee:{' '}
                  <span style={{ color: '#007991' }}>{docInfo.fees}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="mt-5">
          <h5 style={{ color: '#007991', fontWeight: 'bold' }}>Booking Slots</h5>

          {/* Day Slots */}
          <div
            className="d-flex align-items-center mt-3"
            style={{ gap: '12px', overflowX: 'auto' }}
          >
            {docSlots.map((slotsForDay, index) => {
              const firstSlot = slotsForDay[0];
              const dayName = firstSlot
                ? daysOfWeek[firstSlot.datetime.getDay()]
                : '';
              const dayDate = firstSlot ? firstSlot.datetime.getDate() : '';
              const isActive = slotIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  style={{
                    minWidth: '45px',
                    padding: '10px 0',
                    cursor: 'pointer',
                    textAlign: 'center',
                    borderRadius: '20px',
                    border: isActive ? 'none' : '2px solid #007991',
                    backgroundColor: isActive ? '#007991' : 'transparent',
                    color: isActive ? '#fff' : '#007991',
                    fontWeight: '500',
                    transition: 'transform 0.3s ease-in-out',
                    fontSize: '14px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <p className="m-0">{dayName}</p>
                  <p className="m-0">{dayDate}</p>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div
            className="d-flex align-items-center mt-3"
            style={{ gap: '12px', overflowX: 'auto' }}
          >
            {docSlots[slotIndex] &&
              docSlots[slotIndex].map((timeObj, idx) => {
                const isSelected = slotTime === timeObj.time;
                return (
                  <p
                    key={idx}
                    onClick={() => setSlotTime(timeObj.time)}
                    style={{
                      fontSize: '13px',
                      padding: '6px 14px',
                      cursor: 'pointer',
                      borderRadius: '20px',
                      border: isSelected ? 'none' : '2px solid #007991',
                      backgroundColor: isSelected ? '#007991' : 'transparent',
                      color: isSelected ? '#fff' : '#007991',
                      transition: 'transform 0.3s ease-in-out',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {timeObj.time.toLowerCase()}
                  </p>
                );
              })}
          </div>

          {/* Confirm Booking Button */}
          <button
            onClick={handleConfirmBooking}
            className="btn mt-4 text-white shadow"
            style={{
              padding: '12px 56px',
              borderRadius: '50px',
              background: 'linear-gradient(to right, #30cfd0, #007991)',
              fontWeight: '600',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default PatientsAppointments;
