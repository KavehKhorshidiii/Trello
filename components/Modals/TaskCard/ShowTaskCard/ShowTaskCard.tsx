"use client";


import { CalendarDays, X } from "lucide-react";
import { Button } from "@/components/ui/button";


// types
type PropsType = {
  TaskCardData: {
    board: string;
    color: string;
    column: string;
    createdAt: string;
    des: string;
    title: string;
    updatedAt: string;
    _id: string;
  };
  setShowTaskCard: (value: boolean) => void;
};


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


export default function ShowTaskCard({TaskCardData,setShowTaskCard,}: PropsType) {
  return (
    <div onClick={() => setShowTaskCard(false)} className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-5 animate-in fade-in duration-200">
      <div onClick={(e) => e.stopPropagation()} className="animate-in zoom-in-95 duration-200 w-full sm:max-w-2/3 overflow-hidden rounded-2xl bg-white shadow-2xl" >

        {/* Top Color */}
        <div className={`h-5 ${ colorMap[ TaskCardData.color as keyof typeof colorMap ] || "bg-gray-300" }`} />

        {/* Header */}
        <div className="flex items-start justify-between p-6">
          <div>
            <h2 className=" text-xl sm:text-2xl font-bold text-gray-800"> {TaskCardData.title}</h2>
            <p className="mt-2 text-sm text-gray-400"> Task Details </p>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setShowTaskCard(false)} className="rounded-full hover:bg-red-50 " > <X /> </Button>
        </div>

        {/* Description */}
        <div className="px-6 pb-6"> <div className="rounded-xl border bg-gray-50 p-5">
            <h3 className="mb-4 font-semibold text-gray-700"> Description </h3>
            <p className="max-h-72 text-justify text-lg sm:text-xl overflow-y-auto leading-8 text-gray-600"> {TaskCardData.des || "No description"} </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex sm:flex-row flex-col items-center justify-between border-t bg-gray-50 px-6 py-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4" />
            <span> Created : {TaskCardData.createdAt.split("T")[0]} </span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="size-4" />
            <span> Updated : {TaskCardData.updatedAt.split("T")[0]} </span>
          </div>

        </div>

      </div>
    </div>
  );
}