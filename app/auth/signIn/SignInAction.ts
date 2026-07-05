'use server'

import connectDB from "@/lib/connectDB/connectDB"
import UsersModel from "@/Models/usersmodel/usersmodel"
import { compare } from "bcrypt"
import { cookies } from "next/headers"
import { generateJwtToken } from "@/lib/Auth/auth"
import { redirect } from "next/navigation"



type prevState = {
   success: null | boolean,
   errors: object,
   title:string
   message: string
}



export default async function SignInAction(prevState: prevState, formData: FormData): Promise<prevState> {

   await connectDB()

   const { username, password } = {
      username: formData.get("username"),
      password: formData.get("password") as string
   }

   const findUser = await UsersModel.findOne({ username })

   if (!findUser) {
      return { success: false, errors: {}, title:"exist" , message: "This user does not exist." }
   }

   const isMatch = await compare(password, findUser.password) // output -> boolean

   if (!isMatch) {
      return { success: false, errors: {} , title:"exist" , message: "The password or username is incorrect." }
   }

   // JWT Token
   const JWTToken = generateJwtToken(findUser._id.toString())

   // Cookie
   const Cookie = (await cookies()).set("token", JWTToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7
   })

   redirect('/')
   
}
