import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const Login = ({ login }) => {
  let {isLoggedIn, setIsLoggedIn} = useAuth();

  const [emailId, setEmailId] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { emailId, userName });
    // login();
    
    let username = userName;

    try{
      let response = await axios.post("http://localhost:4000/email/login", {username, emailId, password}, { withCredentials: true });

      let data = response.data;
      // console.log(data.message);
      
      localStorage.setItem("userId", data.message);
      setIsLoggedIn(true);      
      navigate("/dashboard");   
    }
    catch(err){
      if(err.response && err.response.data && err.response.data.message){
        alert(`Error : ${err.response.data.message}`);
        console.log(err.response.data.message);
      }
      else{
        alert(`Error: ${err.message}`);
        console.log(err.message);
      }
    }
    
  };

  const handleGoogleLogin = async() => {
    // Here you can implement Google auth logic or redirect
    try{
      window.location.href = "/v1/google";
    }
    catch(err){
      if(err.response && err.response.data && err.response.data.message){
        alert(`Error : ${err.response.data.message}`);
        console.log(err.response.data.message);
      }
      else{
        alert(`Error: ${err.message}`);
        console.log(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter User Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Email Id</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter Email Id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-4">or</p>
          <button
            onClick={() => handleGoogleLogin()}
            className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition-colors"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
              alt="Google logo"
              className="w-6 h-6 mr-3"
            />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
