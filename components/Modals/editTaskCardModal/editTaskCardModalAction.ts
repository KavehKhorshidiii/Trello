'use server'


// imports
import connectDB from "@/lib/connectDB/connectDB"
import CardModel from "@/Models/cardModel/cardModel"


// types
type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}


export default async function EditTaskCardModal(prevState: stateType, formData: FormData): Promise<stateType> {

   // get formData
   const { title, des, color, TaskCardId } = {
      title: formData.get("title") as string | null,
      des: formData.get('des') as string | null,
      color: formData.get("color") as string | null,
      TaskCardId: formData.get("TaskCardId")?.toString()
   }

   if (!TaskCardId) { return { success: false, errors: {}, message: "Invalid boardId" } }

   await connectDB()

   // task data
   const task = await CardModel.findById(TaskCardId);

   if (!task) { return { success: false, errors: {}, message: "Board not found" } }

   const titleStr = title?.trim()
   const desStr = des?.trim()
   const colorStr = color?.trim()


   const updateData = {
      title: titleStr || task.title,
      des: desStr || task.des,
      color: colorStr || task.color,
   }

   // edit board data
   const updateTaskCard = await CardModel.findByIdAndUpdate(
      TaskCardId,
      { $set: updateData },
      { new: true }
   )

   if (!updateTaskCard) {
      return { success: false, errors: {}, message: "not updated" }
   }

   return { success: true, errors: {}, message: "successfully" }

}
