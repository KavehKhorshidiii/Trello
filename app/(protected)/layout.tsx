import { verifyJwtToken } from "@/lib/Auth/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"



export default async function Layout({children}:{children:React.ReactNode}) {


   // token
   const token = (await cookies()).get("token")?.value
   if(!token){redirect("/")}

   
   //verify token
   const verifyToken = verifyJwtToken(token as string)
   if(!verifyToken){redirect("/")}


   return (children)
   
}
