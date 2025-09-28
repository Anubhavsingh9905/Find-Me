if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'FindMe_Dev',
    allowed_formats: ["png", "jpg", "jpeg"], // supports promises as well
    public_id: (req, file) => `${req.params.userId}`,
  },
});

module.exports = {storage, cloudinary}; 