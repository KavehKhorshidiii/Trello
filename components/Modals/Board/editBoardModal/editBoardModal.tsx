'use client'


// imports
import { X } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import changeColorNavbarAction from "./editBoardModalAction"
import Colors from "@/components/colorsComponent/Colors"
import Spinner from "@/components/spinnerComponent/spinner"


export default function EditBoardModal({ setEditBoardData, boardId }: { setEditBoardData: (value: boolean) => void, boardId: string }) {

   const [state, formAction, pending] = useActionState(changeColorNavbarAction, { success: null, errors: {}, message: "" }) // useActionState
   const [color, setColor] = useState('') // select color State
   const queryClient = useQueryClient() //useQueryClient


   // update board name
   useEffect(() => {
      if (state.success) {
         setEditBoardData(false)
         queryClient.invalidateQueries({ queryKey: ["boards"] })
      }
   }, [state.success , queryClient , setEditBoardData])


   // close on ESC
   useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
         if (e.key === "Escape") setEditBoardData(false);
      };

      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
   }, [setEditBoardData]);


   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
         <div className="flex flex-col w-5/6 sm:w-96 bg-white rounded-lg overflow-hidden shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <span className="font-medium text-sm">Edit Board</span>
               <button onClick={() => setEditBoardData(false)} disabled={pending} className="text-gray-500 hover:text-gray-700"><X size={18} /></button>
            </div>

            {/* Form */}
            <form action={formAction} className="flex flex-col gap-4 p-4">
               <input type="hidden" name="boardId" value={boardId} />
               <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 w-12">Title</label>
                  <input name="title" minLength={1} maxLength={30} type="text" className="border rounded px-2 h-9 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
               </div>
               <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 w-12">Color</label>
                  <input type="hidden" name="color" value={color} />
                  <Colors setColor={setColor} />
               </div>
               <div className="flex justify-end gap-2 pt-2">
                  <button type="button" disabled={pending} onClick={() => setEditBoardData(false)} className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 transition">Cancel</button>
                  <button type="submit" disabled={pending} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50">{pending ? <Spinner /> : "Create"}</button>
               </div>
            </form>

         </div>
      </div>
   )

}
