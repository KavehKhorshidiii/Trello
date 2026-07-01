import { NextResponse } from "next/server";
import userModel from '../../../Models/usersmodel/usersmodel'
import connectDB from '../../../lib/connectDB/connectDB'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { verifyJwtToken } from "../../../lib/auth";




export async function GET() {
   
   try {
      
      const cookiesStore = await cookies()
      const tokenValue = cookiesStore.get("token")?.value
      
      if (!tokenValue) {
         return NextResponse.json({ success: false, data: null })
      }

      
      let verifyToken
      try {
         // verify Token
         verifyToken = verifyJwtToken(tokenValue) // { id: '6a3a95f86aaf18c5e8506edc', iat: 1782294556, exp: 1782312556 }

         if (!verifyToken) {
            return NextResponse.json({ success: false, data: null })
         }

      } catch {
         return NextResponse.json({ success: false, data: null })
      }

      await connectDB()

      const findUser = await userModel.findById(verifyToken.id).select("-password -__v -createdAt -updatedAt")

      if (!findUser || findUser === null) {
         return NextResponse.json({ success: false, data: null }, { status: 404 })
      }

      return NextResponse.json({ success: true, data: findUser })

   } catch {
      return NextResponse.json({ success: false, data: null }, { status: 500 })
   }

}