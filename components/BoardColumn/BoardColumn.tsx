'use client'


// Imports
import { MoreHorizontal, Pencil, Ellipsis, Trash2, Plus, GripHorizontal } from "lucide-react"
import DeleteColModal from '@/components/Modals/ColumnModal/deleteColModal/deleteColModal'
import { Button } from "../ui/button"
import TaskCard from "../TaskCard/TaskCard";
import { CSS } from "@dnd-kit/utilities"; // dnd
import { useDroppable } from "@dnd-kit/core"; // dnd
import { verticalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable"; // dnd
import { useState } from "react";
import EditColModal from "../Modals/editColModal/editColModal";




// Types
type BoardType = {
   _id: string
   title: string,
   board: string,
   order: number,
   __v: number
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
type PropsType = {
   setCardTaskModal: (value: boolean) => void;
   setSelectedColumnId: (value: string) => void;
   ColData: BoardType;
   cardTaskModal: boolean;
   tasks: CardFuncType[];
}


export default function BoardColumn({ ColData, cardTaskModal, tasks, setCardTaskModal, setSelectedColumnId }: PropsType) {


   const [OpenColMenu, setOpenColMenu] = useState(false) // Open Column Menu
   const [editColData, setEditColData] = useState(false) // Edit Column Data
   const [deleteColModal, setDeleteColModal] = useState(false) // Delete Column Modal


   // Add New TaskCard
   const AddCardHandler = () => {
      setCardTaskModal(!cardTaskModal)
      setSelectedColumnId(ColData._id)
   }


   // Ellipsis Button Handler
   const ColMenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOpenColMenu(!OpenColMenu);
   }


   // - DRAG AND DROP -
   const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({ id: ColData._id, data: { type: "column", column: ColData }, });
   const { setNodeRef: setDropRef, isOver } = useDroppable({ id: ColData._id, data: { type: "column", column: ColData, }, });
   const style = { transform: CSS.Transform.toString(transform), transition, };


   return (
      <div ref={(node) => { setNodeRef(node); setDropRef(node); }} style={style} className="w-[340px] shrink-0">


         {/* delete board modal */}
         {deleteColModal && <DeleteColModal setDeleteColModal={setDeleteColModal} colData={ColData} />}
         {/* Edit Board Data Modal */}
         {editColData && <EditColModal setEditColData={setEditColData} ColId={ColData._id} />}


         <div className={` flex min-h-[220px] flex-col rounded-2xl border bg-white shadow-sm transition-all duration-200${isOver ? "border-blue-500 ring-2 ring-blue-200 shadow-lg" : "border-gray-200 hover:shadow-md"}`} >

            {/* Header */}
            <div className="sticky top-0 z-10 rounded-t-2xl group border-b bg-white p-4">
               <div className="flex items-center justify-between">
                  <div className="flex select-none items-center gap-3">
                     <GripHorizontal {...attributes} {...listeners} className="size-5 cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing" /> {/* Drag Handle */}
                     <h2 className="font-semibold text-gray-800"> {ColData.title} </h2>
                     <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"> {tasks?.length ?? 0} </span>
                  </div>
                  {/* menu modal */}
                  <div onClick={ColMenuHandler} className={`hover:text-gray-600 transition-all duration-200 flex flex-col relative px-2 items-center `} >
                     <Button variant="ghost" size="icon" className={"opacity-0 transition-opacity group-hover:opacity-100" + (OpenColMenu ? " bg-gray-100 rounded-sm opacity-100" : "")}> <MoreHorizontal className="size-5" /> </Button>
                     {
                        <div className={"absolute right-0 top-full w-48 rounded-lg border bg-white shadow-lg" + (OpenColMenu ? " opacity-100 visible" : " invisible opacity-0")}>
                           <button onClick={() => setEditColData(true)} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100"><Pencil className="h-4 w-4" />Edit Column</button><hr />
                           <button onClick={() => setDeleteColModal(true)} className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" />Delete Column</button>
                        </div>
                     }
                  </div>
               </div>
            </div>

            {/* Cards */}
            <div className="flex-1 select-none space-y-3 overflow-y-auto p-3">
               <SortableContext strategy={verticalListSortingStrategy} items={(tasks || []).map((task: CardFuncType) => task._id)}>
                  {tasks?.map((task: CardFuncType) => (<TaskCard key={task._id} data={task} />))}
               </SortableContext>
               {tasks?.length === 0 && (<div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">  Drop a task here </div>)}
            </div>

            {/* Footer */}
            <div className="border-t select-none p-3">
               <button onClick={AddCardHandler} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-500 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600" > <Plus className="size-4" /> Add a card  </button>
            </div>

         </div>
      </div>
   );

}
