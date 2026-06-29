'use server'

import connectDB from "@/lib/connectDB/connectDB"
import { cookies } from "next/headers"
import { verifyJwtToken } from "@/lib/auth"
import CardModel from "@/Models/cardModel/cardModel"
import { useQueryClient } from "@tanstack/react-query";
import UsersModel from "@/Models/usersmodel/usersmodel"
import BoardModel from "@/Models/boardModel/boardModel"




type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}

export default async function changeColorNavbarAction(prevState: stateType, formData: FormData): Promise<stateType> {



   const { title, color, boardId } = {
      title: formData.get("title"),
      color: formData.get("color"),
      boardId: formData.get("boardId")
   }


   const cookiesStore = await cookies()
   const tokenValue = cookiesStore.get("token")?.value
   if (!tokenValue) { return { success: false, errors: {}, message: "Token does not exist." } }


   

   await connectDB()

   const updateBoard = await BoardModel.findByIdAndUpdate(
      boardId,
      { $set: { title, color } },
      { returnDocument:'after'}
   )

   if(updateBoard){
      return { success: true, errors: {}, message: "successfully" }
   }else{
      return { success: false, errors: {}, message: "not updated" }
   }




}
