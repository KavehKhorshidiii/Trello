import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"


import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";


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
   } = useSortable({
      id: data._id,
      data: { type: "task", task: data },
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   return (
      <div style={style} ref={setNodeRef} className=" border flex flex-col justify-between rounded-xl  overflow-y-auto">
         <div {...attributes} {...listeners}>
            <div className=" px-2 pt-2 font-bold flex items-center justify-between">
               <p>{data.title}</p>
               <Button variant="ghost" size="sm"><MoreHorizontal /></Button>
            </div>
            <p className=" px-2">{data.des}</p>
         </div>
         <div className=" flex items-center text-sm justify-between bg-gray-50 sticky bottom-0  boarder border p-2 overflow-y-auto">
            <span className=" size-3 bg-blue-500 rounded-full"></span>
            <span>{data.updatedAt.split("T")[0]}</span>
         </div>
      </div>
   )
}
