import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Validation from "../Functions/LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      //if there are no errors in filling the name, email and password from the front end , then we navigate to home page
      axios
      .post("http://localhost:8000/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/");
          } else {
            alert("No Record Found");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#7e97a6]">
      <div className="bg-slate-200 p-6 rounded-xl">
        <form action="" onSubmit={handleSubmit}>
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
              type="text"
              className="w-full p-2 rounded"
              placeholder="Enter password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-sm text-red-800">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <p className="text-[#7e97a6] text-sm mb-4">
              You agree to our Terms and Conditions
            </p>
            <button
              type="submit"
              className="bg-[#7e97a6] text-white rounded-full px-4 py-1 mb-8"
            >
              Log-In
            </button>
            <p className="text-[#7e97a6] text-sm mb-4">
              Don't have an Account ?
            </p>
            <Link
              to="/register"
              className="bg-[#7e97a6] text-white rounded-full px-4 py-1"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
