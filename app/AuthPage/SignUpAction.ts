'use server'

import { hashPass, JWTFunc } from '@/lib/auth'
import connectDB from '@/lib/connectDB/connectDB'
import UsersModel from '@/Models/usersmodel/usersmodel'
import { cookies } from 'next/headers'

type prevState = {
   success: null | boolean,
   errors: object,
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
      return { success: false, errors: {}, message: "A user has already registered with this username." }
   }

   // password 
   if(password.length <= 8 && password.length >= 20){
      return { success: false, errors: {}, message: "Password must be more than 8 characters and less than 20 characters." }
   }


   // hash password
   const pass = await hashPass(password)

   // create new user
   const newUser = await UsersModel.create({ firstname, username, password:pass })

   // JWT token 
   const JWTToken = JWTFunc({id:newUser._id.toString()})
   console.log("JWTToken =>" , JWTToken)

   // Cookie
   const Cookie = (await cookies()).set("token" , JWTToken , {
      httpOnly:true,
      path:"/"
   })

   // success return
   return { success: true, errors: {}, message: "User SignUp Successfully" }

}
