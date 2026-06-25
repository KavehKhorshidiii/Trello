import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

// hash password
export async function hashPass(password: string) {
   const hashPass = await bcrypt.hash(password, 10)
   return hashPass
}

// Create JWT Token
export function JWTFunc(payload: string ) {

   const SECRET = process.env.SECRET_JWT

   if (!SECRET) { throw new Error("SECRET_JWT is not defined") }

   return jwt.sign({ id: payload }, SECRET, { expiresIn: "5h" })

}

// verify JWT Token
export function verifyJwtToken(TokenValue: string) {
   
   
   const SECRET = process.env.SECRET_JWT || "random"
   
   try {
     
      const decoded = jwt.verify(TokenValue, SECRET)

      return decoded

   } catch(error) {

      console.error('Token verification failed:', error);
      return null
   }

}