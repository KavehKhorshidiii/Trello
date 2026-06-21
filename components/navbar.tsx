'use client'

import { CircleCheck } from 'lucide-react';


export default function Navbar() {
   return (
      <header className=" flex justify-center border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
         <div className=' container mx-auto flex justify-between items-center px-4 py-3 sm:py-4 '>

            {/*  */}
            <div className='flex items-center space-x-2 text-2xl'>
               <CircleCheck className='size-6 sm:size-8 text-blue-300' />
               <span className=' text-xl md:text-2xl font-bold text-gray-900'>Trello Clone </span>
            </div>

            {/*  */}
            <div className=' flex gap-1 text-xl'>
               <button className=' p-1' >Sign In</button>
               <button className=' p-1 bg-black text-white rounded-lg'>Sign Up</button>
            </div>

         </div>
      </header>
   )
}
