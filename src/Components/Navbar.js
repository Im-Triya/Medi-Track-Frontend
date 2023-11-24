import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#7e97a6] p-4 font-serif">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Medi-Track</Link>
        
        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
