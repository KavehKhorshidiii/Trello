import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import QueryProviders from "@/QueryProviders";
import "./globals.css";


export const metadata: Metadata = {
   title: "Trello",
   description: "A Trello clone built with Next.js",
};


export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html
         lang="en"
         className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      >
         <body className="min-h-full flex flex-col">
            <QueryProviders>
               {children}
            </QueryProviders>
         </body>
      </html>
   );
}
