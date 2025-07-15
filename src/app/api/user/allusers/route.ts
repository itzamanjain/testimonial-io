import { connectDb } from "../../../../dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user.model";

connectDb();

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching all users...');
    
    const fetchedusers = await User.find({}, 'username fullname email avatarUrl testimonials');
    // console.log('Users fetched:', users);

    // return users after 12 . means skip first 12 users
    // const skip = parseInt(request.nextUrl.searchParams.get("skip") || "0",

    const users = fetchedusers.slice(12);

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed to fetch users",
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}