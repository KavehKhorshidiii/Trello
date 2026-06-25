import { NextResponse } from "next/server";
import { verifyJwtToken } from "../../../../lib/auth";
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

      const cards = await cardModel.find({ board: boardID.card }).select("-__v")

      return NextResponse.json({ success: true, data: { cards: cards } })

   } catch {

      return NextResponse.json({ success: false, data: { cards: null } })

   }

}


