import { connectDb } from '../../../../dbconfig/dbConfig.js';
import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../../models/testimonial.model.js'; // Ensure this is the correct path to your model

connectDb();


// test data
//{
//     "customerName": "John Doe",
//     "customerPosition": "CEO",
//     "customerCompany": "ACME Inc.",
//     "customerSocialId": "john.doe@example.com",
//     "customerReview": "John is an excellent leader and a pleasure to work with.",
//     "testimonialGivenTo": "66713d188ec5def1a1861bfc"  // Or use the MongoDB _id if preferred
// }



// Logic to create a testimonial goes here
export async function POST(request:NextRequest) {
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
