import React,{useEffect, useState} from 'react';
import LogOut from './LogOut';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const HomeNav = () => {
  const {isLoggedIn} = useAuth();
  
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-2">
          <div className="text-blue-600 text-2xl font-bold">📍</div>
          <span className="text-blue-600 font-bold text-xl">FindMe</span>
        </div>

        <ul className="flex space-x-6 text-gray-700 font-medium">
          {isLoggedIn ? (
            <li>
              <a href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</a>
            </li>
          ): (
            null
          )}

          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">AboutUs</a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600 transition-colors">ContactUs</a>
          </li>
          {!isLoggedIn ? (
            <li>
              <a href="/login" className="hover:text-blue-600 transition-colors"> Login </a>
            </li>
          ) : (
            <LogOut/>
          )}
        </ul>

      </div>
    </nav>
  );
};

export default HomeNav;

