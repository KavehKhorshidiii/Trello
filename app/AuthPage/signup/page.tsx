'use client'
import { useActionState } from "react"
import SignUpAction from "../SignUpAction"

export default function SignUp() {


   const initialState = {success:null , errors:{} , message:""}
   const [state , formAction , pending] = useActionState(SignUpAction , initialState)


   return (
      <div className=" flex justify-center items-center content-center">

         <span>{state.message}</span>

         <div className=" w-fit border-2">

            <form action={formAction} className=" p-1 gap-1 flex flex-col">
               <label htmlFor="">FirstName</label>
               <input type="text" name="firstname" className="  border-2 h-10 w-72" />
               <label htmlFor="">Username</label>
               <input type="text" name="username" className="  border-2 h-10 w-72" />
               <label htmlFor="">Password</label>
               <input type="password" name="password" className="  border-2 h-10 w-72" />
               <input type="submit" placeholder="submit" className="border-2 h-10 w-72" />
            </form>
         </div>
      </div>
   )
}
