import React, { useState } from 'react';

const ReportSighting = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', { description, location });
    alert('Report submitted successfully!');
    setDescription('');
    setLocation('');
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      
      <div className="grid md:grid-cols-2 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Report a Sighting</h2>
          <p className="text-gray-500 mb-6">
            If you believe you’ve seen someone who matches a missing person profile, please report it here
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded p-3 text-gray-700"
                rows="4"
                placeholder="Please provide details about the person you saw, including clothing, behavior, and any distinguishing features"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-3 text-gray-700"
                placeholder="Enter the location where you saw the person"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition-colors"
            >
              Submit Report
            </button>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-xl font-bold mb-4">Why Your Report Matters</h3>

          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Time is Critical</h4>
              <p className="text-gray-600 text-sm">The first 48 hours after someone goes missing are the most crucial for finding them safely.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5-6l3 3-3 3" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Every Detail Helps</h4>
              <p className="text-gray-600 text-sm">Even small details that might seem insignificant could be the key to finding someone.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.878 6.196 9 9 0 015.121 17.804z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold">Safe and Confidential</h4>
              <p className="text-gray-600 text-sm">Your report information is kept confidential and used only for finding missing persons.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportSighting;
