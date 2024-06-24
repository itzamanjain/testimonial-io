import { NextRequest, NextResponse } from 'next/server';
import Testimonial from '../../../../models/testimonial.model'; // Ensure this is the correct path to your model
import { getDataFromToken } from '../../../../helper/getDataFromToken';

export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({
                message: 'User ID not found',
                success: false
            }, { status: 404 });
        }

        const generatedUrl = `http://localhost:3000/testimonials?testimonialGivenTo=${userId}`;

        return NextResponse.json({
            message: 'URL generated successfully',
            success: true,
            generatedUrl
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: 'URL generation failed',
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
