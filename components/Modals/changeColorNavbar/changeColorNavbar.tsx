'use client'
import { X } from "lucide-react"
import { useActionState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import changeColorNavbarAction from "./changeColorNavbarAction"



export default function BoardModal({ changeBoardNameModal, setChangeBoardNameModal, params }: { changeBoardNameModal: boolean, setChangeBoardNameModal: (value: boolean) => void, params: string }) {


   const [state, formAction, pendding] = useActionState(changeColorNavbarAction, { success: null, errors: {}, message: "" })

   const queryClient = useQueryClient()

   useEffect(() => {

      if (state.success) {
         setChangeBoardNameModal(false)
         queryClient.invalidateQueries({ queryKey: ["board"] })
      }

   }, [state.success])

   return (
      <div className=" fixed flex justify-center items-center border-4 backdrop-blur-sm w-screen z-60 top-0 left-0 bg-black/30 h-screen bg-blur-2xl">
         <div className=" flex-col z-60 flex size-96 bg-white">
            <div onClick={() => setChangeBoardNameModal(false)}><X></X></div>

            <form action={formAction} className=" w-full flex-col">
               <input type="hidden" name="boardId" value={params} />
                <div className=" flex justify-start gap-3 items-center">
                  Title
                  <div className=" flex gap-1">
                     <input name="title" className=" border-2 w-full size-10" type="text" />
                  </div>
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
