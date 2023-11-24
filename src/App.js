import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import LandingPage from "./Components/LandingPage";
import Temp from "./Components/Temp";
import BookAppointment from "./Components/BookAppointment";
import Account from "./Components/Account";
import DocHome from "./Components/DocHome";
import CheckAppointment from "./Components/CheckAppointment";
import DocAccount from "./Components/DocAccount";
import DocBill from "./Components/DocBill";
import PatientBills from "./Components/PatientBills";
import FeedBack from "./Components/FeedBack";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="/bookAppointment" element={<BookAppointment/>} />
        <Route path="/account" element={<Account />} />
        <Route path="/dochome" element={<DocHome />} />
        <Route path="/checkAppointment" element={<CheckAppointment />} />
        <Route path="/docaccount" element={<DocAccount />} />
        <Route path="/docbill" element={<DocBill />} />
        <Route path="/patientbill" element={<PatientBills />} />
        <Route path="/feedback" element={<FeedBack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
