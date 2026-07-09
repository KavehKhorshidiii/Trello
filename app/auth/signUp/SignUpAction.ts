'use server'


import { hashPass, generateJwtToken } from '@/lib/Auth/auth'
import connectDB from '@/lib/connectDB/connectDB'
import UsersModel from '@/models/usersmodel/usersmodel'
import { cookies } from 'next/headers'


// types
type prevState = {
   success: null | boolean,
   errors: object,
   title: string,
   message: string
}


export default async function SignUpAction(prevState: prevState, formData: FormData): Promise<prevState> {

   try {
      await connectDB()

      const { firstname, username, password } = {
         firstname: formData.get("firstname"),
         username: formData.get("username")?.toString().toLowerCase(),
         password: formData.get("password") as string
      }


      // Required fields
      if (!firstname || !username || !password) {
         return {
            success: false,
            errors: {},
            title: "Missing information",
            message: "Please fill in all required fields."
         }
      }

      // Username already exists
      const findUser = await UsersModel.find({ username: username })

      if (findUser.length > 0) {
         return {
            success: false,
            errors: {},
            title: "Username unavailable",
            message: "This username is already in use. Please choose another one."
         }
      }

      // Password length
      if (password.length < 7 || password.length > 20) {
         return {
            success: false,
            errors: {},
            title: "Weak password",
            message: "Your password must be between 8 and 20 characters."
         }
      }

      // Hash password
      const hashedPassword = await hashPass(password)

      // First user becomes ADMIN
      const usersCount = await UsersModel.countDocuments()

      const newUser = await UsersModel.create({
         firstname,
         username,
         password: hashedPassword,
         role: usersCount === 0 ? "ADMIN" : "USER",
      })

      // JWT
      const token = generateJwtToken(newUser._id.toString());

      // Cookie
      (await cookies()).set("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         path: "/",
         maxAge: 60 * 60 * 24 * 7,
      })

      return {
         success: true,
         errors: {},
         title: "Account created",
         message: "Your account has been created successfully. Welcome aboard!"
      }

   } catch (err) {

      console.error(err)

      return {
         success: false,
         errors: {},
         title: "Registration failed",
         message: "Something went wrong. Please try again."
      }

   }

}

