'use client'

export default function SignIn() {


   return (
      <div>
         <div className=" w-80 border-2">

            <form className="p-1 gap-1 flex flex-col">
               <div className=" flex flex-col border-2 ">
                  <label htmlFor="">Username</label>
                  <input type="text" name="username" className="  rounded-2xl border-2 h-10" />
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" className="  rounded-2xl border-2 h-10 " />
                  <button type="submit" className="border-2 rounded-2xl h-10 w-full">Login</button>
               </div>
            </form>

         </div>

      </div>
   )
}
