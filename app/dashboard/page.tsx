'use client'
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FilterIcon, List, Plus, Search } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleCheck, Rocket } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import BoardModal from "@/components/Modals/BoardModal/boardModal"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Grid3X3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"








type BoardType = {
   _id: string;
   title: string;
   des: string;
   color: string;
   author: string;
   createdAt: string;
   updatedAt: string;
};


export default function Dashboard() {

   const [isModal, setIsModal] = useState(false)
   const [viewMode, setViewModal] = useState<"grid" | "list">("grid")

   const fetchAuth = async () => {
      const res = await fetch("/api/authCheck")
      return res.json()
   }
   const { data: authData, isLoading } = useQuery({
      queryKey: ["auth"],
      queryFn: fetchAuth,
   })

   const setIsLogin = authData?.success
   const userData = authData?.data
   const router = useRouter()


   useEffect(() => {
      if (!setIsLogin && isLoading === false) { router.push('/') }
   }, [authData, isLoading])

   const fetchBoards = async () => {
      const res = await fetch("/api/boards")
      return res.json()
   }
   const { data: boardsData } = useQuery<{ data: { boards: BoardType[] } }>({
      queryKey: ["boards"],
      queryFn: fetchBoards
   })


   return (
      <div className=" z-50 min-h-screen bg-gray-50">


         {/* Modal */}
         {isModal && <BoardModal isModal={isModal} setIsModal={setIsModal} />}


         {/* Navbar */}
         <Navbar></Navbar>

         {/* main */}
         <main className=" container mx-auto px-4 sm:py-8 py-6 ">
            <div className=" mb-6 sm:mb-8">
               <h1 className=" text-2xl sm:text-3xl font-bold text-gray-900 mb-2"> welcome back {userData?.firstname}👋</h1>
               <p className=" text-gray-600">Here`s what`s happening with your board.</p>
            </div>

            {/* */}
            <div className=" grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
               <Card>
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">test</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{2}</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <CircleCheck className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600"></CircleCheck>
                        </div>
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">Active Project</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{2}</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center ">
                           <Rocket className=" h-5 w-5 sm:h-6 sm:w-6 text-green-600"></Rocket>
                        </div>
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">Recent Activity</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{boardsData?.data?.boards.length}</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <div className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600">📊</div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardContent className=" p-4 sm:p-6">
                     <div className=" flex items-center justify-between">
                        <div>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">text</p>
                           <p className=" text-xs sm:text-sm font-medium text-gray-600">{2}</p>
                        </div>
                        <div className=" h-10 w-10 sm:h-12 sm:w-12 bg-blue-100 rounded-lg flex items-center justify-center ">
                           <CircleCheck className=" h-5 w-5 sm:h-6 sm:w-6 text-blue-600"></CircleCheck>
                        </div>
                     </div>
                  </CardContent>
               </Card>

            </div>




            <div className=" mb-6 sm:mb-8">


               <div>
                  <h2 className=" text-xl sm:text-2xl font-bold text-gray-900">Your Boards</h2>
                  <p className=" text-gray-600">Manage your projects and tasks</p>
               </div>

               <Button variant="outline" size="sm"><FilterIcon></FilterIcon>Filter</Button>
               <Button onClick={() => setIsModal(true)} className=" py-5 my-5 w-full sm:w-auto"><Plus className=" size-4"></Plus> Create Board </Button>
               <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewModal("grid")}>
                  <Grid3X3 />
               </Button>
               <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewModal("list")}>
                  <List />
               </Button>
               {/* Search bar */}
               <div className=" relative mb-4 sm:mb-6">
                  <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                  <Input id="search" placeholder="Search boards..." className=" pl-10"></Input>
               </div>


               {/* ... */}
               <div className=" rounded-sm flex items-center space-x-2 bg-white p-3">

                  {
                     boardsData?.data?.boards.length == 0 ? (<p>No Board yet</p>) :
                        viewMode === "grid" ? (
                           <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-center sm:justify-between space-y-2 sm:space-y-0">
                              {
                                 boardsData?.data?.boards.map((board, key) =>
                                    <Link key={board._id} href={`boards/${board._id}`}>
                                       <Card className={`min-h-50 h-full group hover:shadow-lg transition-shadow cursor-pointer`} >
                                          <CardHeader className=" pb-3">
                                             <div className=" flex items-center justify-between ">
                                                <div className={` bg-[#000000]  rounded size-4 `}></div>
                                                <Badge className=" text-xs" variant="secondary">New</Badge>
                                             </div>
                                          </CardHeader>
                                          <CardContent className=" p-4 sm:p-6">
                                             <CardTitle className=" sm:text-lg text-base mb-2 group-hover:text-blue-600 transition-colors">{board.title}</CardTitle>
                                             <CardDescription className=" text-sm mb-4">{board.des}</CardDescription>
                                             <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                                                <span>
                                                   Create
                                                   {new Date(board.createdAt).toLocaleDateString()}
                                                </span>
                                                <span>
                                                   Update
                                                   {new Date(board.updatedAt).toLocaleDateString()}
                                                </span>

                                             </div>
                                          </CardContent>
                                       </Card>
                                    </Link>

                                 )
                              }
                              <Card className=" border-2 h-full border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
                                 <CardContent className=" p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-50">
                                    <Plus className=" size-6 sm:size-8  group-hover:text-blue-600 " />
                                    <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">Create new board</p>
                                 </CardContent>
                              </Card>
                           </div>
                        ) : (
                           <div className=" w-full flex flex-col gap-4">
                              {
                                 boardsData?.data?.boards.map((board, key) =>

                                    <Link key={board._id} href={`boards/${board._id}`}>
                                       <Card className={` group w-full hover:shadow-lg transition-shadow cursor-pointer`} >
                                          <CardHeader className=" pb-3">
                                             <div className=" flex items-center justify-between ">
                                                <div className={` bg-[#000000]  rounded size-4 `}></div>
                                                <Badge className=" text-xs" variant="secondary">New</Badge>
                                             </div>
                                          </CardHeader>
                                          <CardContent className=" p-4 sm:p-6">
                                             <CardTitle className=" sm:text-lg text-base mb-2 group-hover:text-blue-600 transition-colors">{board.title}</CardTitle>
                                             <CardDescription className=" text-sm mb-4">{board.des}</CardDescription>
                                             <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                                                <span>
                                                   Create
                                                   {new Date(board.createdAt).toLocaleDateString()}
                                                </span>
                                                <span>
                                                   Update
                                                   {new Date(board.updatedAt).toLocaleDateString()}
                                                </span>

                                             </div>
                                          </CardContent>
                                       </Card>
                                    </Link>

                                 )
                              }
                              <Card className=" border-2 h-full border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group">
                                 <CardContent className=" p-4 sm:p-6 flex flex-col items-center justify-center h-full min-h-50">
                                    <Plus className=" size-6 sm:size-8  group-hover:text-blue-600 " />
                                    <p className="text-sm sm:text-base text-gray-600 group-hover:text-blue-600 font-medium">Create new board</p>
                                 </CardContent>
                              </Card>
                           </div>

                        )
                  }

                  {/* </div> */}

               </div>

            </div>


         </main>

      </div>
   )

}

