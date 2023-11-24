import React, { useState, useEffect } from "react";
import axios from "axios";
import DocNav from "./DocNav";
import { useNavigate, useLocation } from "react-router-dom";

function PatientBills() {
  const [patientID, setPatientID] = useState("");
  const [previousBills, setPreviousBills] = useState([]);
  const [values, setValues] = useState({
    billingID: "",
    paymentmethod: "",
    date: "",
  });

  //middlewrare
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPatientID(location.state?.patientID || "");

    // Fetch previous appointments for the user from the backend
    axios
      .post("http://localhost:8000/paymentdetailsforpatient", {
        ...values,
        patientID,
      })
      .then((res) => {
        setPreviousBills(res.data);
      })
      .catch((err) => {
        console.error("Error fetching previous bills:", err);
      });
  }, [location.state?.patientID, patientID, values]);

  const handleInputChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentMethod = (e) => {
    e.preventDefault();
    // Add the patient ID to the appointment details
    axios
      .post("http://localhost:8000/billpaymentmethod", { ...values, patientID })
      .then((res) => {
        console.log(values);
        navigate("/login");
      })
      .catch((err) => console.log(err));

    console.log("Payment method updated successfully");
    // Clear the form after submission
    setValues({ billingID: "", paymentmethod: "", date: "" });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Add the patient ID to the appointment details
    axios
      .post("http://localhost:8000/billpayment", { ...values, patientID })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));

    console.log("Payment successful");
    // Clear the form after submission
    setValues({ billingID: "", paymentmethod: "", date: "" });
  };

  return (
    <div className="bg-slate-200 h-screen font-serif text-[#323f47]">
      <DocNav patientID={patientID} />
      <div className="grid grid-rows-1 grid-cols-3 gap-10 p-4 ">
        {/* Third Column */}
        <div className="col-span-1 bg-slate-100 p-4">
          <h2 className="text-2xl font-bold mb-4">Manage Bills</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="appointmentID" className="block text-gray-700">
                Billing ID:
              </label>
              <input
                type="integer"
                id="billingID"
                name="billingID"
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="paymentmethod" className="block text-gray-700">
                Payment Method:
              </label>
              <select
                id="paymentmethod"
                name="paymentmethod"
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-300"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Net Banking">Net Banking</option>
                <option value="UPI">UPI</option>
                {/* Add more options as needed */}
              </select>
            </div>

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

            <div className="flex justify-between pt-5">
              <button
                type="submit"
                onClick={handlePaymentMethod}
                className="bg-[#7e97a6] text-white rounded-full px-4 py-2"
              >
                Update Payment Method
              </button>

              <button
                type="submit"
                onClick={handlePayment}
                className="bg-[#7e97a6] text-white rounded-full px-4 py-2"
              >
                Pay
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

export default PatientBills;
