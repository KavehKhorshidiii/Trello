'use client'
import { X } from "lucide-react"
import { useActionState, useEffect } from "react"
import cardModalAction from "./taskModalAction"
import { useQueryClient } from "@tanstack/react-query"



export default function TaskModal({ isCardModal, setIsCardModal, params }: { isCardModal: boolean, setIsCardModal: (value: boolean) => void, params:{ColumnId:string , BoardId:string} }) {

   // params.BoardId
   // params.ColumnId

   const [state, formAction, pendding] = useActionState(cardModalAction, { success: null, errors: {}, message: "" })

   const queryClient = useQueryClient()

   useEffect(() => {

      if (state.success) {
         setIsCardModal(false)
         queryClient.invalidateQueries({ queryKey: ["tasks"] })
      }

   }, [state.success])

   return (
      <div className=" fixed border-4 backdrop-blur-sm w-full z-60 bg-black/30  h-screen flex justify-center bg-blur-2xl  items-center">
         <div className=" flex-col z-60 flex size-96 bg-white">
            <div onClick={() => setIsCardModal(false)}><X></X></div>

            <form action={formAction} className=" flex-col">
               <input type="hidden" name="columnId" value={params.ColumnId} />
               <input type="hidden" name="boardId" value={params.BoardId} />
               <div className=" flex flex-col">
                  <label htmlFor="">Title</label>
                  <input name="title" className=" border-2" type="text" />
               </div>
               <div className=" flex flex-col">
                  <label htmlFor="">Description</label>
                  <input name="des" className=" border-2" type="text" />
               </div>
               <div className=" flex justify-start gap-3 items-center">
                  color
                  <div className=" flex gap-1">
                     <input name="color" defaultValue="#000000" className=" size-10" type="color" />
                  </div>
               </div>
               <button type="submit" className=" border-2 rounded-sm px-3 py-1">add</button>
            </form>

         </div>
      </div>
   )
}
