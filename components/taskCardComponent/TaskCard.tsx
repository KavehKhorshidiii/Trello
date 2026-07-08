// imports
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import DeleteTaskCardModal from "../Modals/TaskCard/TaskModal/deleteTaskCardModal/deleteTaskCardModal";
import EditTackCardModal from "../Modals/TaskCard/editTaskCardModal/editTaskCardModal";
import { toast } from "sonner";
import ShowTaskCard from "../Modals/TaskCard/ShowTaskCard/ShowTaskCard";
import { CalendarDays, GripVertical, Pen, Trash, Eye, Copy, ChevronLeft } from "lucide-react";


// types
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

// colors
type ColorKey = "blue" | "red" | "green" | "cyan" | "purple" | "yellow" | "gray";
const colorMap: Record<ColorKey, string> = {
   blue: "bg-blue-600",
   red: "bg-red-600",
   green: "bg-green-600",
   cyan: "bg-cyan-600",
   purple: "bg-purple-600",
   yellow: "bg-amber-600",
   gray: "bg-gray-600",
};

export default function TaskCard({ data }: { data: CardFuncType }) {

   const [cardTaskMenu, setCardTaskMenu] = useState(false)
   const [deleteCardTaskModal, setDeleteCardTaskModal] = useState(false) // Delete CardTask Modal
   const [OpenEditTackCardModal, SetOpenEditTackCardModal] = useState(false) // Edit CardTask Modal
   const [showTaskCard, setShowTaskCard] = useState(false) // showTaskCard


   // DRAG AND DROP
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
   };

   // copy task handler
   const CopyTaskHandler = async () => {
      await navigator.clipboard.writeText(
         `Title: ${data.title}\nDescription: ${data.des}`
      )
      toast.success("Task copied!", {
         description: "The task has been copied to your clipboard.",
      });
   }

   return (
      <div ref={setNodeRef} style={style} onMouseLeave={() => setCardTaskMenu(false)} className={`relative flex flex-col group h-56 shadow-2xl overflow-hidden rounded-xl border hover:bg-gray-50/85 transition-colors duration-200 bg-white/30 ${isDragging ? "cursor-grabbing shadow-xl" : ""}`}>

         {deleteCardTaskModal && <DeleteTaskCardModal setDeleteCardTaskModal={setDeleteCardTaskModal} TaskCardData={{ id: data._id, title: data.title }} />}

         {OpenEditTackCardModal && <EditTackCardModal SetOpenEditTackCardModal={SetOpenEditTackCardModal} TaskCardId={data._id} />}

         {showTaskCard && <ShowTaskCard setShowTaskCard={setShowTaskCard} TaskCardData={data} />}



         <div className={`h-full flex flex-col`}>

            {/* color task */}
            <div className={`h-2 absolute top-0 w-full ${colorMap[data.color as keyof typeof colorMap] ?? "bg-gray-300"}`} />

            {/* container */}
            <div className=" p-3  h-full flex gap-1 justify-between flex-col">

               {/* Top */}
               <div className=" flex pt-1 items-center content-center justify-between ">

                  {/* title & Dnd icon */}
                  <div className=" flex items-center content-center gap-1">

                     {/* DND Icon */}
                     <div>
                        <GripVertical {...attributes} {...listeners} className={`touch-none shrink-0 size-5 text-gray-400 transition-colors hover:text-gray-500 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} />
                     </div>

                     {/* title */}
                     <div className="flex-1 min-w-0">
                        <h3 className="truncate text-sm sm:text-base font-semibold text-gray-800">
                           {data.title}
                        </h3>
                     </div>

                  </div>

                  {/* menu (Absolute Position) */}
                  <div className={`rounded-full absolute right-2 flex items-center ${cardTaskMenu ? "inset-shadow-sm  bg-white inset-shadow-gray-400 " : ""}`}>
                     <button onClick={() => setCardTaskMenu((prev) => !prev)} className={`${cardTaskMenu && ""} size-8 rounded-ful flex justify-center items-center transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100`} >
                        <ChevronLeft className={`size-5 text-gray-800 transition-transform duration-300 ${cardTaskMenu ? " rotate-180" : ""}`} />
                     </button>

                     <div className={` flex items-center overflow-hidden transition-all duration-400 ${cardTaskMenu ? "max-w-40 opacity-100" : "max-w-0 opacity-0"}`} >
                        <button onClick={() => setShowTaskCard(true)} className=" size-7 hover:bg-inherit rounded-full text-gray-400 hover:text-blue-600" ><Eye className="size-4" strokeWidth={2.5} /></button>
                        <button onClick={CopyTaskHandler} className=" size-7 hover:bg-inherit rounded-full text-gray-400 hover:text-slate-600" ><Copy className="size-4" strokeWidth={2.5} /> </button>
                        <button onClick={() => SetOpenEditTackCardModal(true)} className=" size-7 hover:bg-inherit rounded-full text-gray-400 hover:text-yellow-600" ><Pen className="size-4" strokeWidth={2.5} /></button>
                        <button onClick={() => setDeleteCardTaskModal(true)} className=" size-7 hover:bg-inherit rounded-full text-gray-400 hover:text-red-600" ><Trash className="size-4" strokeWidth={2.5} /></button>
                     </div>
                  </div>

               </div >

               {/* Body */}
               <div className=" flex-1 overflow-auto">
                  <p className=" px-1.5 text-xs sm:text-sm text-justify leading-5  text-gray-500"> {data.des || "No description"} </p>
               </div>
            </div >

            {/* Footer */}
            <div className=" sticky bottom-0">
               <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2"> <span className={`h-2 w-2 rounded-full ${colorMap[data.color as keyof typeof colorMap] ?? "bg-gray-300"}`} /> </div>
                  <div className="flex items-center gap-2">
                     <CalendarDays className="size-4" />
                     <span>{data.updatedAt.split("T")[0]}</span>
                  </div>
               </div>
            </div>

         </div>

      </div >
   )

}

