import React from 'react';
// import { DoctorContext } from '../../contexts/Doctors-Context/DoctorContext';
// import { AppContext } from '../../contexts/AppContext';
import { assets } from '../../assets/assets_frontend/assets';

const DoctorProfile = () => {
    // const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
    // const { currency, backendUrl } = useContext(AppContext);

    // Dummy Data (Since backend is not configured)
    const profileData = {
        image: assets.doc1, 
        name: "Dr. John Doe",
        degree: "MD",
        speciality: "Cardiology",
        experience: "10+ years",
        about: "Dr. John Doe is an experienced cardiologist with over a decade of expertise in treating heart-related conditions.",
        fees: 100,
        address: {
            line1: "123 Medical Street",
            line2: "New York, USA"
        }
    };

    const currency = "$"; // Mocked currency symbol

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4">
                <div className="row">
                    {/* Doctor Image */}
                    <div className="col-md-3 text-center">
                        <img
                            src={profileData.image}
                            alt="Doctor"
                            className="img-fluid rounded-circle"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                    </div>

                    {/* Doctor Details */}
                    <div className="col-md-9">
                        <h4 className="mb-1">{profileData.name}</h4>
                        <p className="text-muted">{profileData.degree} - {profileData.speciality}</p>
                        <button className="btn btn-info btn-sm">{profileData.experience}</button>

                        {/* About Section */}
                        <div className="mt-3">
                            <h6>About:</h6>
                            <p className="text-secondary">{profileData.about}</p>
                        </div>

                        {/* Appointment Fee */}
                        <p className="mt-2">
                            <strong>Appointment Fee:</strong> <span className="text-success">{currency} {profileData.fees}</span>
                        </p>

                        {/* Address */}
                        <div className="mt-2">
                            <h6>Address:</h6>
                            <p>{profileData.address.line1}<br />{profileData.address.line2}</p>
                        </div>

                        {/* Availability Checkbox */}
                        <div className="form-check mt-3">
                            <input type="checkbox" className="form-check-input" id="availabilityCheck" />
                            <label className="form-check-label" htmlFor="availabilityCheck">Available</label>
                        </div>

                        {/* Edit Button */}
                        <button className="btn btn-primary mt-3">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;