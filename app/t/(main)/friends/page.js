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

const Friends = () => {
    const pathname = usePathname()
  const darkMode = useSelector((state) => state.darkMode);
  const [search, setSearch] = useState("");
  const [conversation, setConversation] = useState([])



const menuList = [
    {icon:<UserSound size={24} /> , label: 'Connection request' , link:'/t/friends/requests'},
    {icon:<UserList  size={24} /> , label: 'All friends' , link:'/t/friends/list'}
]



  return (
    <div className={`w-[24rem] ${darkMode === true ? "bg-[#161A20]" : "bg-[#F8FAFF]"}   flex flex-col py-4 `}>
      {/* <Popoup /> */}
   
      <div className="mx-5">
        <h1 className={`text-2xl font-bold ${darkMode ===true && 'text-white'}`}>Friends</h1>


{menuList.map((value, index)=>(
        <Link key={index} href={value.link} >
            
        <div key={index} className={` flex rounded-xl py-4  mt-3   ${pathname === value.link && 'bg-[#5b96f7]' }` }>
          <div className={ `flex `}>
          <span className={`text-gray-500 ${pathname === value.link && 'text-white' }   ${darkMode === true && ' text-white' }`}>{value.icon}</span>
          <h1 className={`ml-4 font-medium text-gray-500 ${pathname === value.link && ' text-white' }   ${darkMode === true && ' text-white' }   `}>{value.label}</h1>    
          </div>
     
             
    </div>
        </Link>
))}
  

      </div>
    </div>
  );
};

export default Friends;

