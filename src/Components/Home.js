import React, { useEffect, useState } from "react";
import NavHome from "./NavHome";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../Assets/Lottie-doctor3.json";

function Home() {
  const location = useLocation();
  const [name, setName] = useState("Update Account");
  const [email, setEmail] = useState("Update Account");
  const [patientID, setPatientID] = useState("");
  const [age, setAge] = useState("Update Account");
  const [sex, setSex] = useState("Update Account");
  const [height, setHeight] = useState("Update Account");
  const [weight, setWeight] = useState("Update Account");
  const [contact, setContact] = useState("Update Account");
  const [address, setAddress] = useState("Update Account");

  useEffect(() => {
    // Extract the patientID from the location state
    setEmail(location.state?.email || "");
    setPatientID(email);

    // Make a POST request to the backend /home route to get the patient details
    axios
      .post("http://localhost:8000/patientdetails", { patientID })
      .then((res) => {
        setName(res.data.name || "Update Account");
        setAge(res.data.age || "Update Account");
        setSex(res.data.sex || "Update Account");
        setHeight(res.data.height || "Update Account");
        setWeight(res.data.weight || "Update Account");
        setContact(res.data.contact || "Update Account");
        setAddress(res.data.address || "Update Account");
      })
      .catch((err) => {
        console.error("Error fetching patient details:", err);
      });
  }, [location.state, patientID, email]);

  return (
    <div>
      <NavHome patientID={patientID} />
      <div className="bg-slate-200 grid grid-rows-1 grid-cols-3 gap-4 h-screen font-serif text-[#7e97a6] text-xl">
        {/* Merged First and Second Columns */}
        <div className="col-span-1 flex items-center justify-center pl-10">
          <table className="table-auto w-full">
            <tbody>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Name:</td>
                <td className="py-2">{name}</td>
              </tr>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Patient ID:</td>
                <td className="py-2">{patientID}</td>
              </tr>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Age:</td>
                <td className="py-2">{age}</td>
              </tr>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Sex:</td>
                <td className="py-2">{sex}</td>
              </tr>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Height:</td>
                <td className="py-2">{height}</td>
              </tr>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Weight:</td>
                <td className="py-2">{weight}</td>
              </tr>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Contact:</td>
                <td className="py-2">{contact}</td>
              </tr>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Address:</td>
                <td className="py-2">{address}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Third Column */}
        <div className="col-span-2 flex items-center justify-center pr-10">
          {/* <p className="text-4xl font-bold">Meditrack</p> */}
          <Lottie
            animationData={animationData}
            style={{ height: "450px", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
