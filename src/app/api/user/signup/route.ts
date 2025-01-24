import { connectDb } from '../../../../dbconfig/dbConfig.js';
import User from '../../../../models/user.model.js';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { uploadAvatar } from '../../../../lib/cloudinary.js';




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });


connectDb();




// Upload image to Cloudinary with circular transformation
// const uploadAvatar = (buffer: Buffer) => {
//     return new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream({
//         transformation: [
//           { width: 400, height: 400, crop: 'thumb', gravity: 'face' }, // crop to a square centered on the face
//           { radius: 'max' }, // apply maximum corner rounding to make it circular
//         ],
//       }, (error, result) => {
//         if (result) {
//           resolve(result.secure_url);
//         } else {
//           reject(error);
//         }
//       });
  
//       streamifier.createReadStream(buffer).pipe(uploadStream);
//     });
//   };



export async function POST(request: NextRequest) {
    try {
        // const reqBody = await request.json();
        // const { username,email, fullname, password } = reqBody;

        const data = await request.formData();

        const username = data.get('username');
        const email = data.get('email');
        const fullname = data.get('fullname');
        const password = data.get('password');
        const avatar = data.get('avatar') as File;

        if (!username || !email || !fullname || !password || !avatar) {
            return NextResponse.json({ message: 'Please fill in all fields' }, { status: 400 });
        }

        const user = await User.findOne({ email });



        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });

        }
        
        const buffer = Buffer.from(await avatar.arrayBuffer());

        // const avatarUrl = await uploadAvatar(buffer);
        const avatarUrl = await uploadAvatar(buffer);
        console.log("uploaded avatar url ",avatarUrl);
        



        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const newUser = new User({ username, password: hashedPassword,email, fullname, avatarUrl });

        const savedUser = await newUser.save();


        console.log('User created:', savedUser);

        // Send verification email (not implemented)

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser
        });

        


    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}