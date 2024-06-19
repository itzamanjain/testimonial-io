import { connectDb } from "../../../../dbconfig/dbConfig.js";
import User from "../../../../models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helper/getDataFromToken";
import Testimonial from "../../../../models/testimonial.model.js";

connectDb();

export async function GET(request:NextRequest) {
  try {
    // Extract data from token
    const userId = await getDataFromToken(request);
    //const userId = "66713d188ec5def1a1861bfc"
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // find all the testimonial where the testimonialGivenTo is the user id

    const testimonials = await Testimonial.find({ testimonialGivenTo: userId });

    if (!testimonials) {
      return NextResponse.json({ message: "No testimonials found" }, { status: 404 });
    }

    user.testimonials = testimonials;

    return NextResponse.json({ user, testimonials, success: true, message: "User profile retrieved successfully"}, { status: 200});

    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
