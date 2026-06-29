import { MoreHorizontal, Plus } from "lucide-react"
import { GripHorizontal } from 'lucide-react';
import { Button } from "../ui/button"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


import { DndContext } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";



type CardType = {
   board: string,
   color: string,
   createdAt: string,
   title: string,
   des: string,
   updatedAt: string,
   _id: string
}

type CardFuncType = {
   board: string,
   column: string,
   color: string,
   createdAt: string,
   title: string,
   des: string,
   updatedAt: string,
   _id: string
}

export default function BoardColumn({ boardData, isCardModal, tasks, setIsCardModal, setSelectedColumnId }: { boardData: CardType, isCardModal: boolean, tasks: CardFuncType[], setIsCardModal: (value: boolean) => void, setSelectedColumnId: (value: string) => void }) {



   const AddCardHandler = () => {
      setIsCardModal(!isCardModal)
      setSelectedColumnId(boardData._id)
   }

   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
   } = useSortable({
      id: boardData._id,
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };


   return (
      <div style={style} ref={setNodeRef} className=" flex flex-col w-[300px] shrink-0">


         <div className="flex flex-col gap-3 bg-gray-50 rounded-xl border border-gray-200 p-3 min-h-[120px]">

            {/* Column header */}
            <div  {...attributes} {...listeners} className="flex items-center border-b-1  justify-between mb-3">
               <div className="flex w-full justify-between items-center gap-2">
                  <div className=" flex gap-2 items-center">
                     <div>
                        <GripHorizontal className="text-gray-400 hover:text-gray-600 size-5" />
                     </div>
                     <div className=" flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">{boardData.title}</span>
                        <span className="text-sm text-gray-400 font-medium">{tasks?.length}</span>
                     </div>
                  </div>
                  <Button variant="ghost" size="sm"><MoreHorizontal /></Button>
               </div>
            </div>

            {/* Cards area */}
            <SortableContext strategy={horizontalListSortingStrategy} items={tasks?.map((task: CardType) => task._id)} >
            {
               tasks?.map((task: CardFuncType) =>

                  <div key={task._id} className=" border flex flex-col justify-between rounded-xl  overflow-y-auto">
                     <div>
                        <div className=" px-2 pt-2 font-bold flex items-center justify-between">
                           <p>{task.title}</p>
                           <Button variant="ghost" size="sm"><MoreHorizontal /></Button>
                        </div>
                        <p className=" px-2">{task.des}</p>
                     </div>
                     <div className=" flex items-center text-sm justify-between bg-gray-50 sticky bottom-0  boarder border p-2 overflow-y-auto">
                        <span className=" size-3 bg-blue-500 rounded-full"></span>
                        <span>{task.updatedAt.split("T")[0]}</span>
                     </div>
                  </div>

               )
            }
            </SortableContext>


            {/* Add a card */}
            <button onClick={AddCardHandler} className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mt-1 py-1 transition-colors w-full">
               <Plus></Plus>
               Add a card
            </button>

         </div>
      </div>
   )
}
