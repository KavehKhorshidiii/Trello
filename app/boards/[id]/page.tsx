'use client'
import CardModal from '@/components/Modals/TaskModal/taskModal'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader } from '@/components/ui/card'
import { Badge, CircleCheck, Plus } from 'lucide-react'
import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query'
import Navbar from '@/components/navbar'
import ColumnModal from '@/components/Modals/ColumnModal/columnModal'



type CardType = {
   board: string,
   color: string,
   createdAt: string,
   title: string,
   des: string,
   updatedAt: string,
   _id: string
}


export default function Board() {

   const params = useParams();
   const boardId = params.id as string ?? ""
   const [isModal, setIsModal] = useState(false)
   const [isModalColumn, setIsModalColumn] = useState(false)

   // fetch Board Data
   async function fetchBoardData() {
      const res = await fetch(`/api/boards/${boardId}`)
      return res.json()
   }
   const { data: boardData, isPending } = useQuery({
      queryKey: ["board"],
      queryFn: fetchBoardData
   })

   // fetch Task Data
   async function fetchCards() {
      const res = await fetch(`/api/task/${boardId}`)
      return res.json()
   }
   const { data: cardData } = useQuery({
      queryKey: ["cards"],
      queryFn: fetchCards
   })

   // fetch columns
   async function fetchColumns() {
      const res = await fetch(`/api/column/${boardId}`)
      return res.json()
   }
   const { data: Columns } = useQuery({
      queryKey: ["columns"],
      queryFn: fetchColumns
   })





   // function Column() {
   //    return (
   //       <div>
   //          <div>
   //             {/* column Header */}
   //             <div>
   //                <div>
   //                   <div>
   //                      <h3>column title name</h3>
   //                      <Badge></Badge>
   //                   </div>
   //                </div>
   //             </div>
   //          </div>
   //       </div>
   //    )
   // }


   return (
      <div className='  px-4 py-3 sm:py-4 flex flex-col min-h-screen bg-gray-50'>


         {/* Card Modal */}
         {isModal && <CardModal params={boardId} isModal={isModal} setIsModal={setIsModal} />}
         {/* Column Modal */}
         {isModalColumn && <ColumnModal params={boardId} isModalColumn={isModalColumn} setIsModalColumn={setIsModalColumn} />}


         <div>
            <Navbar boardTitle={boardData?.[0].title} ></Navbar>

            {/* content */}
            <main className=' flex border-8 flex-col container mx-auto px-2 sm:px-4 py-4 sm:py-6'>

               <Button onClick={() => setIsModal(true)} className="w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Task </Button>

               <div className=' sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0'>
                  {/* <div className=' flex-wrap items-center gap-4 sm:gap-6'> */}

                  <div className=' text-sm text-gray-600 '>
                     <span className=' font-medium'>Total Task:0</span>
                     {/* Columns */}
                     <Button onClick={() => setIsModalColumn(true)} className="w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Column </Button>
                  </div>



                  <div className=' overflow-x-scroll  flex-1 flex'>
                     <div className=' flex gap-4 border-2 w-full min-w-max '>

                        {
                           Columns?.map((Col: CardType) =>
                              <div className=' border-2 p-4 w-96  h-[700px] rounded-2xl bg-gray-300 gap-2 overflow-scroll' key={Col._id}>

                                 <p className=" pb-4 sticky top-0 bg-gray-300 font-bold text-xs sm:text-sm text-gray-600">{Col.title}</p>

                                 <div className=' flex flex-col gap-y-2'>
                                    <div className=' p-2 rounded-2xl bg-white max-h-60 overflow-auto'>
                                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate temporibus unde earum voluptatem tenetur neque doloribus ad eligendi culpa. Quia, obcaecati officiis magni ab commodi illo dolores aperiam eos rerum debitis sequi culpa iure natus iste exercitationem facilis saepe placeat quaerat, est praesentium pariatur quasi. Nostrum voluptates vitae, ipsa facere natus libero provident aliquid perspiciatis delectus numquam autem facilis, consequuntur assumenda blanditiis. Perferendis nihil in eius natus eos sint ea debitis accusamus dicta quibusdam laboriosam tempora laudantium, iste sunt explicabo tenetur doloribus quod molestiae, voluptas provident eaque esse. Harum incidunt similique nam. Delectus officia odio numquam, debitis molestias fuga incidunt beatae sunt ut tempore laborum maxime excepturi eveniet qui ab praesentium, eos facere quibusdam et, illo doloribus quia perspiciatis. Culpa reiciendis perspiciatis modi porro, quibusdam corporis. Voluptate aspernatur architecto nam incidunt maiores aliquam id itaque, quidem asperiores in doloribus nobis porro dolorum molestiae dignissimos neque veritatis at dolore earum hic corporis, molestias eum. Quos ipsa numquam accusantium quod repellendus ut doloribus dolores, similique dicta distinctio maiores necessitatibus ipsam ex minima animi itaque modi incidunt iusto qui rem quis! Expedita quo nulla aperiam consequuntur nobis placeat aut, modi iusto eum facere ipsum quas, voluptate ex harum, ipsam necessitatibus cumque illum. Nemo odit illo excepturi amet cumque. Esse obcaecati incidunt minima. Alias rem laborum ducimus tenetur odit dolores qui ab sint, tempore deleniti atque facere quod aspernatur consectetur consequuntur illo eius? Id, voluptatum? Accusantium odio commodi suscipit! Labore repellendus fugit, dolorem inventore voluptatibus eum odit quisquam! Tenetur, facilis. Delectus nobis modi laudantium provident possimus? Laudantium sit quaerat minus consectetur expedita tempore blanditiis perferendis esse eum deserunt culpa libero pariatur aliquid ullam quae, soluta cupiditate laboriosam. Quibusdam distinctio odio voluptate. Similique nobis, sed quas labore facere dolores natus quo in. Maxime aspernatur laborum adipisci iure blanditiis veniam rem ratione rerum velit repellat voluptate odio tempore soluta, aperiam alias delectus unde dolores impedit fugiat? Doloribus cumque, fugiat, explicabo sequi saepe facere consectetur atque nesciunt ipsum quam repellendus, cupiditate voluptas temporibus beatae ea deserunt impedit non odit alias tempora asperiores quod. Dolores quo tempore dignissimos atque iure quas vel, nam, adipisci iusto velit voluptate, molestiae laboriosam consequuntur incidunt tempora odio ducimus! Est deleniti laboriosam ad accusantium! Atque nobis doloribus nam. Dicta, quam id. Tenetur voluptatibus dignissimos, eveniet saepe sequi sit rerum aspernatur voluptas cumque tempora sed accusamus sunt dolorem esse quaerat inventore, doloribus pariatur nisi odit. Quaerat, quam necessitatibus, beatae maiores molestias expedita officiis dolores suscipit amet sunt illo. Ducimus dolore tempora odit vero, saepe laudantium ab? Eos rerum consequuntur laudantium aspernatur quam sunt nemo consequatur perferendis esse repellendus eius cum soluta ad totam, pariatur quas eveniet vero eum vel quo, quod exercitationem, accusamus similique! Magnam, recusandae at. Nulla ratione enim cumque, porro harum hic totam nisi voluptas debitis illum ipsa sit ex reiciendis saepe, quas dolores laudantium temporibus et. Accusamus, suscipit nobis quae commodi sed placeat dolores, dolorum, exercitationem animi sunt ratione a vel harum rem cum odit rerum sequi distinctio? Quo, expedita. Animi officia excepturi vero recusandae ex laborum voluptas ullam sint totam.
                                    </div>
                                 </div>

                              </div>
                           )
                        }

                        <Card onClick={() => setIsModalColumn(true)} className=" w-96  border-2 h-full border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
                           <CardContent className=" p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-50">
                              <Plus className=" size-6 sm:size-8  group-hover:text-blue-600 " />
                              <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">Create new Column</p>
                           </CardContent>
                        </Card>


                     </div>
                  </div>






               </div>
            </main>


         </div>




      </div >
   )
}