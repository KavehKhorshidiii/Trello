'use server'

// imports
import connectDB from "@/lib/connectDB/connectDB"
import UsersModel from "@/Models/usersmodel/usersmodel"
import { compare } from "bcrypt"
import { cookies } from "next/headers"
import { generateJwtToken } from "@/lib/Auth/auth"
import { redirect } from "next/navigation"


// types
type prevState = {
   success: null | boolean,
   errors: object,
   title: string
   message: string
}


export default async function SignInAction(prevState: prevState, formData: FormData): Promise<prevState> {

   try {
      await connectDB()

      const { username, password } = {
         username: formData.get("username"),
         password: formData.get("password") as string
      }

      // empty field
      if (!username || !password) {
         return {
            success: false,
            errors: {},
            title: "Missing information",
            message: "Please enter both your username and password.",
         };
      }

      const findUser = await UsersModel.findOne({ username })
      // user not found
      if (!findUser) {
         return {
            success: false,
            errors: {},
            title: "User not found",
            message: "No account was found with this username.",
         };
      }

      const isMatch = await compare(password, findUser.password)
      // invalid password
      if (!isMatch) {
         return {
            success: false,
            errors: {},
            title: "Invalid credentials",
            message: "The username or password you entered is incorrect.",
         };
      }


      // JWT Token
      const JWTToken = generateJwtToken(findUser._id.toString())


      // Cookie
      const Cookie = (await cookies()).set("token", JWTToken, {
         httpOnly: true,
         path: "/",
         maxAge: 60 * 60 * 24 * 7,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
      });


      return {
         success: true,
         errors: {},
         title: "Welcome back!",
         message: "You have successfully signed in.",
      };

   } catch (err) {

      console.error(err);

      return {
         success: false,
         errors: {},
         title: "Something went wrong",
         message: "An unexpected error occurred. Please try again.",
      };

   }
}
