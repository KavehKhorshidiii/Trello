import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB/connectDB";
import CardModel from "../../../../Models/cardModel/cardModel"

export async function PATCH(req){
   
   await connectDB()

   const updateTaskCard = await req.json()
   console.log(updateTaskCard)

   const operations = updateTaskCard.map((x) => ({
      updateOne:{
         filter: {_id: x._id},
         update: {order: x.order , column:x.column}
      }
   }))


   const result = await CardModel.bulkWrite(operations)

   return NextResponse.json("good")
   
}