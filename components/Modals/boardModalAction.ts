'use server'

import connectDB from "@/lib/connectDB/connectDB"
import { cookies } from "next/headers"
import { JwtPayload } from "jsonwebtoken"
import { verifyJwtToken } from "@/lib/auth"
import UsersModel from "@/Models/usersmodel/usersmodel"
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

   const theCookieToken = (await cookies()).get("token")?.value
   const verifyTokenValue = verifyJwtToken(theCookieToken as string)

   let userID
   if (typeof verifyTokenValue === "object" && verifyTokenValue !== null) {
      userID = (verifyTokenValue as JwtPayload).id.id;
   }

   await connectDB()
   const createBoard = await BoardModel.create({
      title,
      des,
      color,
      userID: userID 
   })


   return { success: true, errors: {}, message: "successfully" }
}
