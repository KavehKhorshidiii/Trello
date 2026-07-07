"use client";


// imports
import { TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/spinnerComponent/spinner";


// types
type ColDataType = {
   _id: string
   title: string;
   board: string;
   order: number;
   __v: number
}
type Props = {
   setDeleteColModal: (value: boolean) => void;
   colData: ColDataType;
};


export default function DeleteColModal({ setDeleteColModal, colData }: Props) {


   const queryClient = useQueryClient();

   // Delete Column
   const DeleteCol = useMutation({
      mutationFn: async (colData: string) => {
         const res = await fetch(`/api/column/${colData}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", },
         });
         if (!res.ok) { throw new Error("Failed to delete board") }
         setDeleteColModal(false)
         return res.json();
      },

      onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["columns"] }); },
   }
   );


   return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
         <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
               <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-600 p-2"><TriangleAlert className="h-5 w-5 text-white" /></div>
                  <h2 className="text-lg font-semibold">Delete Columns</h2>
               </div>
               <button onClick={() => setDeleteColModal(false)} className="rounded-md p-1 transition hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>

            {/* Body */}
            <div className="space-y-3 px-5 py-6">
               <p className="text-gray-700">Are you sure you want to delete <span className="font-semibold">{colData.title}</span>?</p>
               <p className="text-sm text-gray-500">This action cannot be undone.</p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t px-5 py-4">
               <Button disabled={DeleteCol.isPending} onClick={() => setDeleteColModal(false)} variant="outline">Cancel</Button>
               <Button disabled={DeleteCol.isPending} onClick={() => DeleteCol.mutate(colData._id)} className="bg-red-600 text-white hover:bg-red-700" variant="destructive">{DeleteCol.isPending ? <Spinner /> : "Delete"}</Button>
            </div>

         </div>
      </div>
   );
}