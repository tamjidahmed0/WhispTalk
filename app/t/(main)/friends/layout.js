import { Inter } from "next/font/google";
// import "../../../globals.css";
import '../globals.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Friends | WhispTalk",
  description: "This is whispTalk",
};

export default function RootLayout({ children }) {
  return (
   <div className=" flex">
    {children}
   </div>
  );
}
