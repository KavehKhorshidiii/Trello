'use client'

import { ArrowRightIcon, CircleCheck } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

interface IUser {
   _id: string
   firstname: string
   username: string
   role: string
}

export default function Navbar() {


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
                        <span>welcome {userData?.firstname}</span>
                        <Link href="/dashboard">
                           <Button>Go to dashboard<ArrowRightIcon></ArrowRightIcon></Button>
                        </Link>
                     </div>

                  ) : (
                     <>
                        <button onClick={() => redirect('/AuthPage/signIn')} className=' p-1 text-sm' >Sign In</button>
                        <button onClick={() => redirect('/AuthPage/signUp')} className=' px-2 py-1 text-sm bg-black text-white rounded-lg'>Sign Up</button>
                     </>
                  )

               }
            </div>

         </div>
      </header >
   )
}
