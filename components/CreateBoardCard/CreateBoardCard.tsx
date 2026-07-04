"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";


// Open Board Modal
export default function CreateBoardCard({ onClick }:{onClick: () => void}) {
   return (
      <Card onClick={onClick} className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-lg">
         <CardContent className="p-6 flex flex-col items-center justify-center min-h-[160px]">

            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group-hover:bg-blue-600 transition-colors">
               <Plus className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">Create new board</p>

            <p className="text-xs text-gray-400 mt-1 text-center">Start organizing your work</p>

         </CardContent>
      </Card>
   )
}