"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import tamjid from "@/public/tamjid.jpg";
import { Phone, DotsThreeCircle, PaperPlaneRight, Smiley, Paperclip } from "@phosphor-icons/react";
import RightSidebar from "@/components/rightSidebar";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/app/features/toggleSlice";
import getAllMessages from "@/lib/getAllMessages";
import getProfileDetails from "@/lib/getProfileDetails";
import { setDetails } from "@/app/features/rightsidebarSlice";
import { useSocketContext } from "@/context/socket";
import getCookie from "@/services/getCookie";

const DynamicMessagesPage = ({ params }) => {
  const socket = useSocketContext();
  console.log(params.message_id, "params");
  const dispatch = useDispatch();
  const isToggled = useSelector((state) => state.toggle.value);
  const darkMode = useSelector((state) => state.darkMode);
  const [messages, setMessages] = useState([]);
  const [receiverDetails, setReceiverDetails] = useState({});
  const [inputText, setInputText] = useState("");
  const [profileDetails, setProfileDetails] = useState({});

  //Message fetch
  useEffect(() => {
    const getMessages = async () => {
      try {
        const userId = await getCookie("c_user");

        const result = await getAllMessages(params.message_id);
        const profile = await getProfileDetails(userId.value);

        const { data, ...reminingResult } = result;

        // console.log(profile, 'profile')

        setProfileDetails(profile);

        setMessages(data);
        setReceiverDetails(reminingResult);

        dispatch(setDetails({ receiverName: result.receiverName, receiverPic: result.receiverPic, receiverUsername: result.receiverUsername }));
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, []);


  const handleMessagesChange = (e) => {
    setInputText(e.target.value);
  };


  //send messages

  const handleSend = () => {
    if (inputText.length !== 0 || inputText.trim().length !== 0) {
      if (socket) {
        // Emit the message using the existing socket

        const date = new Date();
        const timeString = date.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        });

        //send socket message to server
        socket.emit("sendMessage", {
          name: profileDetails.name,
          profile: profileDetails.profilePic,
          senderId: profileDetails.id,
          receiverId: params.message_id,
          text: inputText,
          socketId: socket.id,
          types: "text",
          Dates: timeString,
        });
      }
    }

    setInputText("");
  };

  //Outgoing message
  useEffect(() => {
    if (socket) {
      socket.on("sendermsg", (data) => {
        setMessages((msg) => [...msg, data]);
      });
    }

    //cleanup function
    return () => {
      if (socket) {
        socket.off("sendermsg");
      }
    };
  }, [socket]);



  //Receive message

  useEffect(() => {
    if (socket) {
      socket.on("receivermessage", (data) => {
        if (params.message_id === data.iSend) {
          setMessages((msgs) => [...msgs, data]);
        }
      });
    }

    //cleanup function
    return () => {
      if (socket) {
        socket.off("receivermessage");
      }
    };
  }, [socket]);



  const handleCall = () =>{
    console.log('call')
  } 






  //31rem initial

  return (
    <div className="flex">
      <div className=" bg-[#f0f4fa]  ">

      {/* start header */}
        <div className={`${isToggled ? "w-[calc(100vw-56rem)]" : "w-[calc(100vw-31rem)]"} ${darkMode === true ? "bg-[#1E262F]" : "bg-white"}    h-[7rem] flex items-center justify-between border-r`}>
          <div className="ml-7 flex items-center ">
            <Image src={`${process.env.NEXT_PUBLIC_API}/${receiverDetails.receiverPic}`} width={60} height={60} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />
            <div className="pl-3">
              <h1 className={`font-bold text-lg ${darkMode === true && "text-white"}`}>{receiverDetails.receiverName}</h1>
              <span className="text-green-500">Online</span>
            </div>
          </div>

          <div className="mr-20 flex ">
            <div className=" mr-5 p-3  rounded-xl" >
              <Phone className="text-blue-500 cursor-pointer" size={30} onClick={handleCall} />
            </div>

            <div className={`${isToggled && "bg-blue-500 "}  p-3  rounded-xl`} >
              <DotsThreeCircle className={`${isToggled ? "text-white" : "text-blue-500"}  cursor-pointer `} size={30} onClick={() => dispatch(toggle())}/>
            </div>
          </div>
        </div>

        {/* end header */}


        {/* start body */}

        <div className={`h-[calc(100vh-12rem)] overflow-y-auto py-5 ${darkMode === true && "bg-black"}`}>
          {messages?.map((data, index) => (
            <div key={index} className={`flex mb-1 ${data.whoSend ? "" : "justify-end"} mx-5 mb-10`}>
              <div className="w-24 h-9 rounded-full flex items-center justify-center">
                <Image src={`${process.env.NEXT_PUBLIC_API}/${data.profile}`} width={50} height={50} objectFit="cover" className={`${data.whoSend ? "" : "hidden"} rounded-full w-[4rem] h-[4rem] object-cover`} />
              </div>
              {data.type === "image" ? (
                <Image src={`${process.env.NEXT_PUBLIC_API}/${data.text}`} width={400} height={400} className="rounded-md border" />
              ) : data.type === "audio" ? (
                <div ref={(ref) => (waveformRefs.current[index] = ref)}>
                  <button onClick={() => playAudio(index)}>Play</button>
                </div>
              ) : (
                <div className={`flex max-w-96  rounded-lg p-3 gap-3 items-start  cursor-pointer ${data.whoSend ? " bg-white" : "bg-blue-500 "}`}>
                  <p className={`text-gray-700 ${data.whoSend ? "text-black" : "text-white "}`}>{data.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* end body */}

        {/* input text */}

        <div className={`h-[5rem] ${darkMode === true ? "bg-[#1E262F]" : "bg-white"} border-r flex`}>
          <div className="flex items-center bg-blue-100 p-2 rounded-full w-full max-w-[80rem] m-auto ">
            <Paperclip className="text-blue-500 mx-2" size={24} />
            <input type="text" value={inputText} onChange={handleMessagesChange} placeholder="Write a message..." className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400" />
            <Smiley className="text-blue-500 mx-2" size={24} />
            <button className="bg-blue-500 p-2 rounded-full">
              <PaperPlaneRight onClick={handleSend} className="text-white" size={24} />
            </button>
          </div>
        </div>

        {/* end input text */}
      </div>

      {/* start right sidebar */}

      {isToggled && <RightSidebar />}

      {/* end right sidebar */}
    </div>
  );
};

export default DynamicMessagesPage;
