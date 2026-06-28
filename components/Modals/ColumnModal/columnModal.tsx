'use client'
import { X } from "lucide-react"
import { useActionState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import columnModelAction from "@/components/Modals/ColumnModal/columnModalAction"


export default function ColumnModal({ isModalColumn, setIsModalColumn, params }: { isModalColumn: boolean, setIsModalColumn: (value: boolean) => void, params: string }) {


   const [state, formAction, pendding] = useActionState(columnModelAction, { success: null, errors: {}, message: "" })

   const queryClient = useQueryClient()

   useEffect(() => {

      if (state.success) {
         setIsModalColumn(false)
         queryClient.invalidateQueries({ queryKey: ["columns"] })
      }

   }, [state.success])


   return (
      <div className=" fixed border-4 backdrop-blur-sm w-full z-60 bg-black/30  h-screen flex justify-center bg-blur-2xl  items-center">
         <div className=" flex-col z-60 flex size-96 bg-white">
            <div onClick={() => setIsModalColumn(false)}><X></X></div>

            <form action={formAction} className=" flex-col">
               <input type="hidden" name="boardId" value={params} />
               <div className=" flex flex-col">
                  <label htmlFor="">Title</label>
                  <input name="title" className=" border-2" type="text" />
               </div>
               <button type="submit" className=" border-2 rounded-sm px-3 py-1">add</button>
            </form>

         </div>
      </div>
   )


}
