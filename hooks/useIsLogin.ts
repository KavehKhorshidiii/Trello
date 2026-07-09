
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export function useIsLogin() {


   const queryClient = useQueryClient(); // Query Client
   const route = useRouter() // useRoute


   // check Login & user Data
   const authCheck = async () => {
      const res = await fetch("/api/authCheck");
      return res.json();
   };
   const { data, isLoading, error } = useQuery({
      queryKey: ["authCheck"],
      queryFn: authCheck,
   });


   // sign out -> /api/authChe
   const signOut = useMutation({
      mutationFn: async () => {
         const res = await fetch('/api/authCheck', {
            method: "POST"
         })
         return res.json()
      },
      onSuccess: () => {
         queryClient.clear();
         route.push('/')
      }

   })


   return {
      isLogin: data?.success ?? false,
      data: data?.data ?? null,
      isLoading,
      signOut,
      error
   };

   
}