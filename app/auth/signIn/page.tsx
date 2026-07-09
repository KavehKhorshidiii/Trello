'use client'

// imports
import { useActionState, useEffect } from "react"
import SignInAction from "@/app/auth/signIn/SignInAction"
import Spinner from "@/components/spinnerComponent/spinner"
import Link from "next/link"
import { toast } from "sonner";
import { useRouter } from "next/navigation"


export default function SignIn() {

   const initialValue = { success: null, errors: {}, title: "", message: "" }
   const [state, formAction, pending] = useActionState(SignInAction, initialValue)
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

      router.push("/");

   }, [state , router]);

   return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 px-5">

         <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 hover:shadow-2xl">

            {/* Header */}
            <div className="p-6 border-b text-center">
               <h1 className=" text-xl sm:text-2xl font-bold text-gray-900">Welcome Back 👋</h1>
               <p className="mt-2 text-sm text-gray-500">Sign in to continue to your workspace</p>
            </div>

            {/* Form */}
            <form action={formAction} className="p-6 space-y-5">

               {/* Username */}
               <div className="space-y-2 mb-2 sm:mb-5">
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <input name="username" placeholder="Enter your username" className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" />
               </div>

               {/* Password */}
               <div className="space-y-2 mb-2 sm:mb-5">
                  <label className="text-sm font-medium text-gray-700">Password</label>

                  <input type="password" name="password" placeholder="••••••••" className="w-full rounded-lg border px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none" />
               </div>


               {/* Submit */}
               <button type="submit" disabled={pending} className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50">
                  {pending ? <Spinner /> : "Sign In"}
               </button>

            </form>

            {/* Footer */}
            <div className="border-t px-6 py-5 text-center text-sm text-gray-600">Don`t have an account?
               <Link href="/auth/signUp" className="font-medium pl-1 text-blue-600 transition-all duration-500 hover:text-blue-700 hover:font-bold "> Create one</Link>
            </div>

         </div>

      </div>
   )
}
