import { connectDb } from '../../../../dbconfig/dbConfig.js';
import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../../models/testimonial.model.js'; 

connectDb();

// In-memory store for tracking requests
const rateLimitStore = new Map();
const RATE_LIMIT_TIME_FRAME = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per IP per time frame

function rateLimit(request) {
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

        const reqBody = await request.json();

        const { customerName, customerPosition, customerCompany, customerSocialId, customerReview, testimonialGivenTo } = reqBody;

        if (!customerName || !customerPosition || !customerCompany || !customerSocialId || !customerReview || !testimonialGivenTo) {
            return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
        }

        // Create a new testimonial
        const newTestimonial = new Testimonial({
            customerName,
            customerPosition,
            customerCompany,
            customerSocialId,
            customerReview,
            testimonialGivenTo
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
