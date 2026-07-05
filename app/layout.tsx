import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import QueryProviders from "@/QueryProviders";
import { Toaster } from "sonner";

import "./globals.css";


export const metadata: Metadata = {
   title: "Trello",
   description: "A Trello clone built with Next.js",
};


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

   return (
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
         <body className="min-h-full flex flex-col">
            <QueryProviders>
               {children}
               <Toaster position="top-center" richColors closeButton />
            </QueryProviders>
         </body>
      </html>
   );
}
