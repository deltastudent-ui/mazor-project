const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const { param } = require("./routs/alllistings");
const { allow } = require("joi");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,                    // hume humesa yahi key use karni hai 
    api_key:process.env.CLOUDE_API_KEY,
    api_secret:process.env.CLOUDE_API_SECRET

});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowerdFormat: ["png", "jpg", "jpeg"],
    },
  });

module.exports = {
    cloudinary,
    storage,
}
// is file ko listing =.js k ander use karenge routes wale listings

