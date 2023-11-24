import React from "react";
import Navbar from "./Navbar";
import Lottie from "lottie-react";
import animationData from "../Assets/Lottie-doctor2.json";

function LandingPage() {
  return (
    <div className="bg-slate-200 min-h-screen">
      <Navbar />
      <div className="min-h-screen grid grid-rows-1 grid-cols-3 ">
        {/* Merged First and Second Columns */}
        <div className="col-span-2 flex justify-center">
          {/* Adjust the height (h-40) and width (w-full) as needed */}
          <Lottie
            animationData={animationData}
            style={{ height: "500px", width: "100%" }}
          />
        </div>
        {/* Third Column */}
        <div className="col-span-1 flex flex-col items-center justify-center mr-9">
          <h1 className="text-7xl text-[#7e97a6] font-serif mb-4">Medi-Track</h1>
          <p className="font-cursive text-[#323f47] text-center">
            Welcome to Medi-Track, your comprehensive healthcare companion. Our
            mission is to streamline and enhance your healthcare experience,
            providing you with personalized and efficient solutions. Explore
            cutting-edge technologies and innovative approaches to wellness with
            our intuitive platform. From insightful health analytics to seamless
            appointment scheduling, Medi-Track empowers you to take control of
            your well-being. Join us on this journey towards a healthier and
            happier you. Your health, your way – Medi-Track is here for every
            step of your wellness adventure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
