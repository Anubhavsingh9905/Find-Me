import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const SignUp = () => {
  let {isLoggedIn, setIsLoggedIn} = useAuth();

  const [UserName, setUserName] = useState('');
  const [password, setpassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signing up with:', { UserName, phoneNumber, emailId });

    const username = UserName;
    try{
      let response = await axios.post("http://localhost:4000/email/register", {username, emailId, password, otp, phoneNumber}, {withCredentials: true});
      
      const data = await response.data; // message
      console.log(data);
      setIsLoggedIn(true);
      navigate("/dashboard");

    }catch(err){
      if(err.response && err.response.data && err.response.data.message){
        alert(err.response.data.message);
        console.log(err.response.data.message);
      }
      else{
        alert(err.message);
        console.log(`Error: ${err.message}`);
      }
    }
  };
  
  const sendOtp = (e) => {
    e.preventDefault();
    if (!emailId) {
      alert("Please enter an Email ID before sending OTP."); 
      return;
    }
    axios.post("http://localhost:4000/email/sendOtp", {emailId}).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">User Name</label>
            <input
              type="text"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter User Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email ID</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter Email ID"
              className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              onClick={sendOtp}
              className="bg-blue-400 text-white py-2 p-3 m-4 rounded-md hover:bg-blue-500 transition-colors"
            >
              Send OTP
            </button>
            {/* otp is print on console */}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
