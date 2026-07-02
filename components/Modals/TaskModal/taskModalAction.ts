'use server'

import connectDB from "@/lib/connectDB/connectDB"
import { cookies } from "next/headers"
import { verifyJwtToken } from "@/lib/Auth/auth"
import CardModel from "@/Models/cardModel/cardModel"
import { useQueryClient } from "@tanstack/react-query";


type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}


export default async function boardModalAction(prevState: stateType, formData: FormData): Promise<stateType> {

   const { title, des, color, columnId, boardId } = {
      title: formData.get("title"),
      des: formData.get("des"),
      color: formData.get("color"),
      columnId: formData.get("columnId"),
      boardId: formData.get("boardId"),
   }

   console.log(title, des, color, columnId, boardId)

   const cookiesStore = await cookies()
   const tokenValue = cookiesStore.get("token")?.value
   if (!tokenValue) { return { success: false, errors: {}, message: "Token does not exist." } }

   await connectDB()


   const lastTask = await CardModel.find().sort({ order: -1 })
   const OrderNumber = lastTask[0] ? lastTask[0]?.order + 1 : 0


   const createCard = await CardModel.create({
      title,
      des,
      color,
      column: columnId,
      board: boardId,
      order: OrderNumber
   })

   return { success: true, errors: {}, message: "successfully" }

}
