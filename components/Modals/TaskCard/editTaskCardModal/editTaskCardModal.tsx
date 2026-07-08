'use client'

// imports
import { X } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import Colors from "@/components/colorsComponent/Colors"
import Spinner from "@/components/spinnerComponent/spinner"
import EditTaskCardModal from "./editTaskCardModalAction"

export default function EditTackCardModal({ SetOpenEditTackCardModal, TaskCardId }: { SetOpenEditTackCardModal: (value: boolean) => void, TaskCardId: string }) {

   const [state, formAction, pending] = useActionState(EditTaskCardModal, { success: null, errors: {}, message: "" }) // useActionState

   const [color, setColor] = useState('') // select color State

   const queryClient = useQueryClient() //useQueryClient


   // update board name
   useEffect(() => {
      if (state.success) {
         SetOpenEditTackCardModal(false)
         queryClient.invalidateQueries({ queryKey: ["tasks"] })
      }
   }, [state.success , SetOpenEditTackCardModal , queryClient])


   // close on ESC
   useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
         if (e.key === "Escape") SetOpenEditTackCardModal(false);
      };

      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
   }, [SetOpenEditTackCardModal]);


   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
         <div className="flex w-5/6 sm:w-96 flex-col bg-white rounded-lg overflow-hidden shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <span className="font-medium text-sm">Edit Task Card</span>
               <button onClick={() => SetOpenEditTackCardModal(false)} disabled={pending} className="text-gray-500 hover:text-gray-700"><X size={18} /></button>
            </div>


            {/* Form */}
            <form action={formAction} className="flex flex-col gap-4 p-4">

               {/* hidden input */}
               {/* <input type="hidden" name="columnId" value={columnId} /> */}
               <input type="hidden" name="TaskCardId" value={TaskCardId} />

               {/* Title */}
               <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Title</label>
                  <input name="title" minLength={1} maxLength={30} placeholder="Enter board title" className="border rounded px-3 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
               </div>

               {/* Description */}
               <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Description</label>
                  <textarea name="des" placeholder="Short description..." className="border rounded px-3 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
               </div>

               {/* Color */}
               <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600">Color</label>
                  <input type="hidden" name="color" value={color} />
                  <Colors setColor={setColor} />
               </div>

               {/* Actions */}
               <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => SetOpenEditTackCardModal(false)} className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 transition">Cancel</button>
                  <button type="submit" disabled={pending} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50" >{pending ? <Spinner /> : "Create"}</button>
               </div>

            </form>



         </div>
      </div>
   )
}

