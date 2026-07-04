'use server'


// import
import connectDB from "@/lib/connectDB/connectDB"
import { cookies } from "next/headers"
import { verifyJwtToken } from "@/lib/Auth/auth"
import BoardModel from "@/Models/boardModel/boardModel"
import ColumnModel from "@/Models/columnModel/columnModel"


// types
type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}


export default async function boardModalAction(prevState: stateType, formData: FormData): Promise<stateType> {

   // formData
   const { title, des, color } = {
      title: formData.get("title"),
      des: formData.get("des"),
      color: formData.get("color")
   }


   const cookiesStore = await cookies()
   const tokenValue = cookiesStore.get("token")?.value
   if (!tokenValue) { return { success: false, errors: {}, message: "Token does not exist." } }
   const verifyTokenValue = verifyJwtToken(tokenValue)


   let userID;
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


   // create default Columns
   const createDefaultColumns = await ColumnModel.insertMany([
      {
         title: "Todo",
         board: createBoard._id,
         order: 0
      },
      {
         title: "In Progress",
         board: createBoard._id,
         order: 1
      },
      {
         title: "Done",
         board: createBoard._id,
         order: 2
      }
   ])


   return { success: true, errors: {}, message: "successfully" }
}
