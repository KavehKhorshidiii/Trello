import { useState } from "react"
//import BoardModel from "@/Models/boardModel/boardModel"

export function useBoards() {

   const [board , setBoard] = useState([])
   const [loading , setLoading] = useState(true)
   const [error , setError] = useState<string | null>(null)

   function createBoard( boardData :{
      title:string,
      description?:string,
      color?:string
   }) {

   }

   return { createBoard }
}