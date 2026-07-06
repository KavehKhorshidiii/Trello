import { Button } from "../ui/button"


import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import {
   CalendarDays,
   GripVertical,
   MoreHorizontal,
} from "lucide-react";


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



export default function TaskCard({ data }: { data: CardFuncType }) {


   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
   } = useSortable({
      id: data._id,
      data: { type: "task", task: data },
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.7 : 1,
      boxShadow: isDragging
         ? "0 20px 40px rgba(0,0,0,0.15)"
         : "0 2px 8px rgba(0,0,0,0.08)",
      zIndex: isDragging ? 999 : "auto",
      cursor: isDragging ? "grabbing" : "grab",
   };

   

   return (
      <div ref={setNodeRef} style={style} className="group flex h-48 flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

         {/* Status Line */}
         <div className={`h-1.5 w-full  bg-blue-600`} />
         {/* ${statusColor[data.status as keyof typeof statusColor] ?? "bg-blue-500" */}

         {/* Content */}
         <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
               <div className="flex gap-3">
                  {/* Drag Handle */}
                  <GripVertical {...attributes} {...listeners} className="mt-1 size-5 cursor-grab text-gray-400 transition-colors hover:text-gray-600 active:cursor-grabbing"/>
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900">{data.title}</h3>
                     <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">{data.des || "No description"}</p>
                  </div>
               </div>
               <Button variant="ghost" size="icon" className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"><MoreHorizontal className="size-5" /></Button>
            </div>
         </div>

         {/* Footer */}
         <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-3 text-sm text-gray-500">
            <div className="flex items-center gap-2">
               <span className={`h-2 w-2 rounded-full bg-blue-600`}
               />
               {/* ${statusColor[data.status as keyof typeof statusColor] ?? "bg-blue-500" */}
               <span className="text-xs font-medium">
                  {/* {data?.status} */}
               </span>
            </div>

            <div className="flex items-center gap-2">
               <CalendarDays className="size-4" />
               <span>{data.updatedAt.split("T")[0]}</span>
            </div>
         </div>
      </div>


   )
}





// <div style={style} ref={setNodeRef} className="group flex h-48 flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow duration-200 hover:-translate-y-1 hover:shadow-lg">
//    <div {...attributes} {...listeners}>
//       <div className=" px-2 pt-2 font-bold flex items-center justify-between">
//          <p>{data.title}</p>
//          <Button variant="ghost" size="sm"><MoreHorizontal /></Button>
//       </div>
//       <p className=" px-2">{data.des}</p>
//    </div>
//    <div className=" flex items-center text-sm justify-between bg-gray-50 sticky bottom-0  boarder border p-2 overflow-y-auto">
//       <span className=" size-3 bg-blue-500 rounded-full"></span>
//       <span>{data.updatedAt.split("T")[0]}</span>
//    </div>
// </div>