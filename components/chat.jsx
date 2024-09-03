"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
import tamjid from "@/public/tamjid.jpg";
import { useSelector } from "react-redux";
import getAllChat from "@/lib/getAllChats";
import Popoup from "@/modal/popoup";

const Chat = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const [search, setSearch] = useState("");
  const [conversation, setConversation] = useState([])

useEffect(()=>{

  const getChat = async () =>{
    try {
      const result = await getAllChat(search)
      setConversation(result)
   
    } catch (error) {
      console.log(error)
    }


 

  }
  getChat()

},[])





  return (
    <div className={`w-[24rem] ${darkMode === true ? "bg-[#161A20]" : "bg-[#F8FAFF]"}   flex flex-col py-4 `}>
      {/* <Popoup /> */}
   
      <div className="mx-5">
        <h1 className={`text-2xl font-bold ${darkMode ===true && 'text-white'}`}>Chats</h1>

        <div className={`flex items-center w-full bg-blue-100 rounded-full px-2 py-4 mt-5 `}>
          {/* Search Icon */}
          <MagnifyingGlass className={`text-blue-500 mx-2 `} size={24} />

          {/* Input */}
          <input type="text" placeholder="Search" className="bg-transparent flex-1 outline-none text-blue-500" />

          {/* Filter Icon */}
          <SlidersHorizontal className="text-blue-500 mx-2" size={24} />
        </div>

        <h1 className="text-gray-400 mt-8">All Chats</h1>

        {/* Scrollable Chats Section */}





        <div className="overflow-y-auto h-[calc(100vh-14rem)] mt-5 ">

        {Array.isArray(conversation) && conversation.length > 0 ? (
  conversation.map((user, index) => (
    <Link href={`/t/messages/${user.Id}`} key={index}>
      <div className={`mb-4 py-5 px-4 flex rounded-xl ${darkMode ? 'bg-[#1E262F]' :'bg-white'} relative`}>
        <Image src={`${process.env.NEXT_PUBLIC_API}/${user.profile}`} width={60} height={60} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />
        <div className={`ml-4 ${darkMode && 'text-white'}`}>
          <h1 className="font-bold">{user.name}</h1>
          <p className={`${darkMode ?  'text-white' : 'text-gray-500'} text-gray-500 mt-1`}>{user.text}</p>
        </div>
        <div className="absolute right-5 flex flex-col">
          <span className="text-gray-500">{user.date}</span>
          <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">2</span>
        </div>
      </div>
    </Link>
  ))
) : (
  <div><h1 className={`${darkMode ?  'text-white' : 'text-gray-500'}`}>No conversations available.</h1></div>
)}




        

          {/* Add more chat items here */}
        </div>
      </div>
    </div>
  );
};

export default Chat;