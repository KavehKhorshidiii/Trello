'use client'
import CardModal from '@/components/Modals/CardModal/cardModal'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { CircleCheck, Plus } from 'lucide-react'
import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/navbar'


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
   const [isModal, setIsModal] = useState(false)

   // fetch Board Data
   async function fetchBoardData() {
      const res = await fetch(`/api/boards/${boardId}`)
      return res.json()
   }
   const { data: boardData, isPending } = useQuery({
      queryKey: ["board"],
      queryFn: fetchBoardData
   })



   // async function fetchCards() {
   //    const res = await fetch(`/api/Cards/${boardId}`)
   //    return res.json()
   // }
   // const { data: cardData, isPending } = useQuery({
   //    queryKey: ["cards"],
   //    queryFn: fetchCards
   // })



   return (
      <div className=' min-h-screen bg-gray-50'>

         {/* Modal */}
         {isModal && <CardModal params={boardId} isModal={isModal} setIsModal={setIsModal} />}

         <Navbar boardTitle={boardData?.[0].title} ></Navbar>

         <Button onClick={() => setIsModal(true)} className="w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Task </Button>


         <main>
            <div>
               <div>
                  <div>
                     <span>Total Task:0</span>
                  </div>
               </div>
            </div>
         </main>
















         {/* {
            cardData?.data?.cards?.map((card: CardType) =>
               <Card key={card._id}>
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{card.title}</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{card.des}</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <CircleCheck className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600"></CircleCheck>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            )
         } */}
      </div>
   )
}
