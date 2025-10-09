import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UploadPhoto = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  let {user, isLoading, refreshAuth} = useAuth();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!user) return;  // wait for user to load

    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`https://find-me-v4yl.onrender.com/photo/${user._id}`, { withCredentials: true });
        console.log("Photo:", response.data.info.photo.url);
        setPhotoUrl(response.data.info.photo.url);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPhoto();
  }, [user]);  // run only when user is ready


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

  let handleUpload = async() => {
    setLoading(true);
    const fromdata = new FormData();
    fromdata.append("photo", selectedFile);

    try{
      await axios.post(`https://find-me-v4yl.onrender.com/photo/upload/${user._id}`, fromdata, { headers: { "Content-Type": "multipart/form-data" } })
      
      await refreshAuth();
      setLoading(false);
      console.log(res);
    }
    catch(err){
      if(err && err.response.data && err.response.data.message){
        alert(`Error --> ${err.message}`);
        console.log({"Error": err.message});
      }
      setLoading(false);
      console.log({message : err});
    }
  }

  let handleDelete = async() => {
    setLoading(true);

    try{
      await axios.post(`https://find-me-v4yl.onrender.com/photo/delete/${user._id}`)
      await refreshAuth();
      setPhotoUrl(null);
      setLoading(false);
      console.log(res);
    }
    catch(err){
      if(err && err.response.data && err.response.data.message){
        alert(`Error --> ${err.message}`);
        console.log({"Error": err.message});
      }
      console.log({message : err});
      setLoading(false);
    }
  }

  if(loading){
    return(
      <div role="status" className='container mx-auto p-6 bg-white rounded-lg shadow-md mt-10 text-center'>
        <svg aria-hidden="true" className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
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

      {!photoUrl && activeTab === 'upload' && (
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

          {!photoUrl && <button
            onClick={() => document.getElementById('fileInput').click()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Browse Files
          </button>}

          {!photoUrl && selectedFile && <button
            onClick={handleUpload}
            className="bg-blue-600 text-white ml-5 px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Upload Photo
          </button>}

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

      {photoUrl && <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div>
          <img class="h-auto max-w-lg rounded-lg mx-auto" src={photoUrl} alt='userPhoto'></img>
          <h3>User Photo</h3>
        </div>

        <button
          onClick={handleDelete}
          className="bg-blue-600 text-white ml-5 px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Delete Photo
        </button>
      </div>}

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
