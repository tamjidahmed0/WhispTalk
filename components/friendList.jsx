"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { UserSound , UserList  } from "@phosphor-icons/react";
import tamjid from "@/public/tamjid.jpg";
import { useSelector } from "react-redux";
import getAllChat from "@/lib/getAllChats";
import Popoup from "@/modal/popoup";
import { usePathname } from "next/navigation";

const FriendList = () => {
    const pathname = usePathname()
  const darkMode = useSelector((state) => state.darkMode);
  const [search, setSearch] = useState("");
  const [conversation, setConversation] = useState([])



const menuList = [
    {icon:<UserSound size={24} /> , label: 'Connection request' , link:'/t/friends/request'},
  
]



  return (
    <div className={`w-[24rem] ${darkMode === true ? "bg-[#161A20]" : "bg-[#F8FAFF]"}   flex flex-col py-4 `}>
      {/* <Popoup /> */}
   
      <div className="mx-5">
        <h1 className={`text-2xl font-bold ${darkMode ===true && 'text-white'}`}>All connections</h1>


        <div className=" flex mt-20">
        <Image src={tamjid} width={60} height={60} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />
        <div className=" flex flex-col ml-3 items-center justify-center">
        <h1 className=" font-semibold text-lg">Tamjid Ahmed</h1>
     
        </div>
        </div>
  

      </div>
    </div>
  );
};

export default FriendList;

