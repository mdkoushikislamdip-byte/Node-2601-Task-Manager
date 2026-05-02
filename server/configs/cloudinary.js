const cloudinary = require('cloudinary').v2

const cloudinaryConfig = () =>{

  cloudinary.config({ 
    cloud_name: process.env.my_cloud_name, 
    api_key: process.env.my_key, 
    api_secret: process.env.my_secret,
  });
}

module.exports = cloudinaryConfig;

