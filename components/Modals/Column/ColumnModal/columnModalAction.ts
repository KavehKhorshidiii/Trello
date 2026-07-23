'use server'

import connectDB from "@/lib/connectDB/connectDB"
import { cookies } from "next/headers"
import ColumnModel from "@/models/columnModel/columnModel"


// types
type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}


export default async function columnModelAction(prevState: stateType, formData: FormData): Promise<stateType> {

   const { title, boardId } = {
      title: formData.get("title"),
      boardId: formData.get("boardId")
   }


   if(typeof title === 'string' && title.length == 0){
      return { success: false, errors: {}, message: "Please enter a title." }
   }

   const cookiesStore = await cookies()
   const tokenValue = cookiesStore.get("token")?.value
   if (!tokenValue) { return { success: false, errors: {}, message: "Token does not exist." } }

   await connectDB()

   const lastColumn = await ColumnModel.find({ board: boardId }).sort({ order: -1 })
   const OrderNumber = lastColumn[0] ? lastColumn[0]?.order + 1 : 0

   await ColumnModel.create({
      title,
      board: boardId,
      order: OrderNumber
   })

   return { success: true, errors: {}, message: "successfully" }

}
