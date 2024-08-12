import { connectDb } from "../../../../dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user.model";

connectDb();

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching all users...');
    
    const users = await User.find({}, 'username fullname email');
    console.log('Users fetched:', users);
    

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