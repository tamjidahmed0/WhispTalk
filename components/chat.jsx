"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass, SlidersHorizontal, ChatDots } from "@phosphor-icons/react";
import { useSelector, useDispatch } from "react-redux";
import getAllChat from "@/lib/getAllChats";
import MessageRequests from "@/modal/messageRequest";
import getMsgRequest from "@/lib/getMessageRequest";
import { addUser, updateUserById, removeUserById } from "@/features/chatSlice";
import { usePathname } from "next/navigation";
import { useSocketContext } from "@/context/socket";
import SearchResult from "@/lib/searchResult";
import tamjid from "@/public/tamjid.jpg";

const Chat = () => {
  const socket = useSocketContext();
  const darkMode = useSelector((state) => state.darkMode);
  const conversation = useSelector((state) => state.chats.users);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  // const [conversation, setConversation] = useState([]);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [requestData, setRequestData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [userTyping , setUserTyping] = useState(false)
  const [receiverText , setReceiverText] = useState('')
  const pathname = usePathname();

  const openModal = () => setOpenRequestModal(true);
  const closeModal = () => setOpenRequestModal(false);

  useEffect(() => {
    const getChat = async () => {
      try {
        const result = await getAllChat(search);
        dispatch(addUser(result));
        // setConversation(result);
      } catch (error) {
        console.log(error);
      }
    };
    getChat();
  }, []);

  useEffect(() => {
    const getMessageRequest = async () => {
      try {
        const requestData = await getMsgRequest();
        setRequestData(requestData);
      } catch (error) {
        console.log(error, "error");
      }
    };
    getMessageRequest();
  }, []);

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const search_result = await SearchResult(search);
        const { search_data, msg } = search_result;
        setSearchResult(search_data);
        // console.log(search_result)
      } catch (error) {
        console.log(error);
      }
    };

    getSearchResult();
  }, [search]);

  //Receive message

  useEffect(() => {
    if (socket) {
      socket.on("receivermessage", (data) => {
        console.log(data, "chat.jsx");

        const trimText = data.text.substring(0, 23);
        dispatch(updateUserById({ Id: data.iSend, newText: trimText }));
        setReceiverText(trimText)
      });
    }

    //cleanup function
    return () => {
      if (socket) {
        socket.off("receivermessage");
      }
    };
  }, [socket]);




  useEffect(()=>{

    if(socket){
      socket.on('messageRequest', (data)=>{
        console.log(data, 'message req')
        setRequestData((prev)=>({
          ...prev,
          count: data.count,
          msg: data.msg
        }))
      })
    }

return () =>{
  if(socket){
    socket.off('messageRequest')
  }
}

  },[socket])












  return (
    <div className={`w-[24rem] ${darkMode ? "bg-[#161A20]" : "bg-[#F8FAFF]"} flex flex-col py-4`}>
      <div className="mx-5">
        <h1 className={`text-2xl font-bold ${darkMode && "text-white"}`}>Chats</h1>
        <div className="flex items-center w-full bg-blue-100 rounded-full px-2 py-4 mt-5 relative">
          <MagnifyingGlass className="text-blue-500 mx-2" size={24} />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="bg-transparent flex-1 outline-none text-blue-500" />
          <SlidersHorizontal className="text-blue-500 mx-2" size={24} />

          <div className={` shadow-md absolute ${darkMode ? "bg-[#252729]" : "bg-[#FFF]"} top-16 z-30 rounded-lg`}>
            {searchResult?.map((value, index) => (
              <Link href={`/t/messages/${value.Id}`} className=" flex items-center ps-6 py-4 w-80 " key={index}>
                <Image src={`${process.env.NEXT_PUBLIC_API}/${value.profile}`} width={200} height={200} objectFit="cover" className="rounded-full w-[3rem] h-[3rem] object-cover" />
                <h1 className={`font-bold ml-4 ${darkMode && "text-white"}`}>{value.name}</h1>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 cursor-pointer" onClick={openModal}>
          <div className="relative flex items-center">
            <ChatDots className="text-blue-500 mx-2" size={35} />
            {requestData.count >= 1 ? <span className="text-gray-500">{requestData.msg}</span> : <span className="text-gray-500">Message requests</span>}

            {requestData.count >= 1 && <span className="absolute -top-3 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold text-white w-6 h-6">{requestData.count}</span>}
          </div>

          {/* Modal Component */}
        </div>

        <div className="overflow-y-auto h-[calc(100vh-14rem)] mt-10">
          {Array.isArray(conversation) && conversation.length > 0 ? (
            conversation.map((user, index) => {
              const isActive = pathname.startsWith(`/t/messages/${user.Id}`);
              return (
                <Link href={`/t/messages/${user.Id}`} key={index}>
                  <div className={`${isActive && `${darkMode ? "bg-[#2b2b2b]" : "bg-blue-300"}`} mb-4 py-5 px-4 flex rounded-xl ${darkMode ? "bg-[#1E262F]" : "bg-white"} relative `}>
                    <Image src={`${process.env.NEXT_PUBLIC_API}/${user.profile}`} width={200} height={200} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />
                    <div className={`ml-4 ${darkMode && "text-white"}`}>
                      <h1 className="font-bold">{user.name}</h1>
                      <p className={`${darkMode ? "text-white" : "text-gray-500"} mt-1 ${userTyping && 'text-green-500'}`}>{user.text}</p>
                    </div>
                    <div className="absolute right-5 flex flex-col">
                      <span className="text-gray-500">{user.date}</span>
                      {/* <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">2</span> */}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div>
              <h1 className={`${darkMode ? "text-white" : "text-gray-500"}`}>No conversations available.</h1>
            </div>
          )}

          <MessageRequests isOpen={openRequestModal} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
