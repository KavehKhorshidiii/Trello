'use client'


import { X } from "lucide-react"
import { useActionState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import columnModelAction from "@/components/Modals/Column/ColumnModal/columnModalAction"
import Spinner from "@/components/spinnerComponent/spinner"


export default function ColumnModal({ setIsModalColumn, params }: { isModalColumn: boolean, setIsModalColumn: (value: boolean) => void, params: string }) {

   const [state, formAction, pending] = useActionState(columnModelAction, { success: null, errors: {}, message: "" })

   const queryClient = useQueryClient()

   useEffect(() => {

      if (state.success) {
         setIsModalColumn(false)
         queryClient.invalidateQueries({ queryKey: ["columns"] })
      }

   }, [state.success, queryClient, setIsModalColumn])


   return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">

         <div className="w-5/6 sm:w-96 max-w-md bg-white rounded-lg shadow-xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <h2 className="text-sm font-medium text-gray-900">Create Column</h2>
               <button onClick={() => setIsModalColumn(false)} className="text-gray-500 hover:text-gray-700 transition"><X size={18} /></button>
            </div>

            {/* Form */}
            <form action={formAction} className="flex flex-col gap-4 p-4">

               {/* hidden input */}
               <input type="hidden" name="boardId" value={params} />

               {/* Title */}
               <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Column Name</label>
                  <input name="title" minLength={1} maxLength={30} placeholder="Enter Column name" className="border rounded px-3 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
               </div>

               {/* Actions */}
               <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsModalColumn(false)} className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 transition">Cancel</button>
                  <button type="submit" disabled={pending} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50" >{pending ? <Spinner /> : "Create"}</button>
               </div>

            </form>

         </div>
      </div>
      // <div className=" fixed border-4 backdrop-blur-sm w-full z-60 bg-black/30  h-screen flex justify-center bg-blur-2xl  items-center">
      //    <div className=" flex-col z-60 flex size-96 bg-white">
      //       <div onClick={() => setIsModalColumn(false)}><X></X></div>

      //       <form action={formAction} className=" flex-col">
      //          <input type="hidden" name="boardId" value={params} />
      //          <div className=" flex flex-col">
      //             <label htmlFor="">Title</label>
      //             <input name="title" className=" border-2" type="text" />
      //          </div>
      //          <button type="submit" className=" border-2 rounded-sm px-3 py-1">add</button>
      //       </form>
      //    </div>
      // </div>
   )

}
