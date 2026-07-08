'use client'
import { X } from "lucide-react"
import { useActionState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import editColModalAction from "./editColModalAction"
import Spinner from "@/components/spinnerComponent/spinner"


export default function EditColModal({ setEditColData, ColId }: { setEditColData: (value: boolean) => void, ColId: string }) {

   const [state, formAction, pending] = useActionState(editColModalAction, { success: null, errors: {}, message: "" }) // useActionState

   const queryClient = useQueryClient() //useQueryClient


   // update board name
   useEffect(() => {
      if (state.success) {
         setEditColData(false)
         queryClient.invalidateQueries({ queryKey: ["columns"] })
      }
   }, [state.success , queryClient , setEditColData])


   // close on ESC
   useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
         if (e.key === "Escape") setEditColData(false);
      };

      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
   }, [setEditColData]);


   return (
      <div className="fixed onClick={() => setEditColData(false)} inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
         <div className="flex flex-col w-5/6 sm:w-96 bg-white rounded-lg overflow-hidden shadow-lg">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <span className="font-medium text-sm">Edit Board</span>
               <button onClick={() => setEditColData(false)} disabled={pending} className="text-gray-500 hover:text-gray-700"><X size={18} /></button>
            </div>

            {/* Form */}
            <form action={formAction} className="flex flex-col gap-4 p-4">
               <input type="hidden" name="ColId" value={ColId} />
               <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 w-12">Title</label>
                  <input name="title" minLength={1} maxLength={30} type="text" className="border rounded px-2 h-9 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
               </div>
               <div className="flex justify-end gap-2 pt-2">
                  <button type="button" disabled={pending} onClick={() => setEditColData(false)} className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 transition">Cancel</button>
                  <button type="submit" disabled={pending} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50">{pending ? <Spinner /> : "Create"}</button>
               </div>
            </form>

         </div>
      </div>
   )
}
