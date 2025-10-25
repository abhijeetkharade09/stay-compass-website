const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
<<<<<<< HEAD
    folder: 'wanderlust_DEV',
=======
    folder: 'StayCompass_Gallery',
>>>>>>> 7c996f7 (changes done)
    allowedFormat: ["png","jpg","jpeg"]
  },
});

module.exports = {
    cloudinary,
    storage,
}