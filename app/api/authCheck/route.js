import { NextResponse } from "next/server";
import userModel from '../../../Models/usersmodel/usersmodel'
import connectDB from '../../../lib/connectDB/connectDB'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { verifyJwtToken } from "../../../lib/auth";


export async function GET() {

   try {

      const cookiesStore = await cookies()


      // Token
      const tokenValue = cookiesStore.get("token")?.value
      if (!tokenValue) {return NextResponse.json({ success: false, data: null })}


      // verify Token
      const verifyToken = verifyJwtToken(tokenValue)
      if (!verifyToken) {return NextResponse.json({ success: false, data: null })}


      await connectDB()


      // find User Data
      const findUser = await userModel.findById(verifyToken.id).select("-password -__v -createdAt -updatedAt")

      if (!findUser || findUser === null) {return NextResponse.json({ success: false, data: null }, { status: 404 })}

      return NextResponse.json({ success: true, data: findUser })

   } catch {

      return NextResponse.json({ success: false, data: null }, { status: 500 })

   }

}

// sign out
export async function POST() {
   const res = NextResponse.json({ success: true })

   res.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
      path: '/'
   })

   return res
}