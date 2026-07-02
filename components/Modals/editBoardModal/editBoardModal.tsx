'use client'
import { X } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import changeColorNavbarAction from "./editBoardModalAction"
import Colors from "@/components/Colors/Colors"


export default function EditBoardModal({ setChangeNamePending , setChangeBoardNameModal, params }: { setChangeNamePending: (value: boolean) => void, changeBoardNameModal: boolean, setChangeBoardNameModal: (value: boolean) => void, params: string }) {

   const [state, formAction, pending] = useActionState(changeColorNavbarAction, { success: null, errors: {}, message: "" }) // useActionState

   const [color, setColor] = useState('') // select color State

   const queryClient = useQueryClient() //useQueryClient


   // update board name
   useEffect(() => {
      if (state.success) {
         setChangeBoardNameModal(false)
         queryClient.invalidateQueries({ queryKey: ["board"] })
      }
   }, [state.success])


   // pending State
   useEffect(() => {
      if (pending) {
         setChangeNamePending(true)
      } else {
         setChangeNamePending(false)
      }
   }, [pending])


   return (
      <div className="fixed inset-0 flex justify-center top-0 h-screen items-center z-50 bg-black/30 ">
         <div className="flex flex-col w-96 bg-white rounded-lg overflow-hidden shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <span className="font-medium text-sm">Edit Board</span>
               <button onClick={() => setChangeBoardNameModal(false)} className="text-gray-500 hover:text-gray-700"><X size={18} /></button>
            </div>

            {/* Form */}
            <form action={formAction} className="flex flex-col gap-4 p-4">
               <input type="hidden" name="boardId" value={params} />

               <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 w-12">Title</label>
                  <input name="title" minLength={1} maxLength={30} type="text" className="border rounded px-2 h-9 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
               </div>

               <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 w-12">Color</label>
                  <input type="hidden" name="color" value={color} />
                  <Colors setColor={setColor} />
               </div>

               <button type="submit" className="self-end mt-1 px-4 py-1.5 text-sm border rounded hover:bg-gray-50 transition-colors">Save</button>
            </form>

         </div>
      </div>
   )
}
