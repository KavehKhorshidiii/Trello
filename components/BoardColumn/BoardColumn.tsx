
import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "../ui/button"



type CardType = {
   board: string,
   color: string,
   createdAt: string,
   title: string,
   des: string,
   updatedAt: string,
   _id: string
}

export default function BoardColumn({data , isCardModal , setIsCardModal}:{data:CardType , isCardModal:boolean , setIsCardModal:(value:boolean)=>void}) {


   
   return (
      <div className="flex flex-col w-[300px] shrink-0">



         <div className="flex flex-col gap-3 bg-gray-50 rounded-xl border border-gray-200 p-3 min-h-[120px]">

            {/* Column header */}
            <div className="flex items-center border-b-1  justify-between mb-3">
               <div className="flex w-full justify-between items-center gap-2">
                  <div>
                     <span className="text-sm font-semibold text-gray-700">{data.title}</span>
                     <span className="text-xs text-gray-400 font-medium">{'2'}</span>
                  </div>
                  <Button variant="ghost" size="sm"><MoreHorizontal /></Button>
               </div>
            </div>

            {/* Cards area */}
            {/* {column.cards.map((card) => (
               <TaskCard key={card.id} card={card} />
            ))} */}

            <div className=" border rounded-xl h-52 overflow-y-auto">
               <div className=" px-2 pt-2 font-bold flex items-center justify-between">
                  <p>Title</p>
                  <Button variant="ghost" size="sm"><MoreHorizontal /></Button>
               </div>
               <p className=" px-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit assumenda facere quidem. Cupiditate facere sed optio. Vel nobis adipisci aliquam!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit assumenda facere quidem. Cupiditate facere sed optio. Vel nobis adipisci aliquam!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit assumenda facere quidem. Cupiditate facere sed optio. Vel nobis adipisci aliquam!
               </p>
               <div className=" flex text-sm justify-between bg-gray-50 sticky bottom-0  boarder border p-2 overflow-y-auto">
                  <span>kaveh-khorshidi</span>
                  <span>2025-06-25</span>
               </div>
               
            </div>
            



            {/* Add a card */}
            <button onClick={()=> setIsCardModal(!isCardModal)} className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 mt-1 py-1 transition-colors w-full">
               <Plus></Plus>
               Add a card
            </button>

         </div>
      </div>
   )
}
