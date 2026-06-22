'use client'
import { useActionState } from "react"
import SignUpAction from "./SignUpAction"

export default function SignUp() {


   const initialState = { success: null, errors: {}, message: "" }
   const [state, formAction, pending] = useActionState(SignUpAction, initialState)


   return (
      <div className=" border-4 h-screen flex justify-center items-center content-center">


         <div className=" w-80 border-2">

            <form action={formAction} className="p-1 gap-1 flex flex-col">
               {
                  state.message && <span className=" border rounded-2xl text-center">{state.message}</span>
               }
               <div className=" flex flex-col border-2 ">
                  <label className=" stroke-slate-950" htmlFor="">FirstName</label>
                  <input type="text" name="firstname" className="rounded-2xl border-2 h-10" />
                  <label htmlFor="">Username</label>
                  <input type="text" name="username" className="  rounded-2xl border-2 h-10" />
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" className="  rounded-2xl border-2 h-10 " />
                  <input type="submit" placeholder="submit" className="border-2 rounded-2xl h-10 w-full" />
               </div>
            </form>

         </div>
      </div>
   )
}
