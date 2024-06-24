import { connectDb } from '../../../../dbconfig/dbConfig.js';
import User from '../../../../models/user.model.js';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


connectDb();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username,email, fullname, password } = reqBody;

        if (!username || !email || !fullname || !password) {
            return NextResponse.json({ message: 'Please fill in all fields' }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });

        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const newUser = new User({ username, password: hashedPassword,email, fullname});

        const savedUser = await newUser.save();


        console.log('User created:', savedUser);

        // Send verification email (not implemented)

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser
        });

        


    } catch (error) {
        return NextResponse.json(error.message, { status: 500 });
    }
}