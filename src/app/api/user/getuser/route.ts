import { connectDb } from "../../../../dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user.model";
import Testimonial from "@/models/testimonial.model";

connectDb();

export async function GET(request: NextRequest) {
  try {


    // GET username from query parameters
    // find and return the user with the given username

    const username = request.nextUrl.searchParams.get("username");

    if (!username) {
      return NextResponse.json({
        message: "Username is required",
        success: false,
      }, { status: 400 });
    }

    const fetchedUser = await User.find({ username },"-__v -password -createdAt -updatedAt").lean();
    const userId = fetchedUser[0]?._id;

    const testimonials = await Testimonial.find({ testimonialGivenTo:userId }).lean();

    console.log(fetchedUser);
    

    return NextResponse.json({
      success: true,
      fetchedUser,
      testimonials,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed to fetch users",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}