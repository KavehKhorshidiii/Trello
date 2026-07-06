import { NextResponse } from 'next/server'
import ColumnModel from '../../../../Models/columnModel/columnModel'
import connectDB from '../../../../lib/connectDB/connectDB'

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
      const deleteCol = await ColumnModel.findByIdAndDelete(id)
      console.log(deleteCol)
      return NextResponse.json({ success: true })
   }catch{
      return NextResponse.json({ success: false })
   }

}