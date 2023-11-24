import React , { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavHome() {

  const [email, setEmail] = useState("");
  const [patientID, setPatientID] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleBookAppointmentClick = () => {
    // Navigate to Book Appointment with email as state
    navigate('/bookAppointment', { state: { patientID } });
  };

  const handleAccount = () => {
    // Navigate to Account with email as state
    navigate('/account', { state: { patientID } });
  };

  const handleBill = () => {
    // Navigate to Account with email as state
    navigate('/patientbill', { state: { patientID } });
  };

  const handleFeedBack = () => {
    // Navigate to Account with email as state
    navigate('/feedback', { state: { patientID } });
  };

  useEffect(() => {
    // Extract the email from the location state
    setEmail(location.state?.email || "");
    setPatientID(email);
  
  }, [location.state, email, patientID]);
  

  return (
    <nav className="bg-[#7e97a6] p-4 font-serif">
      <div className="container mx-auto flex justify-between items-center">
        <div
          role="button"
          onClick={() => navigate('/home')}
          className="text-white text-xl font-bold cursor-pointer"
        >
          Medi-Track
        </div>

        <div className="flex space-x-4">
          {/* Use the handleBookAppointmentClick function */}
          <div
            role="button"
            onClick={handleBookAppointmentClick}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            Book Appointment
          </div>
          <div
            role="button"
            onClick={handleAccount}
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
            onClick={handleFeedBack}
            className="text-white hover:text-gray-300 cursor-pointer"
          >
            FeedBack
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
