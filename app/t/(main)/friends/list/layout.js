import { Inter } from "next/font/google";
// import "@/app/globals.css";
import FriendList from "@/components/friendList";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "All connections | WhispTalk",
  description: "This is whispTalk",
};

export default function RootLayout({ children }) {
  return (
   <div className=" flex">
   <FriendList />
    {children}
   </div>
  );
}
