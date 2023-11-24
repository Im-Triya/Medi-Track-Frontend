import React, { useState, useEffect } from "react";
import DocNav from "./DocNav";
import Lottie from "lottie-react";
import animationData from "../Assets/Lottie-doctor4.json";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function DocAccount() {
  const [doctorID, setDoctorID] = useState("");
  const [values, setValues] = useState({
    age: "",
    sex: "",
    specialization: "",
    department: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/updatedoctor", { ...values, doctorID })
      .then((res) => {
        console.log(res.data);
        // Clear the form after successful submission
        setValues({
          age: "",
          sex: "",
          specialization: "",
          department: "",
        });
        navigate("/login");
      })
      .catch((err) => console.log(err));

    console.log("Form submitted:", { values });
  };

  useEffect(() => {
    setDoctorID(location.state?.doctorID || "");
  }, [location.state, doctorID]);

  return (
    <div className="h-screen bg-slate-200">
      <DocNav doctorID={doctorID} />

      <div className="flex bg-slate-200 p-8 font-serif text-[#7e97a6]">
        {/* First Column */}
        <div className="flex-1 mr-8">
          <h2 className="text-2xl font-bold mb-8">
            Update your Account Information {doctorID}
          </h2>

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700">
                Age:
              </label>
              <input
                name="age"
                type="text"
                placeholder="Enter Age"
                onChange={handleInput}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="sex" className="block text-gray-700">
                Sex:
              </label>
              <select
                name="sex"
                onChange={handleInput}
                value={values.sex}
                className="w-full p-2 rounded border border-gray-300"
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="specialization" className="block text-gray-700">
                Specialization:
              </label>
              <select
                name="specialization"
                onChange={handleInput}
                value={values.specialization}
                className="w-full p-2 rounded border border-gray-300"
              >
                <option value="">Select Specialization</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Nephrology">Nephrology</option>
                <option value="Neurology">Neurology</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Otolaryngology">Otolaryngology (ENT)</option>
                <option value="Rheumatology">Rheumatology</option>
                <option value="Urology">Urology</option>
                <option value="Pulmonology">Pulmonology</option>
                <option value="Endocrinology">Endocrinology</option>

                {/* Add more options as needed */}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="department" className="block text-gray-700">
                Department:
              </label>
              <select
                name="department"
                onChange={handleInput}
                value={values.department}
                className="w-full p-2 rounded border border-gray-300"
              >
                <option value="">Select Department</option>
                <option value="Internal Medicine">Cardiology</option>
                <option value="Pediatrics">Orthopedics</option>
                <option value="Pediatrics">Obstetrics and Gynecology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Pediatrics">Psychiatry</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </form>
        </div>

        {/* Second Column */}
        <div className="flex-1 flex flex-col justify-center items-center">
          {/* Lottie Animation */}
          <Lottie
            animationData={animationData}
            style={{ height: "450px", width: "100%" }}
          />

          <button
            type="submit"
            onClick={handleFormSubmit}
            className="bg-[#7e97a6] text-white rounded-full px-4 py-2 hover:bg-slate-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocAccount;
