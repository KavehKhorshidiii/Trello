import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

// hash password
export async function hashPass(password: string) {
   const hashPass = await bcrypt.hash(password, 10)
   return hashPass
}

// JWT Token
export function JWTFunc(payload: {id:string}) {

   const SECRET = process.env.SECRET_JWT

   console.log("payload=>",payload)

   if (!SECRET) {
      throw new Error("SECRET_JWT is not defined");
   }

   return jwt.sign({id:payload}, SECRET, { expiresIn: "5h" })

}