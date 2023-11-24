import React, { useEffect, useState } from "react";
import DocNav from "./DocNav";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../Assets/Lottie-doctor7.json";

function DocHome() {
  const location = useLocation();
  const [name, setName] = useState("Update Account");
  const [email, setEmail] = useState("Update Account");
  const [doctorID, setDoctorID] = useState("");
  const [age, setAge] = useState("Update Account");
  const [sex, setSex] = useState("Update Account");
  const [specialization, setSpecialization] = useState("Update Account");
  const [department, setDepartment] = useState("Update Account");
  

  useEffect(() => {
    // Extract the doctorIDID from the location state
    setEmail(location.state?.email || "");
    setDoctorID(email);

    // Make a POST request to the backend /home route to get the patient details
    axios
      .post("http://localhost:8000/doctordetails", { doctorID })
      .then((res) => {
        setName(res.data.name || "Update Account");
        setAge(res.data.age || "Update Account");
        setSex(res.data.sex || "Update Account");
        setSpecialization(res.data.specialization || "Update Account");
        setDepartment(res.data.department || "Update Account");
      })
      .catch((err) => {
        console.error("Error fetching patient details:", err);
      });
  }, [location.state, doctorID, email]);

  return (
    <div>
      <DocNav doctorIDID={doctorID} />
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
                <td className="font-bold pr-4 py-2">Doctor ID:</td>
                <td className="py-2">{doctorID}</td>
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
                <td className="font-bold pr-4 py-2">Specialization:</td>
                <td className="py-2">{specialization}</td>
              </tr>
              <tr className="border-b ">
                <td className="font-bold pr-4 py-2">Department:</td>
                <td className="py-2">{department}</td>
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

export default DocHome;
