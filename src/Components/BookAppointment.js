import React, { useState, useEffect } from "react";
import axios from "axios";
import NavHome from "./NavHome";
import { useNavigate, useLocation } from "react-router-dom";

function BookAppointment() {
  const [patientID, setPatientID] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [values, setValues] = useState({
    date: "",
    doctorID: "",
    issue: "",
    status: "...pending",
  });

  //middlewrare
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPatientID(location.state?.patientID || "");

    // Fetch previous appointments for the user from the backend
    axios
      .post("http://localhost:8000/appointmentdetails", {
        patientID: patientID,
      })
      .then((res) => {
        setPreviousAppointments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching previous appointments:", err);
      });

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
  }, [location.state?.patientID, patientID]);

  const handleInputChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add the patient ID to the appointment details
    axios
      .post("http://localhost:8000/addappointment", { ...values, patientID })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));

    console.log("Form submitted:", values);
    // Clear the form after submission
    setValues({ date: "", doctorID: "", issue: "" });
  };

  return (
    <div className="bg-slate-200 h-screen font-serif text-[#323f47]">
      <NavHome patientID={patientID} />

      <div className="grid grid-rows-1 grid-cols-3 gap-10 p-4 ">
        {/* Merged First and Second Columns */}
        <div className="col-span-2 text-center mx-1.5 ">
          <h2 className="text-2xl font-bold mb-8">
            Your Previous Appointments
          </h2>
          <table className="table-auto w-full">
            <thead>
              <tr className="">
                <th className="py-2 px-4">Appointment Date</th>
                <th className="py-2 px-4">Doctor</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {previousAppointments.map((appointment, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{appointment.date}</td>
                  <td className="py-2 px-4">{appointment.doctor}</td>
                  <td className="py-2 px-4">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Third Column */}
        <div className="col-span-1 bg-slate-100 p-4">
          <h2 className="text-2xl font-bold mb-4">Book New Appointment</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="doctorID" className="block text-gray-700">
                Doctor Name:
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
              <label htmlFor="issue" className="block text-gray-700">
                Issue:
              </label>
              <textarea
                id="issue"
                name="issue"
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 rounded border border-gray-300"
              ></textarea>
            </div>

            <button
              type="submit"
              onClick={handleFormSubmit}
              className="bg-[#7e97a6] text-white rounded-full px-4 py-2"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
