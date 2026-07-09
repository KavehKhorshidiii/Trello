import { NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB/connectDB'
import BoardModel from '@/models/boardModel/boardModel'


export async function GET(req, { params }) {

   const theParams = await params

   await connectDB()

   const boardData = await BoardModel.find({ _id: theParams.id })

   return NextResponse.json({ boardData })

}

