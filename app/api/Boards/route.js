import { NextResponse } from "next/server";
import { verifyJwtToken } from "../../../lib/auth";
import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB/connectDB";
import BoardModel from "@/Models/boardModel/boardModel";


export async function GET() {

   try {

      const cookiesStore = await cookies()
      const tokenValue = cookiesStore.get("token")?.value
      const verifyToken = verifyJwtToken(tokenValue)
      
      if (!verifyToken) {
         return NextResponse.json({ success: false, data: null }, { status: 404 })
      }

      await connectDB()

      const boards = await BoardModel.find({ author: verifyToken.id }).select("-__v")

      return NextResponse.json({ success: true, data: { boards: boards } })

   } catch {

      return NextResponse.json({ success: false, data: { boards: null } })

   }

}


