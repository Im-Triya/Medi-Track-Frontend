import React , { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavHome() {

  const [email, setEmail] = useState("");
  const [doctorID, setDoctorID] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckAppointmentClick = () => {
    // Navigate to Book Appointment with email as state
    navigate('/checkAppointment', { state: { doctorID } });
  };

  const handleDocAccount = () => {
    // Navigate to Account with email as state
    navigate('/docaccount', { state: { doctorID } });
  };

  const handleBill = () => {
    // Navigate to Account with email as state
    navigate('/docbill', { state: { doctorID } });
  };

  useEffect(() => {
    // Extract the email from the location state
    setEmail(location.state?.email || "");
    setDoctorID(email);
  
  }, [location.state, email, doctorID]);
  

  return (
    <nav className="bg-[#7e97a6] p-4 font-serif">
      <div className="container mx-auto flex justify-between items-center">
        <div
          role="button"
          onClick={() => navigate('/dochome')}
          className="text-white text-xl font-bold cursor-pointer"
        >
          Medi-Track
        </div>

        <div className="flex space-x-4">
          {/* Use the handleBookAppointmentClick function */}
          <div
            role="button"
            onClick={handleCheckAppointmentClick}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            Check Appointment
          </div>

          <div
            role="button"
            onClick={handleDocAccount}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            Account
          </div>

          <div
            role="button"
            onClick={handleBill}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            Bill
          </div>

          <div
            role="button"
            onClick={() => navigate('/')}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            Sign Out
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavHome;
