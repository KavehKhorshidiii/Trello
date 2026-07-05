'use server'

import { hashPass, generateJwtToken } from '@/lib/Auth/auth'
import connectDB from '@/lib/connectDB/connectDB'
import UsersModel from '@/Models/usersmodel/usersmodel'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type prevState = {
   success: null | boolean,
   errors: object,
   title:string,
   message: string
}

export default async function SignUpAction(prevState: prevState, formData: FormData): Promise<prevState> {

   await connectDB()

   const { firstname, username, password } = {
      firstname: formData.get("firstname"),
      username: formData.get("username"),
      password: formData.get("password") as string
   }

   const findUser = await UsersModel.find({ username: username })

   // check user exist
   if (findUser.length) {
      return { success: false, errors: {},title:"exist" , message: "A user has already registered with this username." }
   }

   // password 
   if (password.length <= 8 && password.length >= 20) {
      return { success: false, errors: {},title:"exist" , message: "Password must be more than 8 characters and less than 20 characters." }
   }

   // hash password
   const pass = await hashPass(password)

   // create new user
   const newUser = await UsersModel.create({ firstname, username, password: pass, role: (await UsersModel.find()).length === 0 ? "ADMIN" : "USER" })

   // JWT token 
   const JWTToken = generateJwtToken(newUser._id.toString())

   // Cookie
   const Cookie = (await cookies()).set("token", JWTToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7
   })


   redirect('/')

}
