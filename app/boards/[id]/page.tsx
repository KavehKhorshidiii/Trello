'use client'
import CardModal from '@/components/Modals/TaskModal/taskModal'
import { CardContent, CardHeader } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query'
import Navbar from '@/components/navbar'
import ColumnModal from '@/components/Modals/ColumnModal/columnModal'
import BoardColumn from '@/components/BoardColumn/BoardColumn'

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { DndContext, useSensors, PointerSensor, useSensor } from "@dnd-kit/core";



type CardType = {
   board: string,
   color: string,
   createdAt: string,
   title: string,
   des: string,
   updatedAt: string,
   _id: string
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
type ColType = {
   _id: string
   title: string,
   board: string,
   order: number,
   __v: number
}




export default function Board() {

   const params = useParams();
   const boardId = params.id as string ?? ""
   const [isModalColumn, setIsModalColumn] = useState(false)
   const [isCardModal, setIsCardModal] = useState(false)
   const [selectColumnId, setSelectedColumnId] = useState<string>("")


   // fetch Board Data
   async function fetchBoardData() {
      const res = await fetch(`/api/boards/${boardId}`)
      return res.json()
   }
   const { data: boardData, isPending } = useQuery({
      queryKey: ["board"],
      queryFn: fetchBoardData
   })
   // fetch Task Data
   async function fetchCards() {
      const res = await fetch(`/api/task/${boardId}`)
      return res.json()
   }
   const { data: cardData } = useQuery({
      queryKey: ["cards"],
      queryFn: fetchCards
   })
   // fetch columns
   async function fetchColumns() {
      const res = await fetch(`/api/column/${boardId}`)
      return res.json()
   }
   const { data: columnsData } = useQuery({
      queryKey: ["columns"],
      queryFn: fetchColumns
   })
   // fetch task
   async function fetchTask() {
      const res = await fetch(`/api/task/${boardId}`)
      return res.json()
   }
   const { data: Task } = useQuery({
      queryKey: ["tasks"],
      queryFn: fetchTask
   })

   // update Columns
   const ReorderColumn = async (columns: ColType[]) => {
      const res = await fetch('/api/column/reorder', {
         method: "PATCH",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(columns)
      })
   }
   const updateColumns = useMutation({
      mutationFn: ReorderColumn,
   });
   // update CardTask
   const ReorderTaskCard = async (tasks: CardType[]) => {
      const res = await fetch('/api/task/reorder', {
         method: "PATCH",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(tasks)
      })
   }
   const updateTaskCard = useMutation({
      mutationFn: ReorderTaskCard,
   });



   const [columns, setColumns] = useState<ColType[]>([]); // <- show Columns 
   const displayColumns = columns.length > 0 ? columns : (columnsData ?? []);

   const [tasks, setTasks] = useState<CardType[]>([]); // <- show Columns
   const displayTasks = tasks.length > 0 ? tasks : (Task?.data?.Tasks ?? []);


   function handleDragEnd(event: DragEndEvent) {

      const { active, over } = event;
      if (!over) return;
      if (active.id === over.id) return;
      const activeType = active.data.current?.type;




      //REORDER Columns ✅
      if (activeType === "column") {
         console.log("object")
         const currentColumns: ColType[] = columns.length > 0 ? columns : (columnsData ?? []);
         console.log(currentColumns)
         const oldIndex: number = currentColumns.findIndex((col => col._id === active.id));
         const newIndex: number = currentColumns.findIndex((col => col._id === over.id));
         const newColumns = arrayMove(currentColumns, oldIndex, newIndex);
         const sortColumn = newColumns.map((col, index) => ({ ...col, order: index }))
         setColumns(sortColumn);
         updateColumns.mutate(sortColumn);
      }





      const currentTasks: CardFuncType[] = tasks.length > 0 ? tasks : (Task?.data?.Tasks || []);
      const activeTask = currentTasks.find(t => t._id === active.id);
      const overTask = currentTasks.find(t => t._id === over.id);
      if (!activeTask) return;


      // MOVE BETWEEN COLUMNS
      if (activeType === "task") {
         const fromColumn = activeTask.column;
         const toColumn = overTask?.column;
         if (toColumn && fromColumn !== toColumn) {
            const movedTasks = currentTasks.map(task => {
               if (task._id === active.id) {
                  return {
                     ...task,
                     column: toColumn,
                  };
               }
               return task;
            });

            setTasks(movedTasks);
            updateTaskCard.mutate(movedTasks);
            return;
         }
      }





      // REORDER CARD-TASK IN COLUMN
      const oldIndex = currentTasks.findIndex(t => t._id === active.id);
      const newIndex = currentTasks.findIndex(t => t._id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const reordered = arrayMove(currentTasks, oldIndex, newIndex);

      const sorted = reordered.map((task, index) => ({
         ...task,
         order: index,
      }));

      setTasks(sorted);
      updateTaskCard.mutate(sorted);



   }




   const sensors = useSensors(
      useSensor(PointerSensor, {
         activationConstraint: {
            distance: 5,
         },
      })
   );




   return (
      <div className=' min-h-screen bg-white'>


         {/* Card Modal */}
         {isCardModal && <CardModal params={{ ColumnId: selectColumnId, BoardId: boardId }} isCardModal={isCardModal} setIsCardModal={setIsCardModal} />}
         {/* Column Modal */}
         {isModalColumn && <ColumnModal params={boardId} isModalColumn={isModalColumn} setIsModalColumn={setIsModalColumn} />}


         <Navbar boardTitle={boardData?.[0].title} ></Navbar>



         <div className=' flex justify-center'>

            <div className=' container flex justify-between flex-col '>

               {/* ── Stats bar ── */}
               <div className="flex items-center gap-6 px-6 py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">
                     Total Tasks: <strong className="text-gray-800">{"2"}</strong>
                  </span>
                  <span className="text-sm text-gray-600">
                     Completed: <strong className="text-gray-800">{"1"}</strong>
                  </span>
                  <span className="text-sm text-gray-600">
                     In Progress: <strong className="text-gray-800">{"3"}</strong>
                  </span>

                  {/* Add Task – pushed to the right */}
                  <div className="ml-auto">
                     <button className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                           <line x1="12" y1="5" x2="12" y2="19" />
                           <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Task
                     </button>
                  </div>
               </div>

               {/* ── Kanban board ── */}
               <main className=" flex overflow-x-auto">
                  <div className="flex gap-4 p-6 w-max">
                     <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                        <SortableContext strategy={horizontalListSortingStrategy} items={displayColumns.map((col: CardType) => col._id)} >
                           {
                              displayColumns?.map((col: CardType) => (
                                 <BoardColumn tasks={displayTasks.filter((task: CardFuncType) => task.column === col._id)} key={col._id} boardData={col} isCardModal={isCardModal} setIsCardModal={setIsCardModal} setSelectedColumnId={setSelectedColumnId} ></BoardColumn>
                              ))
                           }
                        </SortableContext>
                     </DndContext>

                     {/* add column */}
                     <Card onClick={() => setIsModalColumn(true)} className=" group w-[300px] h-52  border-2  border-dashed border-gray-300 hover:border-blue-400 cursor-pointer">
                        <CardContent className="flex  group-hover:text-blue-600 flex-col items-center justify-center h-full">
                           <Plus className="size-8 " />
                           <p className="text-gray-600  group-hover:text-blue-600 font-medium">Create new Column</p>
                        </CardContent>
                     </Card>
                  </div>



               </main>

            </div>

         </div>


      </div>
   )


}