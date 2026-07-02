import { NextResponse } from "next/server";
import userModel from '../../../Models/usersmodel/usersmodel'
import connectDB from '../../../lib/connectDB/connectDB'
import { cookies } from "next/headers";
import { verifyJwtToken } from "../../../lib/Auth/auth";



// User Exist  &  User Data 
export async function GET() {

   const cookiesStore = await cookies()

   const tokenValue = cookiesStore.get("token")?.value

   if (!tokenValue) {
      return NextResponse.json({ success: false, data: null }, { status: 401 })
   }

   const verifyToken = verifyJwtToken(tokenValue)
   if (!verifyToken) {
      return NextResponse.json({ success: false, data: null }, { status: 401 })
   }

   await connectDB()

   const findUser = await userModel.findById(verifyToken.id).select("-password -__v -createdAt -updatedAt")

   if (!findUser) {
      return NextResponse.json({ success: false, data: null }, { status: 404 })
   }

   return NextResponse.json({ success: true, data: findUser })

}

// sign out
export async function POST() {
   const res = NextResponse.json({ success: true })

   res.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
      expires: new Date(0),
      path: '/'
   })

   return res
}