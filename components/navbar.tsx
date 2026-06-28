'use client'

import { ArrowLeft, ArrowRightIcon, CircleCheck, MoreHorizontal } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from "next/navigation"
import ChangeColorNavbar from "@/components/Modals/changeColorNavbar/changeColorNavbar"




interface IUser {
   _id: string
   firstname: string
   username: string
   role: string
}


interface PropsType {
   boardTitle?: string;
   // onEditBoard?: () => void
}

export default function Navbar({ boardTitle }: PropsType) {


   const PathName = usePathname()
   const splitPathName = PathName.split("/")
   const boardID = splitPathName[2] 
   const isHomePage = PathName === "/"
   const isDashboardPage = PathName === "/dashboard"
   const isBoardPage = PathName.startsWith("/boards")
   const [isLogin, setIsLogin] = useState<boolean>()
   const [userData, setUserData] = useState<IUser | null>(null)
   const [isModal, setIsModal] = useState(false)



   function isLoginHandler(response: { success: boolean, data: IUser }) {
      if (response.success) {
         setIsLogin(true)
         setUserData(response.data)
      } else {
         setIsLogin(false)
         setUserData(null)
      }
   }

   useEffect(() => {
      fetch("/api/authCheck")
         .then(res => res.json())
         .then(response => isLoginHandler(response))
   }, [])

   // if PathName -> Homepage
   if (isHomePage) {
      return (
         <header className=" flex justify-center border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className=' container mx-auto flex justify-between items-center px-4 py-3 sm:py-4 '>



               {/*  */}
               <div className='flex items-center space-x-2 text-2xl'>
                  <CircleCheck className='size-6 sm:size-8 text-blue-600' />
                  <span className=' text-xl md:text-2xl font-bold text-gray-900'>Trello Clone </span>
               </div>

               <div className=' flex space-x-1 text-xl sm:space-x-1'>
                  {
                     isLogin ? (

                        <div className=' flex gap-1 flex-col sm:flex-row items-end sm:items-center'>
                           <span className=' text-xs sm:text-sm text-gray-600 hidden sm:block'>welcome {userData?.firstname}</span>
                           <Link href="/dashboard">
                              <Button size="sm" className=" text-xs sm:text-sm">
                                 Go to dashboard<ArrowRightIcon></ArrowRightIcon>
                              </Button>
                           </Link>
                        </div>

                     ) : (
                        <>
                           <button onClick={() => redirect('/auth/signIn')} className=' p-1 text-sm' >Sign In</button>
                           <button onClick={() => redirect('/auth/signUp')} className=' px-2 py-1 text-sm bg-black text-white rounded-lg'>Sign Up</button>
                        </>
                     )

                  }
               </div>

            </div>
         </header >
      )
   }

   // if PathName -> Dashboard
   if (isDashboardPage) {
      return (
         <header className=" flex justify-center border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className=' container mx-auto flex justify-between items-center px-4 py-3 sm:py-4 '>



               {/*  */}
               <div className='flex items-center space-x-2 text-2xl'>
                  <CircleCheck className='size-6 sm:size-8 text-blue-600' />
                  <span className=' text-xl md:text-2xl font-bold text-gray-900'>Trello Clone </span>
               </div>

               <div className=' flex space-x-1 text-xl sm:space-x-1'>
                  <div className=' bg-blue-600 flex justify-center text-white items-center size-10 rounded-full'>{[...userData?.firstname ?? ""][0]}</div>
               </div>

            </div>
         </header >
      )
   }

   // if board -> board
   if (isBoardPage) {
      return (
         <header className=" flex justify-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className=' container mx-auto flex justify-between items-center px-4 py-3 sm:py-4 '>

               <div className=' flex items-center justify-between'>
                  <div className='flex items-center space-x-2 sm:space-x-4 min-w-0'>
                     <Link href="/dashboard" className=' flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 shrink-0'>
                        <ArrowLeft className=' size-4 sm:size-5' />
                        <span className=' hidden sm:block'>Back to dashboard</span>
                        <span className=' sm:hidden'>Back</span>
                     </Link>
                  </div>
                  <div className=' mx-4 h-4 sm:h-6 w-px  bg-gray-300 hidden sm:block' />
                  <div className=' flex items-center space-x-1 sm:space-x-2 min-w-0'>
                     <CircleCheck className=' text-blue-600' />
                     <span className='text-lg font-bold text-gray-900 truncate  space-x-1 sm:space-x-2 min-w-0'>{boardTitle}</span>
                     {
                        (
                           <Button onClick={()=>setIsModal(!isModal)} variant={"ghost"} size={"sm"} className=" size-7 flex shrink-0 p-0 ">
                              <MoreHorizontal></MoreHorizontal>
                           </Button>
                        )
                     }
                     {
                        isModal &&
                        <ChangeColorNavbar isModal={isModal} setIsModal={()=>setIsModal(!isModal)} params={boardID}/>
                     }
                  </div>
               </div>

               {/* filter */}

            </div>
         </header >
      )
   }

}
