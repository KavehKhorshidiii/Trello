'use client'
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"



interface IUser {
   _id: string
   firstname: string
   username: string
   role: string
}

export default function Dashboard() {


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
         </main>

         {/*  */}
         
      </div>
   )

}