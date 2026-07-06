'use client'


// imports
import CardTaskModal from '@/components/Modals/TaskModal/cardTaskModal'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query'
import Navbar from '@/components/Navbar/navbar'
import ColumnModal from '@/components/Modals/ColumnModal/columnModal'
import EditBoardModal from '@/components/Modals/editBoardModal/editBoardModal';
import BoardColumn from '@/components/BoardColumn/BoardColumn'
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"; // dnd
import { DndContext, useSensors, PointerSensor, DragEndEvent, useSensor } from "@dnd-kit/core";  // dnd
import Spinner from '@/components/spinner/spinner';


// types
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
type BoardType = {
   _id: string
   title: string,
   board: string,
   order:number,
   __v:number
}


export default function Board() {


   const [cardTaskModal, setCardTaskModal] = useState(false) // Card Task Modal
   const [isModalColumn, setIsModalColumn] = useState(false) // Column Modal
   const [editBoardData, setEditBoardData] = useState(false) // Edit Board Modal
   const params = useParams(); const boardId = params.id as string ?? "" // Board ID
   const [selectColumnId, setSelectedColumnId] = useState<string>("") // Column ID


   // - BOARDS -
   // Fetch Board Data
   async function fetchBoardData() {
      const res = await fetch(`/api/boards/${boardId}`)
      return res.json()
   }
   const { data: boardData } = useQuery({
      queryKey: ["boards"],
      queryFn: fetchBoardData
   })


   // - COLUMNS -
   // Fetch Columns Data
   async function fetchColumns() {
      const res = await fetch(`/api/column/${boardId}`)
      return res.json()
   }
   const { data: columnsData , isPending:ColumnsPending } = useQuery({
      queryKey: ["columns"],
      queryFn: fetchColumns
   })
   // Update -> Columns Reorder
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


   // - TASK CARD -
   // Fetch TaskCard
   async function fetchTask() {
      const res = await fetch(`/api/task/${boardId}`)
      return res.json()
   }
   const { data: Task } = useQuery({
      queryKey: ["tasks"],
      queryFn: fetchTask
   })
   // Update -> CardTask Reorder
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


   // - COPY DATA -
   // Columns
   const [columns, setColumns] = useState<ColType[]>([]); // Columns State 
   const displayColumns = columns.length > 0 ? columns : (columnsData ?? []); // Display Columns
   // Task
   const [tasks, setTasks] = useState<CardType[]>([]); // TaskCard State
   const displayTasks = tasks.length > 0 ? tasks : (Task?.data?.Tasks ?? []); // Display Tasks

   
   // - DRAG AND DROP -
   // handleDragEnd Function
   function handleDragEnd(event: DragEndEvent) {

      const { active, over } = event; // Active & Over
      if (!over || active.id === over.id) return;
      const activeType = active.data.current?.type;

      // REORDER COLUMN
      if (activeType === "column") {
         const currentColumns: ColType[] = columns.length > 0 ? columns : (columnsData ?? []);
         const oldIndex: number = currentColumns.findIndex((col => col._id === active.id));
         const newIndex: number = currentColumns.findIndex((col => col._id === over.id));
         const newColumns = arrayMove(currentColumns, oldIndex, newIndex);
         const sortColumn = newColumns.map((col, index) => ({ ...col, order: index }))
         setColumns(sortColumn);
         updateColumns.mutate(sortColumn);
      }

      // CARD TASK
      const currentTasks: CardFuncType[] = tasks.length > 0 ? tasks : (Task?.data?.Tasks || []);
      const activeTask = currentTasks.find(t => t._id === active.id);
      const overTask = currentTasks.find(t => t._id === over.id);
      if (!activeTask) return;
      const overData = event.over?.data?.current;

      // MOVE BETWEEN COLUMNS
      if (activeType === "task") {
         const fromColumn = activeTask.column;
         const toColumn = overData?.type === "column" ? over.id : overTask?.column;
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
   // dnd sensors
   const sensors = useSensors(
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

               {/* Stats bar & Add New Column */}
               <div className="flex items-center gap-6 px-6 py-8  border-gray-100">
                  {/* Stats bar */}
                  <span className="text-sm text-gray-600"> Total Tasks: <strong className="text-gray-800">{displayTasks.length}</strong></span>

                  {/*  Add New Column */}
                  <div className="ml-auto">
                     <button onClick={() => setIsModalColumn(true)} className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <Plus className=' size-4'></Plus>
                        Create new Column
                     </button>
                  </div>
               </div>

               {/* Columns */}
               <main className=" flex overflow-x-auto w-full ">
                  <div className="flex flex-col w-full sm:flex-row gap-4 px-6">
                     <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                        <SortableContext strategy={horizontalListSortingStrategy} items={displayColumns.map((col: CardType) => col._id)} >
                           {
                              ColumnsPending ? <div className='w-full'><Spinner /></div> :
                              displayColumns?.map((col: BoardType) => (
                                 <BoardColumn tasks={displayTasks.filter((task: CardFuncType) => task.column === col._id)} key={col._id} boardData={col} cardTaskModal={cardTaskModal} setCardTaskModal={setCardTaskModal} setSelectedColumnId={setSelectedColumnId} ></BoardColumn>
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