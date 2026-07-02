'use client'

type Props = {
  setColor: React.Dispatch<React.SetStateAction<string>>
}

// Colors 
export default function Colors({setColor}:Props) {
   return (
      <div className=' w-full'>
         <div className='flex items-center justify-center gap-1 '>
            <button onClick={(e)=>{e.preventDefault(); return setColor("blue")}} className=" size-9 focus:outline-2 focus:outline-gray-600 transition-all duration-100 rounded-full bg-blue-600"></button>
            <button onClick={(e)=>{e.preventDefault(); return setColor("cyan")}} className="focus:outline-2 focus:outline-gray-600 transition-all duration-100 size-9 rounded-full bg-cyan-600"></button>
            <button onClick={(e)=>{e.preventDefault(); return setColor("green")}} className="focus:outline-2 focus:outline-gray-600 transition-all duration-100 size-9 rounded-full bg-green-600"></button>
            <button onClick={(e)=>{e.preventDefault(); return setColor("red")}} className="focus:outline-2 focus:outline-gray-600 transition-all duration-100 size-9 rounded-full bg-red-600"></button>
            <button onClick={(e)=>{e.preventDefault(); return setColor("purple")}} className="focus:outline-2 focus:outline-gray-600 transition-all duration-100 size-9 rounded-full bg-purple-600"></button>
            <button onClick={(e)=>{e.preventDefault(); return setColor("yellow")}} className="focus:outline-2 focus:outline-gray-600 transition-all duration-100 size-9 rounded-full bg-amber-600"></button>
            <button onClick={(e)=>{e.preventDefault(); return setColor("gray")}} className="focus:outline-2 focus:outline-gray-600 transition-all duration-100 size-9 rounded-full bg-gray-600"></button>
         </div>
      </div>
   )
}
