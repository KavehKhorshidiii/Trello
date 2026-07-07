// imports
import { Button } from "../ui/button"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import Spinner from "../spinner/spinner";



// icons
import {
   CalendarDays,
   GripVertical,
   Pen,
   Trash,
   Copy,
   ChevronLeft
} from "lucide-react";

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

export default function TaskCard({ data, TaskIsPending }: { data: CardFuncType, TaskIsPending: boolean }) {

   const [cardTaskMenu, setCardTaskMenu] = useState(false)


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



   return (
      <div ref={setNodeRef} style={style} className={`group flex min-h-56 flex-col overflow-hidden rounded-xl border bg-white shadow-sm  hover:-translate-y-1 hover:shadow-lg ${isDragging ? "cursor-grabbing shadow-xl" : ""}`}>

         {TaskIsPending ? <Spinner /> :
            <>

               {/* top color task */}
               < div className={`h-1.5 w-full ${colorMap[data.color as keyof typeof colorMap] ?? "bg-gray-300"}`} />
               <div>




                  {/* container */}
                  <div className=" py-3 px-2">

                     {/* Top */}
                     <div className=" flex gap-4 items-center content-center justify-between ">

                        {/* title & Dnd icon */}
                        <div className=" flex items-center content-center gap-2">

                           {/* DND Icon */}
                           <div>
                              <GripVertical {...attributes} {...listeners} className={` shrink-0 size-5 text-gray-400 transition-colors hover:text-gray-500 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`} />
                           </div>

                           {/* title */}
                           <div className="flex-1 min-w-0 pr-16">
                              <h3 className="truncate text-lg font-semibold text-gray-800">
                                 {data.title}
                              </h3>
                           </div>

                        </div>

                        {/* menu (Absolute Position) */}
                        <div className={`rounded-full z-10 flex items-center ${cardTaskMenu && "border"}`}>
                           <Button onClick={() => setCardTaskMenu((prev) => !prev)} variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-gray-200 bg-white opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100" >
                              <ChevronLeft className={`size-4 transition-transform duration-300 ${cardTaskMenu ? "rotate-180" : ""}`} />
                           </Button>

                           <div className={` flex items-center gap-1 overflow-hidden transition-all duration-300 ${cardTaskMenu ? "max-w-40 opacity-100" : "max-w-0 opacity-0"}`} >
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-yellow-500" >
                                 <Pen className="size-4" strokeWidth={2.5} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-slate-600" >
                                 <Copy className="size-4" strokeWidth={2.5} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600" >
                                 <Trash className="size-4" strokeWidth={2.5} />
                              </Button>
                           </div>
                        </div>

                     </div >

                     {/* Body */}
                     <div>
                        <p className="mt-3 line-clamp-5 text-sm leading-6 text-gray-500"> {data.des || "No description"} </p>
                     </div>

                     {/* Footer */}
                     <div>
                     </div>

                  </div>










               </div >
            </>
         }
      </div >
   )

}




// return (
//    <div
//       ref={setNodeRef}
//       style={style}
//       className={`group relative flex min-h-56 flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${isDragging ? "cursor-grabbing shadow-xl" : ""
//          }`}
//    >
//       {/* Status Line */}
//       <div
//          className={`h-1.5 w-full ${colorMap[data.color as keyof typeof colorMap] ?? "bg-gray-300"
//             }`}
//       />
//       {/* Action Menu */}
//       <div className="absolute right-4 top-4 z-10 flex items-center">
//          <Button
//             onClick={() => setCardTaskMenu((prev) => !prev)}
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 rounded-full border border-gray-200 bg-white opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100"
//          >
//             <ChevronLeft
//                className={`size-4 transition-transform duration-300 ${cardTaskMenu ? "rotate-180" : ""
//                   }`}
//             />
//          </Button>

//          <div
//             className={`ml-2 flex items-center gap-1 overflow-hidden transition-all duration-300 ${cardTaskMenu
//                ? "max-w-40 opacity-100"
//                : "max-w-0 opacity-0"
//                }`}
//          >
//             <Button
//                variant="ghost"
//                size="icon"
//                className="h-8 w-8 text-gray-400 hover:text-yellow-500"
//             >
//                <Pen className="size-4" strokeWidth={2.5} />
//             </Button>

//             <Button
//                variant="ghost"
//                size="icon"
//                className="h-8 w-8 text-gray-400 hover:text-slate-600"
//             >
//                <Copy className="size-4" strokeWidth={2.5} />
//             </Button>

//             <Button
//                variant="ghost"
//                size="icon"
//                className="h-8 w-8 text-gray-400 hover:text-red-600"
//             >
//                <Trash className="size-4" strokeWidth={2.5} />
//             </Button>
//          </div>
//       </div>

//       {/* Content */}
//       <div className="flex flex-1 gap-3 p-4">
//          {/* Drag Handle */}
//          <GripVertical
//             {...attributes}
//             {...listeners}
//             className={`mt-1 shrink-0 text-gray-300 transition-colors hover:text-gray-500 ${isDragging ? "cursor-grabbing" : "cursor-grab"
//                }`}
//          />

//          <div className="flex-1 min-w-0 pr-16">
//             <h3 className="truncate text-lg font-semibold text-gray-800">
//                {data.title}
//             </h3>

//             <p className="mt-3 line-clamp-5 text-sm leading-6 text-gray-500">
//                {data.des || "No description"}
//             </p>
//          </div>
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-3 text-sm text-gray-500">
//          <div className="flex items-center gap-2">
//             <span
//                className={`h-2 w-2 rounded-full ${colorMap[data.color as keyof typeof colorMap] ?? "bg-gray-300"
//                   }`}
//             />
//          </div>

//          <div className="flex items-center gap-2">
//             <CalendarDays className="size-4" />
//             <span>{data.updatedAt.split("T")[0]}</span>
//          </div>
//       </div>
//    </div>
// );

