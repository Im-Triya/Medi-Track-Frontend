import React, { useState, useEffect } from "react";
import NavHome from "./NavHome";
import Lottie from "lottie-react";
import animationData from "../Assets/Lottie-doctor4.json";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Account() {
  const [patientID, setPatientID] = useState("");
  const [values, setValues] = useState({
    age: "",
    sex: "",
    height: "",
    weight: "",
    contact: "",
    address: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/updatepatient", { ...values, patientID })
      .then((res) => {
        console.log(res.data);
        // Clear the form after successful submission
        setValues({
          age: "",
          sex: "",
          height: "",
          weight: "",
          contact: "",
          address: "",
        });
        navigate("/login");
      })
      .catch((err) => console.log(err));

    console.log("Form submitted:", { values });
  };

  useEffect(() => {
    setPatientID(location.state?.patientID || "");
  }, [location.state, patientID]);

  return (
    <div>
      <NavHome patientID={patientID} />

      <div className="flex bg-slate-200 p-8 font-serif text-[#7e97a6]">
        {/* First Column */}
        <div className="flex-1 mr-8">
          <h2 className="text-2xl font-bold mb-8">
            Update your Account Information {patientID}
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
              <input
                name="sex"
                type="text"
                placeholder="Enter F for female and M for male"
                onChange={handleInput}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="height" className="block text-gray-700">
                Height:
              </label>
              <input
                name="height"
                type="text"
                placeholder="Enter Height"
                onChange={handleInput}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="weight" className="block text-gray-700">
                Weight:
              </label>
              <input
                name="weight"
                type="text"
                placeholder="Enter Weight"
                onChange={handleInput}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contactNumber" className="block text-gray-700">
                Contact Number:
              </label>
              <input
                name="contact"
                type="text"
                placeholder="Enter Contact Number"
                onChange={handleInput}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700">
                Address:
              </label>
              <textarea
                name="address"
                type="text"
                placeholder="Enter Address"
                onChange={handleInput}
                rows="4"
                className="w-full p-2 rounded border border-gray-300"
              ></textarea>
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

export default Account;
