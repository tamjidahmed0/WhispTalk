import { Inter } from "next/font/google";
// import "@/app/globals.css";
import Request from "@/components/requests";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Friends request | WhispTalk",
  description: "This is whispTalk",
};

export default function RootLayout({ children }) {
  return (
   <div className=" flex">
    <Request />
    {children}
   </div>
  );
}
