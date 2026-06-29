// 'use client'
// import CardModal from '@/components/Modals/TaskModal/taskModal'
// import { Button } from '@/components/ui/button'
// import { CardContent, CardHeader } from '@/components/ui/card'
// import { Badge, CircleCheck, MoreHorizontal, Plus } from 'lucide-react'
// import { useState } from 'react'
// import { Card } from "@/components/ui/card"
// import { useParams } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query'
// import Navbar from '@/components/navbar'
// import ColumnModal from '@/components/Modals/ColumnModal/columnModal'



// type CardType = {
//    board: string,
//    color: string,
//    createdAt: string,
//    title: string,
//    des: string,
//    updatedAt: string,
//    _id: string
// }


// export default function Board() {

//    const params = useParams();
//    const boardId = params.id as string ?? ""
//    const [isModal, setIsModal] = useState(false)
//    const [isModalColumn, setIsModalColumn] = useState(false)

//    // fetch Board Data
//    async function fetchBoardData() {
//       const res = await fetch(`/api/boards/${boardId}`)
//       return res.json()
//    }
//    const { data: boardData, isPending } = useQuery({
//       queryKey: ["board"],
//       queryFn: fetchBoardData
//    })

//    // fetch Task Data
//    async function fetchCards() {
//       const res = await fetch(`/api/task/${boardId}`)
//       return res.json()
//    }
//    const { data: cardData } = useQuery({
//       queryKey: ["cards"],
//       queryFn: fetchCards
//    })

//    // fetch columns
//    async function fetchColumns() {
//       const res = await fetch(`/api/column/${boardId}`)
//       return res.json()
//    }
//    const { data: Columns } = useQuery({
//       queryKey: ["columns"],
//       queryFn: fetchColumns
//    })



//    // function Column() {
//    //    return (
//    //       <div>
//    //          <div>
//    //             {/* column Header */}
//    //             <div>
//    //                <div>
//    //                   <div>
//    //                      <h3>column title name</h3>
//    //                      <Badge></Badge>
//    //                   </div>
//    //                </div>
//    //             </div>
//    //          </div>
//    //       </div>
//    //    )
//    // }

//    return (
//       <div className='  px-4 py-3 sm:py-4 flex flex-col min-h-screen bg-gray-50'>


//          {/* Card Modal */}
//          {isModal && <CardModal params={boardId} isModal={isModal} setIsModal={setIsModal} />}
//          {/* Column Modal */}
//          {isModalColumn && <ColumnModal params={boardId} isModalColumn={isModalColumn} setIsModalColumn={setIsModalColumn} />}


//          <div>
//             <Navbar boardTitle={boardData?.[0].title} ></Navbar>

//             {/* content */}
//             <main className=' flex border-8 flex-col container mx-auto px-2 sm:px-4 py-4 sm:py-6'>

//                <Button onClick={() => setIsModal(true)} className="w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Task </Button>

//                <div className=' sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0'>
//                   {/* <div className=' flex-wrap items-center gap-4 sm:gap-6'> */}

//                   <div className=' text-sm text-gray-600 '>
//                      <span className=' font-medium'>Total Task:0</span>
//                      {/* Columns */}
//                      <Button onClick={() => setIsModalColumn(true)} className="w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Column </Button>
//                   </div>


//                   <div className="overflow-x-auto flex-1">
//                      <div className="flex flex-row gap-4 min-w-max">

//                         {Columns?.map((Col: CardType) => (
//                            <div
//                               key={Col._id}
//                               className="flex flex-col w-96  overflow-y-auto rounded-2xl bg-gray-300 p-4 "
//                            >

//                               {/* header */}
//                               <div className="flex justify-between mb-4">
//                                  <p className="font-semibold text-sm truncate text-gray-900">
//                                     {Col.title}
//                                  </p>

//                                  <Button variant="ghost" size="sm">
//                                     <MoreHorizontal />
//                                  </Button>
//                               </div>

//                               {/* tasks */}
//                               <div className="flex flex-col gap-y-2 ">
//                                  <p className="p-2 w-full overflow-auto h-60 wrap-break-word whitespace-normal rounded-2xl bg-white">
//                                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, cumque.
//                                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, cumque.
//                                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, cumque.
//                                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, cumque.
//                                  </p>


//                               </div>

//                            </div>
//                         ))}

//                         {/* add column */}
//                         <Card
//                            onClick={() => setIsModalColumn(true)}
//                            className="w-96 border-2 h-[700px] border-dashed border-gray-300 hover:border-blue-400 cursor-pointer"
//                         >
//                            <CardContent className="flex flex-col items-center justify-center h-full">
//                               <Plus className="size-8 group-hover:text-blue-600" />
//                               <p className="text-gray-600 font-medium">
//                                  Create new Column
//                               </p>
//                            </CardContent>
//                         </Card>

//                      </div>
//                   </div>






//                </div>
//             </main>


//          </div>




//       </div >
//    )
// }



'use client'
import CardModal from '@/components/Modals/TaskModal/taskModal'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader } from '@/components/ui/card'
import { Badge, CircleCheck, MoreHorizontal, Plus } from 'lucide-react'
import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/navbar'
import ColumnModal from '@/components/Modals/ColumnModal/columnModal'
import BoardColumn from '@/components/BoardColumn/BoardColumn'



type CardType = {
   board: string,
   color: string,
   createdAt: string,
   title: string,
   des: string,
   updatedAt: string,
   _id: string
}


export default function Board() {

   const params = useParams();
   const boardId = params.id as string ?? ""
   const [isModalColumn, setIsModalColumn] = useState(false)
   const [isCardModal, setIsCardModal] = useState(false)


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
   const { data: Columns } = useQuery({
      queryKey: ["columns"],
      queryFn: fetchColumns
   })



   return (
      <div className=' min-h-screen bg-white'>

          {/* Card Modal */}
          {isCardModal && <CardModal params={boardId} isCardModal={isCardModal} setIsCardModal={setIsCardModal} />}
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
                     {
                        Columns?.map((col: CardType) => (
                           <BoardColumn key={col._id} data={col} isCardModal={isCardModal} setIsCardModal={setIsCardModal} ></BoardColumn>
                        ))
                     }
                     {/* add column */}
                     <Card onClick={() => setIsModalColumn(true)} className="w-[300px] border-2  border-dashed border-gray-300 hover:border-blue-400 cursor-pointer">
                        <CardContent className="flex flex-col items-center justify-center h-full">
                           <Plus className="size-8 group-hover:text-blue-600" />
                           <p className="text-gray-600 font-medium">Create new Column</p>
                        </CardContent>
                     </Card>
                  </div>



               </main>

            </div>

         </div>


      </div>
   )


}