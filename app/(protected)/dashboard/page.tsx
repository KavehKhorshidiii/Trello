'use client'

// imports
import Navbar from "@/components/navbarComponent/navbar"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FilterIcon, List, Plus, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import BoardModal from "@/components/Modals/BoardModal/boardModal"
import { useQuery } from "@tanstack/react-query"
import { Grid3X3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import BoardCard from "@/components/boardCardComponent/BoardCard"
import CreateBoardCard from "@/components/CreateBoardCard/CreateBoardCard"
import { useIsLogin } from "@/hooks/useIsLogin"
import Spinner from "@/components/spinnerComponent/spinner"
import { LayoutGrid, Rocket, CircleCheck, Clock3 } from "lucide-react";


// types
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


   const [addBoardModal, setAddBoardModal] = useState(false) // add new board modal
   const [viewMode, setViewModal] = useState<"grid" | "list">("grid") // board View Model
   const { data, error } = useIsLogin() // authCheck and userdata hook
   const [search, setSearch] = useState<string>('') // search value


   // board Data
   const fetchBoards = async () => {
      const res = await fetch("/api/boards")
      return res.json()
   }
   const { data: boardsData, isLoading } = useQuery<{ data: { boards: BoardType[] } }>({
      queryKey: ["boards"],
      queryFn: fetchBoards
   })


   // board data and filter data
   const boards = boardsData?.data?.boards ?? [];
   const filteredBoards: BoardType[] = boards.filter((board) => board.title.toLocaleLowerCase().includes(search))


   // Dashboard Stats 
   const stats = [
      {
         title: "Total Boards",
         value: boardsData?.data?.boards?.length ?? 0,
         subtitle: "All your boards",
         icon: LayoutGrid,
         iconBg: "bg-blue-100",
         iconColor: "text-blue-600",
         hover: "group-hover:bg-blue-600",
         hoverIcon: "group-hover:text-white",
      },
      {
         title: "Active Boards",
         value: boardsData?.data?.boards?.length ?? 0,
         subtitle: "Currently active",
         icon: Rocket,
         iconBg: "bg-green-100",
         iconColor: "text-green-600",
         hover: "group-hover:bg-green-600",
         hoverIcon: "group-hover:text-white",
      },
      {
         title: "Completed Tasks",
         value: 0,
         subtitle: "Coming soon",
         icon: CircleCheck,
         iconBg: "bg-purple-100",
         iconColor: "text-purple-600",
         hover: "group-hover:bg-purple-600",
         hoverIcon: "group-hover:text-white",
      },
      {
         title: "Pending Tasks",
         value: 0,
         subtitle: "Coming soon",
         icon: Clock3,
         iconBg: "bg-orange-100",
         iconColor: "text-orange-600",
         hover: "group-hover:bg-orange-600",
         hoverIcon: "group-hover:text-white",
      },
   ];


   return (
      <div className=" z-50 min-h-screen bg-gray-50">


         {/* Modal */}
         {addBoardModal && <BoardModal addBoardModal={addBoardModal} setAddBoardModal={setAddBoardModal} />}


         {/* Navbar */}
         <Navbar></Navbar>


         {/* main */}
         <main className=" container mx-auto px-4 sm:py-8 py-6 ">

            {/* Header */}
            <header className=" mb-6 sm:mb-8">
               <h1 className=" text-2xl sm:text-3xl font-bold text-gray-900 mb-2"> welcome back {data?.firstname}👋</h1>
               <p className=" text-gray-600">Here`s what`s happening with your board.</p>
            </header>

            {/* Dashboard Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
               {stats.map((stat) => (
                  <Card key={stat.title} className="group border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                     <CardContent className="p-5">
                        <div className="flex items-center justify-between">

                           <div>
                              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                              <h2 className="mt-2 text-xl font-bold text-gray-900">{stat.value}</h2>
                              <p className="mt-2 text-xs text-gray-400">{stat.subtitle}</p>
                           </div>

                           <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${stat.iconBg} ${stat.hover}`}>
                              <stat.icon className={`h-7 w-7 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${stat.iconColor} ${stat.hoverIcon}`} />
                           </div>

                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* search & viewModel */}
            <div className=" my-9 sm:my-16">
               {/* Controls */}
               <div className="flex flex-col gap-4 mb-6">
                  <div>
                     <h2 className="text-2xl font-bold text-gray-900">Your Boards</h2>
                     <p className="text-gray-500">Manage your projects and collaborate with your team</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                     {/* Search */}
                     <div className="relative w-full sm:max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())} id="search" placeholder="Search boards..." className="pl-10" />
                     </div>

                     {/* viewMode */}
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm"> <FilterIcon className="h-4 w-4" />Filter </Button>
                        <div className="flex items-center  rounded-lg border">
                           <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewModal("grid")} ><Grid3X3 className="h-4 w-4" /></Button>
                           <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewModal("list")}><List className="h-4 w-4" /></Button>
                        </div>
                        <Button onClick={() => setAddBoardModal(true)} className="gap-2"><Plus className="h-4 w-4" /> Create Board</Button>
                     </div>

                  </div>
               </div>


               {/* Boards */}
               {
                  isLoading ?
                     <div className=" flex justify-center items-center content-center h-52"><Spinner></Spinner></div>
                     :
                     <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"} >
                        {
                           filteredBoards.map((board) =>
                              <BoardCard key={board._id} board={board} viewMode={viewMode} />
                           )
                        }
                        <CreateBoardCard onClick={() => setAddBoardModal(true)} />
                     </div>
               }

            </div>

         </main>


      </div>
   )

}

