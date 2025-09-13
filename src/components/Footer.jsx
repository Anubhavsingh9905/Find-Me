import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Contact Us */}
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8-4H8m8 8H8m2 4h4m1-20H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2z" />
              </svg>
              <span>info@findme-platform.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18" />
              </svg>
              <span>+1 (800) 555-0123</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h5" />
              </svg>
              <span>123 Tech Avenue, San Francisco, CA 94107</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-600">Support</a></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h4 className="font-bold mb-4">Connect With Us</h4>
          <p className="text-sm text-gray-500 mb-4">
            Follow us on social media for updates and success stories
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 rounded-full bg-white shadow hover:bg-blue-50">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="h-6 w-6"/>
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:bg-blue-50">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="X" className="h-6 w-6"/>
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:bg-blue-50">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="h-6 w-6"/>
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:bg-blue-50">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-6 w-6"/>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-200">
        © 2025 FindMe Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
