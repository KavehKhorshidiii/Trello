import { NextResponse } from 'next/server'
import ColumnModel from '../../../../models/columnModel/columnModel'
import connectDB from '../../../../lib/connectDB/connectDB'
import CardModel from '../../../../models/cardModel/cardModel'

// Columns
export async function GET(req, { params }) {

   const boardID = await params
   
   await connectDB()

   const columns = await ColumnModel.find({board:boardID.id}).sort({order:1})

   return NextResponse.json(columns)

}

// Delete Columns
export async function DELETE(req , {params}){

   const { id } = await params;
   
   try{
      await connectDB()
      await CardModel.deleteMany({column:id})
      await ColumnModel.findByIdAndDelete(id)
      return NextResponse.json({ success: true })
   }catch{
      return NextResponse.json({ success: false })
   }

}