import {connectDb} from '../../../../dbconfig/dbConfig.js'
import { NextRequest,NextResponse} from 'next/server'


connectDb()

export async  function GET(request,response){

    try {
      const response =  NextResponse.json({message:'Logout successful',success:true}) 

      response.cookies.set("token","",{
        httpOnly:true,
        expires: new Date(0)
    })

    return response

    } catch (error) {
        return NextResponse.json(error.message, {status: 500})
    }
}