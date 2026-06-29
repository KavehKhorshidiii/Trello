import { NextResponse } from 'next/server'
import ColumnModel from '../../../../Models/columnModel/columnModel'
import connectDB from '../../../../lib/connectDB/connectDB'

export async function GET(req, { params }) {

   const boardID = await params
   
   await connectDB()

   const columns = await ColumnModel.find({board:boardID.id})

   return NextResponse.json(columns)

}