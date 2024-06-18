import { connectDb } from '../../../../dbconfig/dbConfig.js';
import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../../models/Testimonial'; // Ensure this is the correct path to your model

connectDb();

// Logic to create a testimonial goes here
export async function POST(request) {
    try {
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
