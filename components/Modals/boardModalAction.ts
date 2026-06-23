'use server'

import connectDB from "@/lib/connectDB/connectDB"
import { cookies } from "next/headers"
import { verifyJwtToken } from "@/lib/auth"
import BoardModel from "@/Models/boardModel/boardModel"



type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}

export default async function boardModalAction(prevState: stateType, formData: FormData): Promise<stateType> {

   const { title, des, color } = {
      title: formData.get("title"),
      des: formData.get("des"),
      color: formData.get("color")
   }

   console.log(title, des, color)


   const cookiesStore = await cookies()
   const tokenValue = cookiesStore.get("token")?.value
   if (!tokenValue) { return { success: false, errors: {}, message: "Token does not exist." } }
   const verifyTokenValue = verifyJwtToken(tokenValue)

   let userID ;
   if (
      typeof verifyTokenValue === "object" &&
      verifyTokenValue !== null &&
      "id" in verifyTokenValue
   ) {
      userID = verifyTokenValue.id
   }



   await connectDB()
   const createBoard = await BoardModel.create({
      title,
      des,
      color,
      author: userID 
   })

   console.log(createBoard)


   return { success: true, errors: {}, message: "successfully" }
}
