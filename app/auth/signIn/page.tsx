'use client'
import { useActionState } from "react"
import SignInAction from "@/app/AuthPage/signIn/SignInAction"

export default function SignIn() {


   const initialValue = { success: null, errors: {}, message: "" }
   const [state, formAction, pending] = useActionState(SignInAction, initialValue)


   return (
      <div className=" border-4 h-screen flex justify-center items-center content-center">
         <div className=" w-80 border-2">
   
            <form action={formAction} className="p-1 gap-1 flex flex-col">
               {
                  state.message && <span className=" border rounded-2xl text-center">{state.message}</span>
               }
               <div className=" flex flex-col border-2 ">
                  <label htmlFor="">Username</label>
                  <input type="text" name="username" className="  rounded-2xl border-2 h-10" />
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" className="  rounded-2xl border-2 h-10 " />
                  <button type="submit" className="border-2 rounded-2xl h-10 w-full">Login</button>
               </div>
            </form>

         </div>

      </div>
   )
}
