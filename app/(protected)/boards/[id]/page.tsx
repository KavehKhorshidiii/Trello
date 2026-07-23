'use client'


import CardTaskModal from '@/components/Modals/TaskCard/TaskModal/cardTaskModal'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Navbar from '@/components/navbarComponent/navbar'
import ColumnModal from '@/components/Modals/Column/ColumnModal/columnModal'
import EditBoardModal from '@/components/Modals/Board/editBoardModal/editBoardModal';
import BoardColumn from '@/components/columnComponent/BoardColumn'
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"; // dnd
import { DndContext, useSensors, PointerSensor, TouchSensor, DragEndEvent, useSensor } from "@dnd-kit/core";  // dnd
import Spinner from '@/components/spinnerComponent/spinner';


// types
type CardType = {
   board: string,
   color: string,
   column: string,
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

type TaskResponse = {
   data?: {
      Tasks?: CardType[]
   }
}


export default function Board() {

   const [cardTaskModal, setCardTaskModal] = useState(false) // Card Task Modal
   const [isModalColumn, setIsModalColumn] = useState(false) // Column Modal
   const [editBoardData, setEditBoardData] = useState(false) // Edit Board Modal
   const params = useParams(); const boardId = params.id as string ?? "" // Board ID
   const [selectColumnId, setSelectedColumnId] = useState<string>("") // Column ID

   const queryClient = useQueryClient()


   // - BOARDS -
   // Fetch Board Data
   async function fetchBoardData() {
      const res = await fetch(`/api/boards/${boardId}`)
      return res.json()
   }
   const { data: boardData } = useQuery({
      queryKey: ["board", boardId],
      queryFn: fetchBoardData,
      enabled: !!boardId,
   })


   // - COLUMNS -
   // Fetch Columns Data
   async function fetchColumns() {
      const res = await fetch(`/api/columns/${boardId}`)
      return res.json()
   }
   const { data: columnsData, isPending: ColumnsPending } = useQuery<ColType[]>({
      queryKey: ["columns", boardId],
      queryFn: fetchColumns,
      enabled: !!boardId,
   })
   // Update -> Columns Reorder
   const ReorderColumn = async (columns: ColType[]) => {
      await fetch('/api/columns/reorder', {
         method: "PATCH",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(columns)
      })
   }
   const updateColumns = useMutation({
      mutationFn: ReorderColumn,
   });


   // - TASK CARD -
   // Fetch TaskCard
   async function fetchTask() {
      const res = await fetch(`/api/taskCards/${boardId}`)
      return res.json()
   }
   const { data: Task} = useQuery<TaskResponse>({
      queryKey: ["tasks", boardId],
      queryFn: fetchTask,
      enabled: !!boardId,
   })
   // Update -> CardTask Reorder
   const ReorderTaskCard = async (tasks: CardType[]) => {
      await fetch('/api/taskCards/reorder', {
         method: "PATCH",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(tasks)
      })
   }
   const updateTaskCard = useMutation({
      mutationFn: ReorderTaskCard,
   });


   // - DISPLAY DATA -
   const displayColumns: ColType[] = columnsData ?? [];
   const displayTasks: CardType[] = Task?.data?.Tasks ?? [];


   // - DRAG AND DROP -
   // handleDragEnd Function
   function handleDragEnd(event: DragEndEvent) {

      const { active, over } = event; // Active & Over
      if (!over || active.id === over.id) return;
      const activeType = active.data.current?.type;

      // REORDER COLUMN
      if (activeType === "column") {
         const currentColumns: ColType[] = columnsData ?? [];
         const oldIndex: number = currentColumns.findIndex((col) => col._id === active.id);
         const newIndex: number = currentColumns.findIndex((col) => col._id === over.id);
         const newColumns = arrayMove(currentColumns, oldIndex, newIndex);
         const sortColumn = newColumns.map((col, index) => ({ ...col, order: index }))


         queryClient.setQueryData(["columns", boardId], sortColumn);
         updateColumns.mutate(sortColumn);
         return;
      }

      // CARD TASK
      const currentTasks: CardType[] = Task?.data?.Tasks ?? [];
      const activeTask = currentTasks.find(t => t._id === active.id);
      const overTask = currentTasks.find(t => t._id === over.id);
      if (!activeTask) return;
      const overData = event.over?.data?.current;

      // MOVE BETWEEN COLUMNS
      if (activeType === "task") {
         const fromColumn = activeTask.column;
         const toColumn = overData?.type === "column" ? (over.id as string) : overTask?.column;
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

            queryClient.setQueryData(["tasks", boardId], { data: { Tasks: movedTasks } });
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

      queryClient.setQueryData(["tasks", boardId], { data: { Tasks: sorted } });
      updateTaskCard.mutate(sorted);
   }


   // dnd sensors
   const sensors = useSensors(
      useSensor(TouchSensor, {
         activationConstraint: {
            delay: 250,
            tolerance: 8,
         },
      }),
      useSensor(PointerSensor, {
         activationConstraint: {
            distance: 5,
         },
      })
   );


   return (
      <div className=' min-h-screen bg-gray-50'>

         {/* Navbar */}
         <Navbar editBoardData={setEditBoardData} boardTitle={boardData?.boardData?.[0]?.title} ></Navbar>


         {/* MODALS */}

         {/* Column Modal */}
         {isModalColumn && <ColumnModal params={boardId} isModalColumn={isModalColumn} setIsModalColumn={setIsModalColumn} />}
         {/* CardTask Modal */}
         {cardTaskModal && <CardTaskModal columnId={selectColumnId} boardId={boardId} setCardTaskModal={setCardTaskModal} />}
         {/* Edit Board Data Modal */}
         {editBoardData && <EditBoardModal setEditBoardData={setEditBoardData} boardId={boardId} />}


         <div className=' flex justify-center'>
            <div className=' container flex justify-between flex-col '>
               {/* Stats bar & Add New Column button */}
               <div className="flex items-center px-5 gap-6 pt-7  border-gray-100">
                  {/* Stats bar */}
                  <span className="text-sm text-gray-600"> Total Tasks: <strong className="text-gray-800">{displayTasks.length}</strong></span>

                  {/*  Add New Column */}
                  <div className="ml-auto">
                     <button onClick={() => setIsModalColumn(true)} className="flex items-center gap-2 bg-gray-900 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <Plus className=' size-4'></Plus>
                        Create new Column
                     </button>
                  </div>
               </div>

               {/* Columns */}
               <main className=" flex overflow-x-auto w-full ">
                  <div className="flex flex-col w-full sm:flex-row gap-4 px-5 py-7">
                     <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                        <SortableContext strategy={horizontalListSortingStrategy} items={displayColumns.map((col) => col._id)} >
                           {
                              ColumnsPending ? <div className='w-full'><Spinner /></div> :
                                 displayColumns.map((col) => (
                                    <BoardColumn tasks={displayTasks.filter((task) => task.column === col._id)} key={col._id} ColData={col} cardTaskModal={cardTaskModal} setCardTaskModal={setCardTaskModal} setSelectedColumnId={setSelectedColumnId} ></BoardColumn>
                                 ))
                           }
                        </SortableContext>
                     </DndContext>
                  </div>
               </main>

            </div>
         </div>

      </div>
   )

}
