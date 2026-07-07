'use client'
import { X } from "lucide-react"
import { useActionState, useEffect, useState } from "react"
import cardModalAction from "./cardTaskModalAction"
import { useQueryClient } from "@tanstack/react-query"
import Colors from "@/components/colorsComponent/Colors"
import Spinner from "@/components/spinnerComponent/spinner"




export default function CardTaskModal({ columnId, boardId, setCardTaskModal }: { setCardTaskModal: (value: boolean) => void, columnId: string | undefined, boardId: string }) {


   const [state, formAction, pending] = useActionState(cardModalAction, { success: null, errors: {}, message: "" })
   const [color, setColor] = useState("")


   const queryClient = useQueryClient()

   useEffect(() => {

      if (state.success) {
         setCardTaskModal(false)
         queryClient.invalidateQueries({ queryKey: ["tasks"] })
      }

   }, [state.success])

   return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">

         <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <h2 className="text-sm font-medium text-gray-900">Create Board</h2>
               <button onClick={() => setCardTaskModal(false)} className="text-gray-500 hover:text-gray-700 transition"><X size={18} /></button>
            </div>

            {/* Form */}
            <form action={formAction} className="flex flex-col gap-4 p-4">

               {/* hidden input */}
               <input type="hidden" name="columnId" value={columnId} />
               <input type="hidden" name="boardId" value={boardId} />

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
                  <button type="button" onClick={() => setCardTaskModal(false)} className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 transition">Cancel</button>
                  <button type="submit" disabled={pending} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50" >{pending ? <Spinner /> : "Create"}</button>
               </div>

            </form>

         </div>
      </div>
   )
}


// <div className=" fixed border-4 backdrop-blur-sm w-full z-60 bg-black/30  h-screen flex justify-center bg-blur-2xl  items-center">
//    <div className=" flex-col z-60 flex size-96 bg-white">
//       <div onClick={() => setCardTaskModal(false)}><X></X></div>

//       <form action={formAction} className=" flex-col">
//          <input type="hidden" name="columnId" value={columnId} />
//          <input type="hidden" name="boardId" value={boardId} />
//          <div className=" flex flex-col">
//             <label htmlFor="">Title</label>
//             <input name="title" className=" border-2" type="text" />
//          </div>
//          <div className=" flex flex-col">
//             <label htmlFor="">Description</label>
//             <input name="des" className=" border-2" type="text" />
//          </div>
//          <div className=" flex justify-start gap-3 items-center">
//             color
//             <div className=" flex gap-1">
//                <input name="color" defaultValue="#000000" className=" size-10" type="color" />
//             </div>
//          </div>
//          <button type="submit" className=" border-2 rounded-sm px-3 py-1">add</button>
//       </form>

//    </div>
// </div>