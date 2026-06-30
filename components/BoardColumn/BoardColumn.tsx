'use client'
import { MoreHorizontal, Plus } from "lucide-react"
import { GripHorizontal } from 'lucide-react';
import { Button } from "../ui/button"
import TaskCard from "../TaskCard/TaskCard";
import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
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
      data: { type: "column", column: boardData },
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };



   const [Tasks, setTasks] = useState<CardFuncType[]>([]);
   const displayTasks = Tasks.length > 0 ? Tasks : (tasks ?? []);
   //console.log(displayTasks)


   return (
      <div {...attributes} {...listeners}  style={style} ref={setNodeRef} className=" flex flex-col w-[300px] shrink-0 cursor-grab">


         <div className="flex flex-col gap-3 bg-gray-50 rounded-xl border border-gray-200 p-3 min-h-[120px]">

            {/* Column header */}
            <div className="flex items-center border-b-1  justify-between mb-3">
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
            {/* <DndContext> */}
            <SortableContext strategy={verticalListSortingStrategy} items={(tasks || []).map((task: CardFuncType) => task._id)} >
               {
                  displayTasks?.map((task: CardFuncType) =>
                     <TaskCard key={task._id} data={task} />
                  )
               }
            </SortableContext>
            {/* </DndContext> */}


            {/* Add a card */}
            <button onClick={AddCardHandler} className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mt-1 py-1 transition-colors w-full">
               <Plus></Plus>
               Add a card
            </button>

         </div>
      </div>
   )
}
