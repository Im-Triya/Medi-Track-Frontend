import React, { useState, useEffect } from "react";
import axios from "axios";
import DocNav from "./DocNav";
import { useNavigate, useLocation } from "react-router-dom";

function DocBill() {
  const [doctorID, setDoctorID] = useState("");
  const [previousBills, setPreviousBills] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [values, setValues] = useState({
    appointmentID: "",
    status: "...pending",
    amount: "",
  });

  //middlewrare
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setDoctorID(location.state?.doctorID || "");

    // Fetch previous appointments for the user from the backend
    axios
      .post("http://localhost:8000/paymentdetailsfordoctor", {
        ...values,
        doctorID,
      })
      .then((res) => {
        setPreviousBills(res.data);
      })
      .catch((err) => {
        console.error("Error fetching previous bills:", err);
      });

    // Fetch patients' names and IDs from the backend
    axios
      .get("http://localhost:8000/patientnames")
      .then((res) => {
        setDoctors(res.data); // Corrected to use the correct property names
        console.log("Doctors:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, [location.state?.doctorID, doctorID, values]);

  const handleInputChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBill = (e) => {
    e.preventDefault();
    // Add the patient ID to the appointment details
    axios
      .post("http://localhost:8000/docbill", { ...values, doctorID })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));

    console.log("Bill sent successfully");
    // Clear the form after submission
    setValues({ date: "", doctorID: "", issue: "" });
  };

  return (
    <div className="bg-slate-200 h-screen font-serif text-[#323f47]">
      <DocNav doctorID={doctorID} />
      <div className="grid grid-rows-1 grid-cols-3 gap-10 p-4 ">
        {/* Third Column */}
        <div className="col-span-1 bg-slate-100 p-4">
          <h2 className="text-2xl font-bold mb-4">Manage Bills</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="appointmentID" className="block text-gray-700">
                Appointment ID:
              </label>
              <input
                type="integer"
                id="appointmentID"
                name="appointmentID"
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="doctorID" className="block text-gray-700">
                Patient Name:
              </label>
              <select
                id="patientID"
                name="patientID"
                onChange={handleInputChange}
                placeholder="Select Patient"
                className="w-full p-2 rounded border border-gray-300"
              >
                <option value="" disabled>
                  Select Patient
                </option>
                {doctors.map((patient) => (
                  <option key={patient.patientID} value={patient.patientID}>
                    {patient.name}{" "}
                    {/* Corrected to use the correct property name */}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700">
                Bill Amount
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="flex justify-between pt-5">
              <button
                type="submit"
                onClick={handleBill}
                className="bg-[#7e97a6] text-white rounded-full px-4 py-2"
              >
                Send Bill
              </button>
            </div>
          </form>
        </div>

        {/* Merged First and Second Columns */}
        <div className="col-span-2 text-center mx-1.5 ">
          <h2 className="text-2xl font-bold mb-8">Your Bills</h2>
          <table className="table-auto w-full">
            <thead>
              <tr className="">
                <th className="py-2 px-4">Billing ID</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Payment Method</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {previousBills.map((appointment, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{appointment.billingID}</td>
                  <td className="py-2 px-4">Rs. {appointment.amount}</td>
                  <td className="py-2 px-4">{appointment.paymentmethod}</td>
                  <td className="py-2 px-4">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DocBill;
