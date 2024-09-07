import { Inter } from "next/font/google";
import Settings from "@/components/settings";
import '@/app/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WhispTalk | Settings",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return(
<div className=" flex">
    <Settings />

    {children}
   
   </div>
  )
   
}
