import {connectDb} from '../../../../dbconfig/dbConfig.js'
import User from '../../../../models/user.model.js'
import { NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDb()

//login route
export async function POST(request,response) {
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody;

        if(!email || !password){
            return NextResponse.json({error:'Please fill all fields'},{status:400})
        }

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:'Invalid Username'},{status:400})
        }

        const validPassword = await bcryptjs.compare(password,user.password)


        if(!validPassword){
            return NextResponse.json({error:'Invalid Password'},{status:400})
        }

        //generea jwt token

        const tokenData = {
            id: user._id,
            username:user.username,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })


        const response =  NextResponse.json({message:'Login successful',success:true})

        response.cookies.set("token",token,{httpOnly:true})

        return response

    } catch (error) {
        console.log(error);
        return NextResponse.json(error.message, {status: 500})
    }
}