'use server'


// imports
import connectDB from "@/lib/ConnectDB/connectDB"
import BoardModel from "@/models/boardModel/boardModel"


// types
type stateType = {
   success: boolean | null,
   errors: object,
   message: string
}


export default async function changeColorNavbarAction(prevState: stateType, formData: FormData): Promise<stateType> {

   // get formData
   const { title, color, boardId } = {
      title: formData.get("title") as string | null,
      color: formData.get("color") as string | null,
      boardId: formData.get("boardId")?.toString()
   }

   if (!boardId) { return { success: false, errors: {}, message: "Invalid boardId" } }

   await connectDB()

   // board data
   const board = await BoardModel.findById(boardId);

   if (!board) { return { success: false, errors: {}, message: "Board not found" } }

   const titleStr = title?.trim()
   const colorStr = color?.trim()


   const updateData = {
      title: titleStr || board.title,
      color: colorStr || board.color,
   }

   // edit board data
   const updateBoard = await BoardModel.findByIdAndUpdate(
      boardId,
      { $set: updateData },
      { new: true }
   )

   if (!updateBoard) {
      return { success: false, errors: {}, message: "not updated" }
   }

   return { success: true, errors: {}, message: "successfully" }

}
