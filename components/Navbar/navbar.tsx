'use client'
// Imports
import Spinner from '../spinner/spinner';
import { redirect, usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRightIcon, CircleCheck, X, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import ChangeColorNavbar from "@/components/Modals/changeColorNavbar/changeColorNavbar"
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import { Card } from '../ui/card';


export default function Navbar({ boardTitle }: { boardTitle?: string }) {


   const PathName = usePathname(); const splitPathName = PathName.split("/"); const boardID = splitPathName[2];  // Path Name
   const isHomePage = PathName === "/";  // home page
   const isDashboardPage = PathName === "/dashboard";  // dashboard page
   const isBoardPage = PathName.startsWith("/boards");  // board/...
   const [isModal, setIsModal] = useState(false) // Modal
   const [profileModal, setProfileModal] = useState(false) // Profile Modal


   // API -> /api/authCheck
   const authCheck = async () => {
      const res = await fetch("/api/authCheck")
      return res.json()
   }
   const { data, isLoading } = useQuery({
      queryKey: ["authCheck"],
      queryFn: authCheck,
   })


   const isLogin = data?.success ?? false;  // Is the user registered?
   const userData = data?.data ?? null;  // User Data


   // if PathName -> Homepage
   if (isHomePage) {
      return (
         <header className=" border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className=' container mx-auto flex justify-between items-center px-4 py-3 sm:py-4 '>

               {/* Project name and logo */}
               <div className='flex items-center space-x-2'>
                  <Image className='size-6 sm:size-8 text-blue-600' alt='Icon-app' width={200} height={200} src={'/app-Icon/trello.png'}></Image>
                  <span className=' text-xl sm:text-2xl select-none font-bold text-gray-900'>Trello</span>
               </div>

               {/* Login buttons and Dashboard Button */}
               <div className=' flex space-x-1 text-xl sm:space-x-4'>
                  {
                     isLoading ? <Spinner /> : isLogin ? (

                        // If the user was registered -> 
                        <div className=' flex gap-1 flex-col sm:flex-row items-end sm:items-center sm:space-y-0 sm:space-x-4'>
                           <span className=' text-xs sm:text-base select-none text-gray-600 hidden sm:block'>welcome {userData?.firstname}</span>
                           <Link href="/dashboard">
                              <Button size="sm" className="cursor-pointer text-xs px-3 py-5 sm:text-base">Go to dashboard<ArrowRightIcon></ArrowRightIcon></Button>
                           </Link>
                        </div>

                     ) : (

                        // If the user was not registered
                        <div>
                           {/* SignIn and SignUp Button */}
                           <button onClick={() => redirect('/auth/signIn')} className='cursor-pointer text-sm sm:text-base px-3 py-1 ' >Sign In</button>
                           <button onClick={() => redirect('/auth/signUp')} className='cursor-pointer sm:text-base px-3 py-1 text-sm bg-black text-white rounded-lg'>Sign Up</button>
                        </div>

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
         <header className=" border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className=' container mx-auto flex justify-between items-center px-4 py-3 sm:py-4 '>

               {/* Project name and logo */}
               <div className='flex items-center space-x-2 text-2xl'>
                  <Image className=' size-6 sm:size-8  text-blue-600' alt='Icon-app' width={200} height={200} src={'/app-Icon/trello.png'}></Image>
                  <span className=' select-none text-xl md:text-2xl font-bold text-gray-900'>Trello</span>
               </div>

               {/* Profile */}
               {
                  isLoading ? (<Spinner />) : (
                     <div className=' relative flex space-x-1 text-xl sm:space-x-1'>
                        <div onClick={() => setProfileModal(!profileModal)} className={` ${profileModal ? ' bg-red-600 hover:bg-red-700' : ' bg-blue-600 hover:bg-blue-700'} select-none cursor-pointer transition-all duration-200 m-0 flex justify-center text-white items-center size-8 sm:size-12 rounded-full`}>
                           <p className={`${profileModal ? "hidden" : " block"}`}>{[...userData?.firstname ?? ""][0]}</p>
                           <div className={`${profileModal ? " opacity-100" : " opacity-0"} absolute transition-all  text-white`}><X className={`${profileModal ? "  rotate-90" : " rotate-0"}`} /></div>
                        </div>

                        {/* profile modal */}
                        <Card className={`${profileModal === true ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} absolute select-none transition-all duration-200 min-w-80 border-2 bg-white rounded-2xl p-5 top-full right-1/2 `}>
                           <div className=' flex gap-4 items-center'>
                              <div className=' m-0 bg-blue-600 flex justify-center text-white text-lg  items-center size-8 sm:size-12 rounded-full'>{[...userData?.firstname ?? ""][0]}</div>
                              <div>
                                 <p className=' sm:text-xl font-bold'>Kaveh</p>
                                 <p className=' sm:text-lg'>Kaveh-khorshidi</p>
                              </div>
                           </div>
                           <Button className="bg-red-600 cursor-pointer hover:bg-red-700">signOut</Button>
                        </Card>
                     </div>
                  )
               }

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
                     {/* <CircleCheck className=' text-blue-600' /> */}
                     <span className='text-lg font-bold text-gray-900 truncate  space-x-1 sm:space-x-2 min-w-0'>{boardTitle}</span>
                     {
                        (
                           <Button onClick={() => setIsModal(!isModal)} variant={"ghost"} size={"sm"} className=" size-7 flex shrink-0 p-0 ">
                              <MoreHorizontal></MoreHorizontal>
                           </Button>
                        )
                     }
                     {
                        isModal &&
                        <ChangeColorNavbar isModal={isModal} setIsModal={() => setIsModal(!isModal)} params={boardID} />
                     }
                  </div>
               </div>

               {/* Filter - profile */}
               <div>
                  <div className=' gap-2 flex space-x-1 text-xl sm:space-x-1'>
                     <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                           <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        Filter
                     </button>
                     <div className=' bg-blue-600 flex justify-center text-white items-center size-10 rounded-full'>{[...userData?.firstname ?? ""][0]}</div>
                  </div>
               </div>

            </div>
         </header >
      )
   }

}
