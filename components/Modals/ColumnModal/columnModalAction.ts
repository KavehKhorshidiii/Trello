'use server'

import connectDB from "@/lib/connectDB/connectDB"
import { cookies } from "next/headers"
import { verifyJwtToken } from "@/lib/auth"
import CardModel from "@/Models/cardModel/cardModel"
import { useQueryClient } from "@tanstack/react-query";
import  ColumnModel  from "@/Models/columnModel/columnModel"



type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}


export default async function columnModelAction(prevState: stateType, formData: FormData): Promise<stateType> {

   const { title , boardId} = {
      title: formData.get("title"),
      boardId : formData.get("boardId")
   }

   const cookiesStore = await cookies()
   const tokenValue = cookiesStore.get("token")?.value
   if (!tokenValue) { return { success: false, errors: {}, message: "Token does not exist." } }
  
   await connectDB() 

   const lastColumn = await ColumnModel.find({board:boardId}).sort({order: -1})
   const OrderNumber = lastColumn[0] ? lastColumn[0]?.order + 1 : 0

   const createCard = await ColumnModel.create({
      title,
      board: boardId,
      order: OrderNumber
   })

   return { success: true, errors: {}, message: "successfully" }
   
}
