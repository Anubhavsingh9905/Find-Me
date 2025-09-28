import React, {useEffect}from 'react';
import LogOut from './LogOut';

const Navbar = () => {
  
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <div className="text-blue-600 text-2xl font-bold">📍</div>
          <span className="text-blue-600 font-bold text-xl">FindMe</span>
        </div>

        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">Register Missing Person</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">Report Sighting</a>
          </li>
          <LogOut/>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;

