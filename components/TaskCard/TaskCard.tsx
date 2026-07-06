// imports
import { Button } from "../ui/button"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";


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

export default function TaskCard({ data }: { data: CardFuncType }) {

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



   // return (
   //    <div ref={setNodeRef} style={style} className={`${isDragging ? "cursor-grabbing" : ""} group flex h-48 flex-col overflow-hidden rounded-xl border bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg`}>

   //       {/* Status Line */}
   //       <div className={`h-1.5 w-full  ${colorMap[data.color as keyof typeof colorMap] || "bg-gray-300"}`} />

   //       {/* Content */}
   //       <div className="flex-1 p-4">
   //          <div className="flex items-start justify-between">
   //             <div className="flex gap-3">
   //                {/* Drag Handle */}
   //                <GripVertical {...attributes} {...listeners} className={`${isDragging ? "cursor-grabbing" : "cursor-grab"} mt-1 size-5  text-gray-300 transition-colors  hover:text-gray-300`} />
   //                <div>
   //                   <h3 className="text-lg font-semibold text-gray-800">{data.title}</h3>
   //                   <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">{data.des || "No description"}</p>
   //                </div>
   //             </div>
   //             {/* Menu */}

   //             {/* Actions */}
   //             <div className="flex items-center">
   //                <Button
   //                   onClick={() => setCardTaskMenu((prev) => !prev)}
   //                   variant="ghost"
   //                   size="icon"
   //                   className="rounded-full border border-gray-200 opacity-0 transition-all duration-200 group-hover:opacity-100"
   //                >
   //                   <ChevronLeft
   //                      className={`size-4 transition-transform duration-300 ${cardTaskMenu ? "rotate-180" : ""
   //                         }`}
   //                   />
   //                </Button>

   //                <div className={`ml-2 flex items-center  overflow-hidden transition-all duration-300 ${cardTaskMenu ? "max-w-40 scale-100 opacity-100" : "max-w-0 scale-95 opacity-0"}`}>
   //                   <Button
   //                      variant="ghost"
   //                      size="icon"
   //                      className="text-gray-400 hover:text-yellow-500"
   //                   >
   //                      <Pen className="size-4" strokeWidth={2.5} />
   //                   </Button>

   //                   <Button
   //                      variant="ghost"
   //                      size="icon"
   //                      className="text-gray-400 hover:text-slate-600"
   //                   >
   //                      <Copy className="size-4" strokeWidth={2.5} />
   //                   </Button>

   //                   <Button
   //                      variant="ghost"
   //                      size="icon"
   //                      className="text-gray-400 hover:text-red-600"
   //                   >
   //                      <Trash className="size-4" strokeWidth={2.5} />
   //                   </Button>
   //                </div>
   //             </div>

   //          </div>

   //             {/* 
   //             <div className={(cardTaskMenu ? "" : " ") + " gap-1 right-0 bg-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100 rounded-full flex "}>
   //                <Button onClick={() => setCardTaskMenu(!cardTaskMenu)} variant="ghost" size="icon" className="opacity-0 hover:text-gray-300 border-2 border-gray-300 text-gray-400  rounded-full transition-opacity duration-200 group-hover:opacity-100">
   //                   <ChevronLeft className={"size-5 transition-transform duration-150" + (cardTaskMenu ? " rotate-180" : "rotate-0")} />
   //                </Button>
   //                <div className={" flex gap-1 transition-all duration-200" + (cardTaskMenu ? " opacity-100 px-2" : " hidden opacity-0")}>
   //                   <Button variant="ghost" className={"relative font-bold text-gray-400 hover:text-yellow-600 p-0" + (cardTaskMenu ? " " : "")}><Pen strokeWidth="3px"></Pen></Button>
   //                   <Button variant="ghost" className={"relative font-bold text-gray-400 hover:text-gray-600 p-0" + (cardTaskMenu ? " " : "")}><Copy strokeWidth="3px"></Copy></Button>
   //                   <Button variant="ghost" className={"relative font-bold text-gray-400 hover:text-red-600 p-0" + (cardTaskMenu ? " " : "")}><Trash strokeWidth="3px"></Trash></Button>
   //                </div>

   //             </div> 
   //             */}


   //          {/* Footer */}
   //          <div className="flex items-center justify-between border-t border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500">
   //             <div className="flex items-center gap-2">
   //                <span className={`h-2 w-2 rounded-full  ${colorMap[data.color as keyof typeof colorMap] || "bg-gray-300"}`} />
   //             </div>
   //             <div className="flex items-center gap-2">
   //                <CalendarDays className="size-4" />
   //                <span>{data.updatedAt.split("T")[0]}</span>
   //             </div>
   //          </div>

   //       </div>
   //    </div>
   // )


   return (
  <div
    ref={setNodeRef}
    style={style}
    className={`group relative flex min-h-56 flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
      isDragging ? "cursor-grabbing shadow-xl" : ""
    }`}
  >
    {/* Status Line */}
    <div
      className={`h-1.5 w-full ${
        colorMap[data.color as keyof typeof colorMap] ?? "bg-gray-300"
      }`}
    />

    {/* Action Menu */}
    <div className="absolute right-4 top-4 z-10 flex items-center">
      <Button
        onClick={() => setCardTaskMenu((prev) => !prev)}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full border border-gray-200 bg-white opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100"
      >
        <ChevronLeft
          className={`size-4 transition-transform duration-300 ${
            cardTaskMenu ? "rotate-180" : ""
          }`}
        />
      </Button>

      <div
        className={`ml-2 flex items-center gap-1 overflow-hidden transition-all duration-300 ${
          cardTaskMenu
            ? "max-w-40 opacity-100"
            : "max-w-0 opacity-0"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-yellow-500"
        >
          <Pen className="size-4" strokeWidth={2.5} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-slate-600"
        >
          <Copy className="size-4" strokeWidth={2.5} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-600"
        >
          <Trash className="size-4" strokeWidth={2.5} />
        </Button>
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-1 gap-3 p-4">
      {/* Drag Handle */}
      <GripVertical
        {...attributes}
        {...listeners}
        className={`mt-1 shrink-0 text-gray-300 transition-colors hover:text-gray-500 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      />

      <div className="flex-1 min-w-0 pr-16">
        <h3 className="truncate text-lg font-semibold text-gray-800">
          {data.title}
        </h3>

        <p className="mt-3 line-clamp-5 text-sm leading-6 text-gray-500">
          {data.des || "No description"}
        </p>
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between border-t bg-gray-50 px-4 py-3 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            colorMap[data.color as keyof typeof colorMap] ?? "bg-gray-300"
          }`}
        />
      </div>

      <div className="flex items-center gap-2">
        <CalendarDays className="size-4" />
        <span>{data.updatedAt.split("T")[0]}</span>
      </div>
    </div>
  </div>
);
}




