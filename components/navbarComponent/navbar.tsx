'use client'


import Spinner from '../spinnerComponent/spinner';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRightIcon, X, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Card } from '../ui/card';
import { useQueryClient } from "@tanstack/react-query";
import { useIsLogin } from '@/hooks/useIsLogin';


export default function Navbar({ editBoardData, boardTitle }: { editBoardData?: ((value: boolean) => void), boardTitle?: string }) {

   const PathName = usePathname(); // Path Name
   const [profileModal, setProfileModal] = useState(false) // Profile Modal
   const route = useRouter() // useRoute
   const queryClient = useQueryClient(); // Query Client


   // check user login 
   const { isLogin, data, isLoading, signOut } = useIsLogin()


   // Route Type
   const routeType = (() => {
      if (PathName === "/") return "home"
      if (PathName === "/dashboard") return "dashboard"
      if (PathName.startsWith("/boards")) return "board"
      return "unknown"
   })()


   // update navbar
   useEffect(() => {
      queryClient.invalidateQueries({ queryKey: ["authCheck"] })
      queryClient.refetchQueries({ queryKey: ["authCheck"] })
   }, [PathName , queryClient])


   // Navbar JSX
   switch (routeType) {
      case "home": {
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
                              <span className=' text-xs sm:text-base select-none text-gray-600 hidden sm:block'>welcome {data?.firstname}</span>
                              <Link href="/dashboard">
                                 <Button size="sm" className="cursor-pointer text-xs px-3 py-5 sm:text-base">Go to dashboard<ArrowRightIcon></ArrowRightIcon></Button>
                              </Link>
                           </div>

                        ) : (

                           // If the user was not registered
                           <div>
                              {/* SignIn and SignUp Button */}
                              <button onClick={() => route.push('/auth/signIn')} className='cursor-pointer text-sm sm:text-base px-3 py-1 ' >Sign In</button>
                              <button onClick={() => route.push('/auth/signUp')} className='cursor-pointer sm:text-base px-3 py-1 text-sm bg-black text-white rounded-lg'>Sign Up</button>
                           </div>

                        )

                     }
                  </div>

               </div>
            </header >
         )
      };
      case "dashboard": {
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
                           <div onClick={() => setProfileModal(!profileModal)} className={` ${profileModal ? ' bg-red-600 hover:bg-red-500' : ' bg-blue-600 hover:bg-blue-700'} select-none cursor-pointer transition-all duration-200 m-0 flex justify-center text-white items-center size-8 sm:size-12 rounded-full`}>
                              <p className={`${profileModal ? "hidden" : " block"}`}>{[data?.firstname?.[0] ?? ""]}</p>
                              <div className={`${profileModal ? " opacity-100" : " opacity-0"} absolute transition-all  text-white`}><X className={`${profileModal ? "  rotate-90" : " rotate-0"}`} /></div>
                           </div>

                           {/* profile modal */}
                           <Card className={`absolute top-full right-0 mt-1 w-60 sm:w-80 overflow-hidden rounded-xl border bg-white shadow-xl transition-all duration-200 ${profileModal ? "translate-y-0 opacity-100" : "-translate-y-2 pointer-events-none opacity-0"}`}>
                              {/* Header */}
                              <div className="flex items-center gap-4 p-5">
                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white"> {data?.firstname?.[0] ?? "U"} </div>
                                 <div className="min-w-0">
                                    <p className="truncate text-lg font-semibold text-gray-900">{data?.firstname}</p>
                                    <p className="truncate text-sm text-gray-500">{data?.username}</p>
                                 </div>
                              </div>

                              <div className="border-t" />

                              {/* Actions */}
                              <div className="px-4">
                                 <Button onClick={() => signOut.mutate()} variant="destructive" className=" bg-red-600 hover:bg-red-500 text-white  w-full cursor-pointer">
                                    Sign out
                                 </Button>
                              </div>
                           </Card>
                        </div>
                     )
                  }


               </div>
            </header >
         )
      };
      case "board": {
         return (
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
               <div className=' container mx-auto flex justify-between items-center px-4 py-3 sm:py-4 '>

                  {/* Back button and Edit Board name */}
                  <div className=' flex items-center justify-between'>

                     {/* back button */}
                     <div className='flex items-center space-x-2 sm:space-x-4 min-w-0'>
                        <Link href="/dashboard" className=' flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 shrink-0'>
                           <ArrowLeft className=' size-4 sm:size-5' />
                           <span className=' hidden sm:block'>Back to dashboard</span>
                           <span className=' sm:hidden'>Back</span>
                        </Link>
                     </div>

                     <div className=' mx-4 h-4 sm:h-6 w-px  bg-gray-300 block' />

                     {/* edit board name */}
                     <div className=' flex items-center space-x-1 sm:space-x-2 min-w-0'>
                        {
                           <span className='text-base select-none sm:text-xl font-bold text-gray-900 truncate  space-x-1 sm:space-x-2 min-w-0'>{boardTitle}</span>
                        }
                        {
                           (
                              <Button onClick={() => editBoardData?.(true)} variant={"ghost"} size={"sm"} className=" size-7 cursor-pointer flex shrink-0 p-0 ">
                                 <MoreHorizontal></MoreHorizontal>
                              </Button>
                           )
                        }
                     </div>
                  </div>


                  {/* Filter - profile */}
                  {
                     isLoading ? (<Spinner />) : (
                        <div className=' relative flex space-x-1 text-xl sm:space-x-1'>

                           <div onClick={() => setProfileModal(!profileModal)} className={` ${profileModal ? ' bg-red-600 hover:bg-red-500' : ' bg-blue-600 hover:bg-blue-700'} select-none cursor-pointer transition-all duration-200 m-0 flex justify-center text-white items-center size-8 sm:size-12 rounded-full`}>
                              <p className={`${profileModal ? "hidden" : " block"}`}>{[data?.firstname?.[0] ?? ""]}</p>
                              <div className={`${profileModal ? " opacity-100" : " opacity-0"} absolute transition-all  text-white`}><X className={`${profileModal ? "  rotate-90" : " rotate-0"}`} /></div>
                           </div>

                           {/* profile modal */}
                           <Card className={`absolute top-full right-0 mt-1 w-60 sm:w-80 overflow-hidden rounded-xl border bg-white shadow-xl transition-all duration-200 ${profileModal ? "translate-y-0 opacity-100" : "-translate-y-2 pointer-events-none opacity-0"}`}>
                              {/* Header */}
                              <div className="flex items-center gap-4 p-5">
                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white"> {data?.firstname?.[0] ?? "U"} </div>
                                 <div className="min-w-0">
                                    <p className="truncate text-lg font-semibold text-gray-900">{data?.firstname}</p>
                                    <p className="truncate text-sm text-gray-500">{data?.username}</p>
                                 </div>
                              </div>

                              <div className="border-t" />

                              {/* Actions */}
                              <div className="px-4">
                                 <Button onClick={() => signOut.mutate()} variant="destructive" className=" bg-red-600 hover:bg-red-500 text-white  w-full cursor-pointer">
                                    Sign out
                                 </Button>
                              </div>
                           </Card>

                        </div>
                     )
                  }

               </div>
            </header >
         )
      }
   }

}