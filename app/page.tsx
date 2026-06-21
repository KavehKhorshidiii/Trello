import Navbar from "@/components/navbar";
import SignUp from "./AuthPage/signup/page";

export default function Home() {
   return (
      <div className=" min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 ">
         <Navbar></Navbar>
         <SignUp></SignUp>
      </div>
   );
}
