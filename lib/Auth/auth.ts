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

   return jwt.sign({ id: payload }, SECRET, { expiresIn: "7d" })

}

// verify JWT Token
export function verifyJwtToken(TokenValue: string):string | false | jwt.JwtPayload {

    try {

      const secret = process.env.SECRET_JWT;

      if (!secret) {
         throw new Error("SECRET_JWT is not defined")
      }

      const decoded = jwt.verify(TokenValue, secret)

      return decoded

   } catch {

      return false

   }

}
