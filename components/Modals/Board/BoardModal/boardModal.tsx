"use client";

import { X } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import BoardModalAction from "./boardModalAction";
import Colors from "@/components/colorsComponent/Colors";
import { useState } from "react";
import Spinner from "@/components/spinnerComponent/spinner";


export default function BoardModal({ addBoardModal, setAddBoardModal }: { addBoardModal: boolean; setAddBoardModal: (value: boolean) => void; }) {


   const [state, formAction, pending] = useActionState(BoardModalAction, { success: null, errors: {}, message: "", });
   const queryClient = useQueryClient();
   const [color, setColor] = useState("");


   // close modal + refresh boards
   useEffect(() => {
      if (state.success) {
         setAddBoardModal(false);
         queryClient.invalidateQueries({ queryKey: ["boards"] });
      }
   }, [state.success , queryClient , setAddBoardModal]);


   // close on ESC
   useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
         if (e.key === "Escape") setAddBoardModal(false);
      };

      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
   }, [setAddBoardModal]);


   if (!addBoardModal) return null;


   return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">

         <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
               <h2 className="text-sm font-medium text-gray-900">Create Board</h2>
               <button onClick={() => setAddBoardModal(false)} className="text-gray-500 hover:text-gray-700 transition"><X size={18} /></button>
            </div>

            {/* Form */}
            <form action={formAction} className="flex flex-col gap-4 p-4">

               {/* Title */}
               <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Title</label>
                  <input name="title" minLength={1} maxLength={30} placeholder="Enter board title" className="border rounded px-3 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
               </div>

               {/* Description */}
               <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-600">Description</label>
                  <input name="des" maxLength={60} placeholder="Short description..." className="border rounded px-3 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
               </div>

               {/* Color */}
               <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-600">Color</label>
                  <input type="hidden" name="color" value={color} />
                  <Colors setColor={setColor} />
               </div>

               {/* Actions */}
               <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setAddBoardModal(false)} className="px-3 py-1.5 text-sm border rounded hover:bg-gray-50 transition">Cancel</button>
                  <button type="submit" disabled={pending} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50" >{pending ? <Spinner /> : "Create"}</button>
               </div>

            </form>

         </div>
      </div>
   );
}