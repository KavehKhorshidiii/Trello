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


export default function Cards() {

   const params = useParams();
   const boardId = params.id as string ?? ""
   const [isModal, setIsModal] = useState(false)


   async function fetchCards() {
      const res = await fetch(`/api/Cards/${boardId}`)
      return res.json()
   }
   const { data: cardData, isPending } = useQuery({
      queryKey: ["cards"],
      queryFn: fetchCards
   })


   return (
      <div>

         <Navbar></Navbar>

         {/* Modal */}
         {isModal && <CardModal params={boardId} isModal={isModal} setIsModal={setIsModal} />}


         <Button onClick={() => setIsModal(true)} className="w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Card </Button>
         {
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
         }
      </div>
   )
}
