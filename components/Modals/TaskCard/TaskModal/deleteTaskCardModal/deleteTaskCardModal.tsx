"use client";


// imports
import { TriangleAlert, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/spinnerComponent/spinner";


// types
type taskCardDataType = {
   id: string
   title: string;
}
type Props = {
   setDeleteCardTaskModal: (value: boolean) => void;
   TaskCardData: taskCardDataType;
};


export default function DeleteTaskCardModal({ setDeleteCardTaskModal, TaskCardData }: Props) {

   const queryClient = useQueryClient();

   const { mutate: deleteCard, isPending } = useMutation({
      mutationFn: async (id: string) => {
         console.log(id)
         const res = await fetch(`/api/task/${id}`, {
            method: "DELETE",
         });

         if (!res.ok) {
            throw new Error("Delete failed");
         }

         return res.json();
      },

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
   });


   return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
         <div className=" w-5/6 sm:w-96 max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
               <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-600 p-2"><TriangleAlert className="h-5 w-5 text-white" /></div>
                  <h2 className="text-lg font-semibold">Delete Task Card</h2>
               </div>
               <button onClick={() => setDeleteCardTaskModal(false)} className="rounded-md p-1 transition hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>

            {/* Body */}
            <div className="space-y-3 px-5 py-6">
               <p className="text-gray-700">Are you sure you want to delete <span className="font-semibold">{TaskCardData.title}</span>?</p>
               <p className="text-sm text-gray-500">This action cannot be undone.</p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t px-5 py-4">
               <Button disabled={isPending} onClick={() => setDeleteCardTaskModal(false)} variant="outline">Cancel</Button>
               <Button disabled={isPending} onClick={() => deleteCard(TaskCardData.id)} className="bg-red-600 text-white hover:bg-red-700" variant="destructive">{isPending ? <Spinner /> : "Delete"}</Button>
            </div>

         </div>
      </div>
   );
}