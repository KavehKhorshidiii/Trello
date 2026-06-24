'use client'
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { CircleCheck } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import BoardModal from "@/components/Modals/boardModal"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"



// type IUser = {
//    _id: string
//    firstname: string
//    username: string
//    role: string
// }

type BoardType = {
   _id: string;
   title: string;
   des: string;
   color: string;
   author: string;
   createdAt: string;
   updatedAt: string;
};


export default function Dashboard() {

   const [isModal, setIsModal] = useState(false)


   const fetchAuth = async () => {
      const res = await fetch("/api/authCheck")
      return res.json()
   }
   const { data: authData, isLoading } = useQuery({
      queryKey: ["auth"],
      queryFn: fetchAuth,
   })

   const setIsLogin = authData?.success
   const userData = authData?.data
   const router = useRouter()


   useEffect(() => {
      if (!setIsLogin && isLoading === false) { router.push('/') }
   }, [authData, isLoading])

   const fetchBoards = async () => {
      const res = await fetch("/api/Boards")
      return res.json()
   }
   const { data: boardsData } = useQuery<{ data: { boards: BoardType[] } }>({
      queryKey: ["boards"],
      queryFn: fetchBoards
   })

   function boardHandler() {
      router.push(`dashboard/${userData?._id}`)
   }

   return (
      <div className=" min-h-screen bg-gray-50">

         {/* Modal */}
         {isModal && <BoardModal isModal={isModal} setIsModal={setIsModal} />}

         {/* Navbar */}
         <Navbar></Navbar>

         {/* main */}
         <main className=" container mx-auto px-4 sm:py-8 py-6 border ">
            <div className=" mb-6 sm:mb-8">
               <h1 className=" text-2xl sm:text-3xl font-bold text-gray-900 mb-2"> welcome back {userData?.firstname}👋</h1>
               <p className=" text-gray-600">Here`s what`s happening with your board.</p>
            </div>

            <div className=" border-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
               <Card onClick={boardHandler} >
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">test</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{ 2 }</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <CircleCheck className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600"></CircleCheck>
                        </div>
                     </div>
                  </CardContent>
               </Card>
                   <Card onClick={boardHandler} >
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">text</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{ 2 }</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <CircleCheck className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600"></CircleCheck>
                        </div>
                     </div>
                  </CardContent>
               </Card>
                   <Card onClick={boardHandler} >
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">text</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{ 2 }</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <CircleCheck className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600"></CircleCheck>
                        </div>
                     </div>
                  </CardContent>
               </Card>
                   <Card onClick={boardHandler} >
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">text</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{ 2 }</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <CircleCheck className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600"></CircleCheck>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>



            {/* Card */}
            <Button onClick={() => setIsModal(true)} className="w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Board </Button>
            
            <div className=" border-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
               {
                  boardsData?.data?.boards.map(board =>

                     <Card onClick={boardHandler} key={board._id}>
                        <CardContent className=" p-4 sm:p-6">
                           <div className=" flex items-center justify-between">
                              <div>
                                 <p className=" text-xs sm:text-sm font-medium text-gray-600">{board.title}</p>
                                 <p className=" text-xs sm:text-sm font-medium text-gray-600">{board.des}</p>
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


         </main>

      </div>
   )

}