'use server'


import connectDB from "@/lib/connectDB/connectDB"
import ColumnModel from "@/models/columnModel/columnModel"


// types
type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}


export default async function editColModalAction(prevState: stateType, formData: FormData): Promise<stateType> {

   // get formData
   const { title, ColId } = {
      title: formData.get("title") as string | null,
      ColId: formData.get("ColId")?.toString()
   }

   if (!ColId) { return { success: false, errors: {}, message: "Invalid Col" } }


   await connectDB()

   // Col data
   const Col = await ColumnModel.findById(ColId);

   if (!Col) { return { success: false, errors: {}, message: "Board not found" } }

   const titleStr = title?.trim()

   const updateData = {
      title: titleStr || Col.title,
   }

   // edit Col data
   const updateBoard = await ColumnModel.findByIdAndUpdate(
      ColId,
      { $set: updateData },
      { new: true }
   )

   if (!updateBoard) {
      return { success: false, errors: {}, message: "not updated" }
   }

   return { success: true, errors: {}, message: "successfully" }

}
