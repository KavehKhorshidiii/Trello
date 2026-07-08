'use client'

// import
import { useActionState, useEffect } from "react"
import SignUpAction from "./SignUpAction"
import Link from "next/link"
import Spinner from "@/components/spinnerComponent/spinner"
import { toast } from "sonner";
import { useRouter } from "next/navigation"


export default function SignUp() {

   const initialState = { success: null, title: "", errors: {}, message: "" }
   const [state, formAction, pending] = useActionState(SignUpAction, initialState)
   const router = useRouter()

   // Toast
   useEffect(() => {
      if (state.success === null) return;

      if (state.success) {
         toast.success(state.title, {
            description: state.message,
         });
      } else {
         toast.error(state.title, {
            description: state.message,
         });
      }

      setTimeout(() => {
         router.push('/')
      }, 1000)

   }, [state , router]);

   return (

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 px-5">

         <div className="w-full max-w-md bg-white h-5/6 sm:h-auto rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 hover:shadow-2xl">

            {/* Header */}
            <div className="px-6 py-6 border-b text-center"> <h1 className="text-2xl font-bold text-gray-900"> Create Your Account 🚀</h1>
               <p className="mt-2 text-sm text-gray-500"> Join TrelloClone and start organizing your projects. </p>
            </div>

            {/* Form */}
            <form action={formAction} className="p-6 space-y-5">

               {/* First Name */}
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input name="firstname" placeholder="John" className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" />
               </div>

               {/* Username */}
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700"> Username </label>
                  <input name="username" placeholder="john_doe" className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" />
               </div>

               {/* Password */}
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700"> Password </label>
                  <input type="password" name="password" placeholder="••••••••" className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" />
               </div>

               {/* Confirm Password */}
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700"> Confirm Password </label>
                  <input type="password" name="confirmPassword" placeholder="••••••••" className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" />
               </div>

               {/* Submit */}
               <button type="submit" disabled={pending} className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50" >
                  {pending ? <Spinner /> : "Create Account"}
               </button>

            </form>

            {/* Footer */}
            <div className="border-t px-6 py-5 text-center text-sm text-gray-600">Already have an account?
               <Link href="/auth/signIn" className="font-medium text-blue-600 hover:text-blue-700 transition-all duration-500 hover:font-bold " >Sign In</Link>
            </div>

         </div>

      </div>
   )
}
