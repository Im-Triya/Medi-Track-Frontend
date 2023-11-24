import React, { useState, useEffect } from "react";
import axios from "axios";
import NavDoc from "./NavDoc";
import { useNavigate, useLocation } from "react-router-dom";

function FeedBack() {
  const [values, setValues] = useState({
    doctorID: "",
    feed: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [doctorID, setDoctorID] = useState("");

  //middlewrare
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setDoctorID(location.state?.doctorID || "");

    // Fetch doctors' names and IDs from the backend
    axios
      .get("http://localhost:8000/doctornames")
      .then((res) => {
        setDoctors(res.data); // Corrected to use the correct property names
        console.log("Doctors:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, [location.state?.doctorID, doctorID]);

  const handleInputChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/addfeed", { ...values, doctorID })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));

    // Add logic to submit feedback to the backend
    console.log("Feedback submitted:", values);
    // Clear the form after submission
    setValues({ doctorID: "", feed: "" }); // Update to match the state names
  };

  return (
    <div className="bg-slate-200 h-screen font-serif text-[#323f47]">
      <NavDoc />

      <div className="flex justify-center items-center h-full">
        <form className="bg-slate-100 p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-8">Provide Feedback</h2>

          <div className="mb-4">
            <label htmlFor="doctorID" className="block text-gray-700">
              Allergies
            </label>
            <select
              id="doctorID"
              name="doctorID"
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-gray-300"
            >
              <option value="" disabled>
                Select Doctor
              </option>
              {doctors.map((doctor) => (
                <option key={doctor.doctorID} value={doctor.doctorID}>
                  {doctor.name}{" "}
                  {/* Corrected to use the correct property name */}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="feedback" className="block text-gray-700">
              Feedback:
            </label>
            <textarea
              id="feed"
              name="feed"
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-gray-300"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#7e97a6] text-white rounded-full px-4 py-2"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedBack;
