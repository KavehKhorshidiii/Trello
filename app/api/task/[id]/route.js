import { NextResponse } from "next/server";
import { verifyJwtToken } from "../../../../lib/Auth/auth";
import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB/connectDB";
import cardModel from "../../../../Models/cardModel/cardModel"


export async function GET(req, { params }) {

   const boardID = await params

   try {

      const cookiesStore = await cookies()
      const tokenValue = cookiesStore.get("token")?.value
      const verifyToken = verifyJwtToken(tokenValue)

      if (!verifyToken) {
         return NextResponse.json({ success: false, data: null }, { status: 404 })
      }

      await connectDB()

      const Tasks = await cardModel.find({ board: boardID?.id }).select("-__v").sort({order:1})

      return NextResponse.json({ success: true, data: { Tasks } })

   } catch {

      return NextResponse.json({ success: false, data: null })

   }

}


