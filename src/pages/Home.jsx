import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white flex flex-col items-center justify-center px-4 text-center">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        AI-powered Facial Recognition <br /> to Find Missing Persons
      </h1>

      <p className="text-lg md:text-xl max-w-2xl mb-6">
        Helping reunite families and find lost individuals in large gatherings using advanced technology
      </p>

      <a
        href="/signup"
        className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md text-lg font-semibold shadow-md"
      >
        Register Now
      </a>
    </div>
  );
};

export default HomePage;

