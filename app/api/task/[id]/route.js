import { NextResponse } from "next/server";
import { verifyJwtToken } from "../../../../lib/Auth/auth";
import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB/connectDB";
import cardModel from "../../../../Models/cardModel/cardModel"

// task card data
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

      const Tasks = await cardModel.find({ board: boardID?.id }).select("-__v").sort({ order: 1 })

      return NextResponse.json({ success: true, data: { Tasks } })

   } catch {

      return NextResponse.json({ success: false, data: null })

   }

}

// delete task card 
export async function DELETE(req, { params }) {

   const { id } = await params;

   try {
      await connectDB()
      const deleteTaskCard = await cardModel.findByIdAndDelete(id)
      return NextResponse.json({
         success: true,
         message: "Card deleted successfully",
      });
   } catch {
      return NextResponse.json({
         success: true,
         message: "",
      });
   }


}


