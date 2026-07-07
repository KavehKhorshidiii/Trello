// imports
import { NextResponse } from "next/server";
import { verifyJwtToken } from "../../../lib/Auth/auth";
import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB/connectDB";
import BoardModel from "@/models/boardModel/boardModel";
import ColumnModel from '../../../models/columnModel/columnModel'
import CardModel from '../../../models/cardModel/cardModel'

// find boards
export async function GET() {
   try {
      const cookiesStore = await cookies()
      const tokenValue = cookiesStore.get("token")?.value
      const verifyToken = verifyJwtToken(tokenValue)

      if (!verifyToken) {return NextResponse.json({ success: false, data: null }, { status: 404 })}

      await connectDB()

      const boards = await BoardModel.find({ author: verifyToken.id }).select("-__v")
      return NextResponse.json({ success: true, data: { boards: boards } })
   } catch {
      return NextResponse.json({ success: false, data: { boards: null } })
   }
}

// delete board
export async function DELETE(req) {

   const { boardID } = await req.json()

   try {
      await connectDB()

      await ColumnModel.deleteMany({board:boardID})
      await CardModel.deleteMany({board:boardID})
      const res = await BoardModel.findByIdAndDelete(boardID);
      if(!res){return NextResponse.json({ success: true })}
      return NextResponse.json({ success: true })
   } catch {
      return NextResponse.json({ success: false })
   }

}


