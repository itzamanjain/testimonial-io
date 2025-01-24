import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helper/getDataFromToken";
import { connectDb } from "../../../../dbconfig/dbConfig";
import User from "../../../../models/user.model";
import { uploadAvatar } from "../../../../lib/cloudinary";

export async function PATCH(req: NextRequest) {
    try {
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse form data from request body
        const reqBody = await req.formData();

        const updates: { [key: string]: any } = {};

        // Check and assign fields for partial updates
        const avatar = reqBody.get('avatar') as File | null;
        if (avatar) {
            const buffer = Buffer.from(await avatar.arrayBuffer());
            const newUrl = await uploadAvatar(buffer);
            if (!newUrl) {
                return NextResponse.json({ error: "Error in uploading avatar" }, { status: 500 });
            }
            updates.avatarUrl = newUrl;
        }

        const name = reqBody.get('name');
        if (name) updates.name = name;

        const email = reqBody.get('email');
        if (email) updates.email = email;

        const username = reqBody.get('username');
        if (username) updates.username = username;

        // Connect to database
        await connectDb();

        // Perform update only if there are fields to update
        if (Object.keys(updates).length === 0) {
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        const profile = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!profile) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
