import { NextResponse } from "next/server";
import userModel from '../../../Models/usersmodel/usersmodel'
import connectDB from '../../../lib/connectDB/connectDB'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'




export async function GET(res) {

   try {
      const cookiesStore = await cookies()
      const tokenValue = cookiesStore.get("token")?.value

      if (!tokenValue) {
         return NextResponse.json({ success: false, data: null }, { status: 401 })
      }

      let verifyToken
      try {
         verifyToken = jwt.verify(tokenValue, process.env.SECRET_JWT)
      } catch (err) {
         return NextResponse.json({ success: false, data: null }, { status: 401 })
      }

      await connectDB()
      const findUser = await userModel.findById(verifyToken.id.id).select("-password -__v -createdAt -updatedAt")
      if (!findUser) {
         return NextResponse.json({ success: false, data: null }, { status: 404 })
      }

      return NextResponse.json({ success: true, data: findUser })

   }catch{

      return NextResponse.json({ success: false, data: null }, { status: 500 })

   }

}