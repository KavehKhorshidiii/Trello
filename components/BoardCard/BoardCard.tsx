"use client";


// imports
import Link from "next/link";
import { isNewBoard } from "../CreateBoardCard/isNewBoard";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import DeleteBoardModal from "../Modals/BoardModal/deleteBoardModal/deleteBoardModal";
import EditBoardModal from "../Modals/editBoardModal/editBoardModal";
import { Button } from "../ui/button";




// icons
import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";

// icons
import {
   Ellipsis,
   Pencil,
   Palette,
   Trash2,
} from "lucide-react";


// types
type Board = {
   _id: string;
   title: string;
   des: string;
   color?: string;
   createdAt: string;
   updatedAt: string;
};
type Props = {
   board: Board;
   viewMode: "grid" | "list";
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


export default function BoardCard({ board, viewMode }: Props) {


   const [now] = useState(() => Date.now()); // date
   const isNew = isNewBoard(board.createdAt, now); // date
   const [menuOpen, setMenuOpen] = useState(false) // menu 
   const [deleteBoardModal, setDeleteBoardModal] = useState(false) // add new board modal
   const [editBoardData, setEditBoardData] = useState(false) // edit board data


   // Ellipsis Button Handler
   const MenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setMenuOpen(!menuOpen);
   }


   return (
      <div>

         {/* delete board modal */}
         {deleteBoardModal && (<DeleteBoardModal boardData={board} setDeleteBoardModal={setDeleteBoardModal} />)}
         {/* Edit Board Data Modal */}
         {editBoardData && <EditBoardModal setEditBoardData={setEditBoardData} boardId={board._id} />}

         {/* link */}
         <Link href={`/boards/${board._id}`} className="h-full" >
            <Card className={"group cursor-pointer  transition-all h-52 duration-300 hover:-translate-y-2 hover:shadow-xl " + (viewMode === "list" ? "h-48 p-7 flex flex-col gap-2" : "")}>

               {/* Header */}
               <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">

                     <div className={`h-3 w-3 rounded-full ${colorMap[board.color as keyof typeof colorMap] || "bg-gray-300"}`} />

                     <div onClick={MenuHandler} className={`hover:text-gray-600 transition-all duration-200 flex flex-col relative px-2 items-center`} >
                        <Button variant="ghost" size="icon" className={`opacity-0 transition-opacity group-hover:opacity-100` + ( menuOpen ? " bg-gray-100 rounded-sm opacity-100" : "" ) }> <Ellipsis /></Button>
                        {
                           isNew && (<Badge variant="secondary" className="text-xs top-full absolute"> New </Badge>)
                        }
                        {
                           <div className={"absolute right-0 top-full w-48 rounded-lg border bg-white shadow-lg" + (menuOpen ? " opacity-100 visible" : " invisible opacity-0")}>
                              <button onClick={() => setEditBoardData(true)} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100"><Pencil className="h-4 w-4" />Edit Board</button><hr />
                              <button onClick={() => setDeleteBoardModal(true)} className="flex w-full items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" />Delete Board</button>
                           </div>
                        }
                     </div>

                  </div>
               </CardHeader>

               {/* Content */}
               <div className={"p-4 flex flex-col justify-between sm:px-6 sm:py-0 flex-1"}>
                  {/* title */}
                  <CardTitle className="text-base  sm:text-lg  group-hover:text-blue-600 transition-colors">{board.title}</CardTitle>

                  {/* Description */}
                  <CardDescription className="text-sm  line-clamp-2">{board.des}</CardDescription>

                  {/* Dates */}
                  <div className="flex flex-col  sm:flex-row sm:justify-between text-xs text-gray-500 gap-1">
                     <span>Created: {new Date(board.createdAt).toLocaleDateString()}</span>
                     <span>Updated: {new Date(board.updatedAt).toLocaleDateString()}</span>
                  </div>
               </div>

            </Card>
         </Link>

      </div>

   );
}