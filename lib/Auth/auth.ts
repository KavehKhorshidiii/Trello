import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// hash password
export async function hashPass(password: string) {
   const hashedPassword = await bcrypt.hash(password, 10)
   return hashedPassword
}

// Create JWT Token
export function generateJwtToken(payload: string) {

   const SECRET = process.env.SECRET_JWT

   if (!SECRET) { throw new Error("SECRET_JWT is not defined") }

   return jwt.sign({ id: payload }, SECRET, { expiresIn: "5h" })

}

// verify JWT Token
export function verifyJwtToken(TokenValue: string) {

    try {

      if (!process.env.SECRET_JWT) {
         throw new Error("SECRET_JWT is not defined")
      }

      const decoded = jwt.verify(TokenValue, process.env.SECRET_JWT)

      return decoded

   } catch {

      return false

   }

}
