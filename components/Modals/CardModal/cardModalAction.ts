'use server'

import connectDB from "@/lib/connectDB/connectDB"
import { cookies } from "next/headers"
import { verifyJwtToken } from "@/lib/auth"
import CardModel from "@/Models/cardModel/cardModel"
import { useQueryClient } from "@tanstack/react-query";





type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}

export default async function boardModalAction(prevState: stateType, formData: FormData): Promise<stateType> {



   const { title, des, color , boardId} = {
      title: formData.get("title"),
      des: formData.get("des"),
      color: formData.get("color"),
      boardId : formData.get("boardId")
   }


   const cookiesStore = await cookies()
   const tokenValue = cookiesStore.get("token")?.value
   if (!tokenValue) { return { success: false, errors: {}, message: "Token does not exist." } }
  


   await connectDB()
   const createCard = await CardModel.create({
      title,
      des,
      color,
      board: boardId
   })



   return { success: true, errors: {}, message: "successfully" }
}
