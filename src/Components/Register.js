import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Functions/RegisterValidation";
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [role, setRole] = useState(""); // Add state for role

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      //if there are no errors in filling the name, email, and password from the front end, then we insert the data into the database
      axios
        .post("http://localhost:8000/register", { ...values, role })
        .then((res) => {
          navigate("/login");
          console.log(res.data);
        })
        .catch((err) => console.log(err));

      //if role is patient then insert into patient

      if (role === "patient") {
        axios
          .post("http://localhost:8000/insertintopatient", { ...values, role })
          .then((res) => {
            console.log("Inserted into Patient");
          })
          .catch((err) => console.log(err));
      }
      
      //if role is doctor then insert into doctor
      else{
        axios
          .post("http://localhost:8000/insertintodoctor", { ...values, role })
          .then((res) => {
            console.log("Inserted into Patient");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#7e97a6]">
      {/* 1st Div: MEDI */}
      <div className="text-white text-8xl font-bold flex-1 flex flex-col items-center justify-center">
        <div>M</div>
        <div>E</div>
        <div>D</div>
        <div>I</div>
      </div>

      {/* 2nd Div: Registration Form */}
      <div className="bg-slate-200 p-6 rounded-xl flex-1">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label htmlFor="name" className="text-[#4d5f6a] mb-2">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full p-2 rounded"
              placeholder="Enter Name"
              onChange={handleInput}
            />
            {errors.name && (
              <span className="text-sm text-red-800">{errors.name}</span>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="text-[#4d5f6a] mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full p-2 rounded"
              placeholder="Enter e-mail"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-sm text-red-800">{errors.email}</span>
            )}
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="text-[#4d5f6a] mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              className="w-full p-2 rounded"
              placeholder="Enter password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-sm text-red-800">{errors.password}</span>
            )}
          </div>

          {/* Role Radio Buttons */}
          <div className="mb-4">
            <label className="text-[#4d5f6a] mb-2">Role:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={() => setRole("doctor")}
                  className="mr-2"
                />
                Doctor
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="patient"
                  checked={role === "patient"}
                  onChange={() => setRole("patient")}
                  className="mr-2"
                />
                Patient
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[#7e97a6] text-sm mb-4">
              You agree to our Terms and Conditions
            </p>
            <button
              type="submit"
              className="bg-[#7e97a6] text-white rounded-full px-4 py-1 mb-8 hover:bg-slate-700"
            >
              Sign-Up
            </button>
            <p className="text-[#7e97a6] text-sm mb-4">
              Already have an Account ?
            </p>
            <Link
              to="/login"
              className="bg-[#7e97a6] text-white rounded-full px-4 py-1 hover:bg-slate-700"
            >
              Sign-In
            </Link>
          </div>
        </form>
      </div>

      {/* 3rd Div: TRACK */}
      <div className="text-white text-8xl font-bold flex-1 flex flex-col items-center justify-center">
        <div>T</div>
        <div>R</div>
        <div>A</div>
        <div>C</div>
        <div>K</div>
      </div>
    </div>
  );
}

export default Register;
