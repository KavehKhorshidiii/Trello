import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB/connectDB";
import ColumnModel from "../../../../Models/columnModel/columnModel";

export async function PATCH(req){
   
   await connectDB()

   const updateColumn = await req.json()

   const operations = updateColumn.map((x) => ({
      updateOne:{
         filter: {_id: x._id},
         update: {order: x.order}
      }
   }))


   const result = await ColumnModel.bulkWrite(operations)

   return NextResponse.json("good")
   
}