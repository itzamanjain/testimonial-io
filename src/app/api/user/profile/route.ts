import { connectDb } from "../../../../dbconfig/dbConfig.js";
import User from "../../../../models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helper/getDataFromToken";

connectDb();

export async function GET(request:NextRequest) {
  try {
    // Extract data from token
    const userId = await getDataFromToken(request);
    
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
