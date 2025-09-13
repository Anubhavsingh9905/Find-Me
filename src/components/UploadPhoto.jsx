import React, { useState, useRef, useEffect } from 'react';

const UploadPhoto = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (activeTab === 'camera' && navigator.mediaDevices && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((err) => {
          console.error("Error accessing webcam:", err);
        });
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [activeTab]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      
      <h2 className="text-2xl font-bold mb-2">Upload a Photo or Use Camera</h2>
      <p className="text-gray-500 mb-6">
        Our AI system will analyze the image and search for matches in our database
      </p>

      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`pb-2 ${activeTab === 'upload' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Photo
        </button>
        <button
          className={`pb-2 ${activeTab === 'camera' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('camera')}
        >
          Use Camera
        </button>
      </div>

      {activeTab === 'upload' && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0l-4 4m4-4v12" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">Drag and drop your photo here or click to browse</p>
          
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => document.getElementById('fileInput').click()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Browse Files
          </button>

          {selectedFile && (
            <div className="mt-4 text-gray-700">
              <p>Selected File: {selectedFile.name}</p>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-4">
            Supported formats: JPG, PNG, HEIC (Max size: 10MB)
          </p>
        </div>
      )}

      {activeTab === 'camera' && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <video ref={videoRef} className="mx-auto w-full h-auto rounded-md bg-black" />
          <p className="text-gray-500 mt-4">Webcam is active. Allow access to your camera.</p>
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;
