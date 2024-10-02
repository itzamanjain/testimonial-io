import { connectDb } from '../../../../dbconfig/dbConfig.js';
import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../../models/testimonial.model.js'; 
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });




connectDb();




// Upload image to Cloudinary with circular transformation
const uploadAvatar = (buffer: Buffer) => {
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


// In-memory store for tracking requests
const rateLimitStore = new Map();
const RATE_LIMIT_TIME_FRAME = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 13; // Max 3 requests per IP per time frame

function rateLimit(request:NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || request.ip ;
    console.log('IP:', ip);
    
    const now = Date.now();

    if (!rateLimitStore.has(ip)) {
        rateLimitStore.set(ip, { count: 1, lastRequest: now });
    } else {
        const rateLimitData = rateLimitStore.get(ip);
        if (now - rateLimitData.lastRequest > RATE_LIMIT_TIME_FRAME) {
            // Reset the rate limit for the IP if the time frame has passed
            rateLimitStore.set(ip, { count: 1, lastRequest: now });
        } else {
            // Increment the request count for the IP
            rateLimitData.count++;
            rateLimitData.lastRequest = now;

            if (rateLimitData.count > RATE_LIMIT_MAX_REQUESTS) {
                return false; // Rate limit exceeded
            }
        }
    }

    return true; // Within the rate limit
}

export async function POST(request: NextRequest) {
    try {
        // Apply rate limiting
        if (!rateLimit(request)) {
            return NextResponse.json({
                message: 'Too many requests. Please try again later.',
                success: false
            }, { status: 429 });
        }

        

        const data = await request.formData();
        console.log(data);
        
        if(!data){
            return NextResponse.json({message:'Please provide required field '},{status:400});

        }

        const avatar = data.get('avatar') as File;
        const customerName = data.get('customerName');
        const customerPosition = data.get('customerPosition');
        const customerCompany = data.get('customerCompany');
        const customerSocialId = data.get('customerSocialId');
        const customerReview = data.get('customerReview');
        const testimonialGivenTo = data.get('testimonialGivenTo');
        const rating = data.get('rating');


        if (!customerName || !rating || !customerPosition || !customerCompany || !customerSocialId || !customerReview || !testimonialGivenTo) {
                 return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
         }

         
         
        const buffer = Buffer.from(await avatar.arrayBuffer());

        const avatarUrl = await uploadAvatar(buffer);
        console.log("uploaded avatar url ",avatarUrl);
        

        // Create a new testimonial
        const newTestimonial = new Testimonial({
            customerName,
            customerPosition,
            customerCompany,
            customerSocialId,
            customerReview,
            testimonialGivenTo,
            avatarUrl,
            rating
        });

        // Save the testimonial
        const savedTestimonial = await newTestimonial.save();

        console.log('Testimonial created:', savedTestimonial);

        return NextResponse.json({
            message: 'Testimonial created successfully',
            success: true,
            savedTestimonial
        });

    } catch (error) {
        return NextResponse.json({
            message: 'Testimonial creation failed',
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
