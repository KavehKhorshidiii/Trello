'use client'
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useBoards } from "@/lib/hooks/useBoards"
import { Card } from "@/components/ui/card"
import { CircleCheck } from "lucide-react"
import { CardContent } from "@/components/ui/card"


interface IUser {
   _id: string
   firstname: string
   username: string
   role: string
}

export default function Dashboard() {

   const { createBoard } = useBoards()


   const [isLogin, setIsLogin] = useState<boolean>()
   const [userData, setUserData] = useState<IUser | null>(null)



   function isLoginHandler(response: { success: boolean, data: IUser }) {
      if (response.success) {
         setIsLogin(true)
         setUserData(response.data)
      }
   }

   useEffect(() => {
      fetch("/api/authCheck")
         .then(res => res.json())
         .then(response => isLoginHandler(response))
   }, [])


   const HandlerCreateBoard = () => {
      // fetch("api/board",{
      //    method:"POST",
      //    headers:{"Content-Type":"application/json"},
      //    body:JSON.stringify({

      //    })
      // })

      createBoard()
   }

   return (
      <div className=" min-h-screen bg-gray-50">
         {/*  */}
         <Navbar></Navbar>

         {/*  */}
         <main className=" container mx-auto px-4 sm:py-8 py-6 border ">
            <div className=" mb-6 sm:mb-8">
               <h1 className=" text-2xl sm:text-3xl font-bold text-gray-900 mb-2"> welcome back {userData?.firstname}👋</h1>
               <p className=" text-gray-600">Here`s what`s happening with your board.</p>
            </div>

            <Button onClick={HandlerCreateBoard} className="w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Board </Button>

            {/* Card */}
            <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">

               <Card>
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">Total Board</p>
                           <p className=" font-bold text-xl text-gray-900 sm:text-2xl">3</p>{/* board length  */}

                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <CircleCheck className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600"></CircleCheck>
                        </div>
                     </div>
                  </CardContent>
               </Card>

            </div>



         </main>


      </div>
   )

}