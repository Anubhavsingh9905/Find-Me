import React, {useEffect, useState} from 'react';
import axios from "axios";

const CctvView = () => {
  let [cameraUrl, setCameraUrl] = useState("");
  useEffect(() => {
    try {
      let response = axios.get("http://localhost:4000/cctvView")
      console.log(response.data)
    } catch (error) {
      
    }
  })
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">CCTV Camera View</h2>

      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          className="w-full h-[80vh] aspect-video bg-gray-900"
          controls
        >
          <source src="http://192.168.43.1:8080/hls.m3u8" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          LIVE
        </div>
      </div>

      <div className="mt-4 text-center text-gray-600">
        Monitoring area: Main Entrance
      </div>
    </div>
  );
};

export default CctvView;
