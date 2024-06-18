// delete route is for the user whom to testimonial is give they can delete tesimonal

import { connectDb } from '../../../../dbconfig/dbConfig.js';
import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../../models/testimonial.model.js'; // Ensure this is the correct path to your model

connectDb();

// Logic to delete a testimonial goes here

export async function DELETE(request) {
    // user whom testi is give they can delete so we will check userid in testimonial should match with current loged in user id 

    try {
        const reqBody = await request.json();

        const { testimonialId, userId } = reqBody;

        if (!testimonialId || !userId) {
            return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
        }

        const testimonial = await Testimonial.findById(testimonialId);

        if (!testimonial) {
            return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
        }

        if (testimonial.testimonialGivenTo.toString() !== userId) {
            return NextResponse.json({ message: "You are not authorized to delete this testimonial" }, { status: 401 });
        }

        // Delete the testimonial

        const deletedTestimonial = await Testimonial.findByIdAndDelete(testimonialId);

        console.log('Testimonial deleted:', deletedTestimonial);

        return NextResponse.json({
            message: 'Testimonial deleted successfully',
            success: true,
            deletedTestimonial
        });

    }
    catch (error) {
        return NextResponse.json({
            message: 'Testimonial deletion failed',
            success: false,
            error: error.message
        }, { status: 500 });
    }

}