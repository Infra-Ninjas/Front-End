import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { useState } from "react";
import { AdminContext } from "../contexts/AdminContextProvider";
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // try catch block to check if the doctor picture is uploaded or not
        try {
            if (!docImg) {
                return toast.error('Please upload doctor picture');
            }
            const formData = new FormData()
            // form data to append the doctor details in the backend

            formData.append('name', name)
            formData.append('email', email) 
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({line1:address1,line2:address2}))
            formData.append('docImg', docImg)

            // axios post request to add the doctor details in the backend
              //console log  formData
              formData.forEach((value, key) => {
                console.log(`${key}  : ${value}`);
              })

              const { data } = await axios.post(backendUrl + /*end point for adding doctor*/ '/api/admin/add-doctor', formData, {headers: {aToken}})
               
              if (data.success){
                toast.success(data.message)
              } else{
                toast.error(data.message)
              }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4 mb-5" style={{ maxWidth: "1100px" }}>
            <form onSubmit={onSubmitHandler} className="border p-5 rounded shadow bg-white" style={{ borderRadius: "20px" }}>
            <h2 className="mb-8 px-6 text-dark fw-bold" style={{ paddingLeft: '2rem' }}>Add Doctor</h2>
                <div className="row">
                    <div className="col-md-3 text-center">
                        <label htmlFor="doc-img" className="d-block">
                            <img
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                alt="Upload"
                                className="img-fluid border rounded-circle p-2"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    cursor: "pointer",
                                    backgroundColor: "#f8f9fa",
                                }}
                            />
                        </label>
                        <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                        <p className="mt-2 text-secondary">Upload doctor <br />picture</p>
                    </div>

                    <div className="col-md-9">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Doctor Name</label>
                                <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Name" required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Speciality</label>
                                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="form-select" required>
                                    <option value="General physician">General physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Doctor Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" placeholder="Your email" required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Education</label>
                                <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" className="form-control" placeholder="Education" required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Doctor Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" placeholder="Password" required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" className="form-control mb-2" placeholder="Address 1" required />
                                <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" className="form-control" placeholder="Address 2" required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Experience</label>
                                <select onChange={(e) => setExperience(e.target.value)} value={experience} className="form-select" required>
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Year">2 Years</option>
                                    <option value="3 Year">3 Years</option>
                                    <option value="4 Year">4 Years</option>
                                    <option value="5 Year">5 Years</option>
                                    <option value="6 Year">6 Years</option>
                                    <option value="7 Year">7 Years</option>
                                    <option value="8 Year">8 Years</option>
                                    <option value="9 Year">9 Years</option>
                                    <option value="10 Year">10 Years</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Fees</label>
                                <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" className="form-control" placeholder="Your fees" required />
                            </div>

                            <div className="col-12">
                                <label className="form-label">About Doctor</label>
                                <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="form-control" placeholder="Write about doctor" rows={5} required />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="btn text-white px-5 py-2 fw-bold"
                        style={{
                            background: "linear-gradient(to right, #00c6ff, #40E0D0)",
                            borderRadius: "8px",
                            border: "none",
                        }}
                    >
                        Add doctor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
