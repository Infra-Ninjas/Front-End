import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctorContext } from "../../contexts/Doctors-Context/DoctorContextProvider";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useDoctorContext();
  const navigate = useNavigate();
  const [relatedDoctors, setRelatedDoctors] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filteredDoctors = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelatedDoctors(filteredDoctors);
    }
  }, [doctors, speciality, docId]);

  if (relatedDoctors.length === 0) return null; // Hide if no related doctors

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "#007991", fontWeight: "bold" }}>
        Top Doctors to Book
      </h2>

      <div className="row justify-content-center">
        {relatedDoctors.slice(0, 5).map((doc) => (
          <div key={doc._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img src={doc.image} alt={doc.name} className="card-img-top" style={{ objectFit: "cover", height: "180px" }} />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: "#007991" }}>{doc.name}</h5>
                <p className="text-muted">{doc.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
