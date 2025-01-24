import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });


  // Upload image to Cloudinary with circular transformation
 export  const uploadAvatar = (buffer: Buffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
          transformation: [
            { width: 400, height: 400, crop: 'thumb', gravity: 'face' }, // crop to a square centered on the face
            { radius: 'max' }, // apply maximum corner rounding to make it circular
          ],
        }, (error, result) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        });
    
        streamifier.createReadStream(buffer).pipe(uploadStream);
      });
    };
  