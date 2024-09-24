"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import tamjid from "@/public/tamjid.jpg";
import { Phone, DotsThreeCircle, PaperPlaneRight, Smiley, Paperclip, DotsThreeVertical, X } from "@phosphor-icons/react";
import RightSidebar from "@/components/rightSidebar";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/features/toggleSlice";
import getAllMessages from "@/lib/getAllMessages";
import getProfileDetails from "@/lib/getProfileDetails";
import { setDetails } from "@/features/rightsidebarSlice";
import { useSocketContext } from "@/context/socket";
import getCookie from "@/services/getCookie";
import { setHandleCall } from "@/features/handleCallSlice";
import OutgoingCallLayout from "@/components/outgoingCallLayout";
import { setMessageId } from "@/features/messageid";
import { updateUserById } from "@/features/chatSlice";


const DynamicMessagesPage = ({ params }) => {
  const socket = useSocketContext();
  // console.log(params.message_id, "params");
  const dispatch = useDispatch();
  const isToggled = useSelector((state) => state.toggle.value);
  const handleClick = useSelector((state) => state.handleCall.value);
  const messageid = useSelector((state) => state.messageId.messageid);
  const conversation = useSelector((state) => state.chats.users);
  const darkMode = useSelector((state) => state.darkMode);
  const [messages, setMessages] = useState([]);
  const [receiverDetails, setReceiverDetails] = useState({});
  const [userTyping, setUserTyping] = useState(false)
  const [inputText, setInputText] = useState("");
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('')
  const [offset, setOffset] = useState(0);
  const messagesEndRef = useRef(null);
  const chatWindowRef = useRef(null);
  const [receiverText, setReceiverText] = useState('')
  const [messageInfo, setMessageInfo] = useState(false)
  const [openRemoveModal, setOpenRemoveModal] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null);
  const limit = 30;


  //Message fetch
  useEffect(() => {


    // console.log(idmessage, 'idmessage')

    const getMessages = async () => {
      try {
        const userId = await getCookie("c_user");
        setId(userId.value)

        const result = await getAllMessages(params.message_id, limit, 0);
        const profile = await getProfileDetails(userId.value);
        // console.log(profile, 'profile')

        const { data, ...reminingResult } = result;

        // console.log(profile, 'profile')
        // console.log(data)

        setProfileDetails(profile);

        setMessages(data);
        setReceiverDetails(reminingResult);
        // console.log(reminingResult, 'remining reslt')

        dispatch(setDetails({ receiverName: result.receiverName, receiverPic: result.receiverPic, receiverUsername: result.receiverUsername, receiverAbout: result.receiverAbout }));
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
        const trimText = data.text.substring(0, 23);
        dispatch(updateUserById({ Id: params.message_id, newText: `You: ${trimText}` }))
      });
    }

    //cleanup function
    return () => {
      if (socket) {
        socket.off("sendermsg");
      }
    };
  }, [socket]);





  const handleEnterKeyPress = (e) => {


    if (e.key === "Enter") {
      handleSend()
    }


  }






  //Receive message

  useEffect(() => {
    if (socket) {
      socket.on("receivermessage", (data) => {
        if (params.message_id === data.iSend) {
          setMessages((msgs) => [...msgs, data]);
          const trimText = data.text.substring(0, 23);
          dispatch(updateUserById({ Id: params.message_id, newText: trimText }))
          setReceiverText(trimText)
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



  useEffect(() => {


    if (socket) {
      socket.emit('typing', {
        typingValue: inputText,
        senderId: profileDetails.id,
        receiverId: params.message_id
      })
    }

    return () => {
      if (socket) {
        socket.off('typing')
      }
    }


  }, [inputText])


  useEffect(() => {


    if (socket) {
      socket.on('typing', (data) => {
        // console.log(data, 'typing data...')
        setUserTyping(data.isUserTyping)



        const currentUser = conversation.find((user) => user.Id === data.typerId)



        if (data.isUserTyping) {
          dispatch(updateUserById({
            Id: data.typerId,
            newText: 'Typing...'
          }));
        }
        // Revert back to the previous value when typing stops
        else {
          dispatch(updateUserById({
            Id: data.typerId,
            newText: currentUser?.text && receiverText

          }));
        }







      })
    }

    return () => {
      if (socket) {
        socket.off('typing')
      }
    }


  }, [socket, inputText, receiverText])









  const handleCall = async () => {


    dispatch(setHandleCall())

    // if( socket){
    //   socket.emit('user:incomming' , {
    //     id:id,
    //     requestForCalling:params.message_id,
    //     callerSocketId:socket.id,
    //     // peerOffer: peerId
    //   })

    // }

    // console.log(id, 'click id')

  }



  useEffect(() => {

    dispatch(setMessageId(params.message_id))



  }, [])

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);




  const openMessageInfo = (index) => {
    setActiveIndex(index)
    // console.log(index)
    setMessageInfo((prev) => !prev)
  
  }



  const removeMessageModal = () => {
    setOpenRemoveModal((prev) => !prev)
    openMessageInfo()
  }



  const unsent = async ( {messageId, index}) =>{
   
    const date = new Date();
    const timeString = date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    // console.log(index)
    const userId = (await getCookie('c_user')).value

    if(socket){
     socket.emit('senderUnsent', {
      messageId : messageId,
      socket:socket.id,
      userId,
      receiverId: messageid,
      name: profileDetails.name,
      profile: profileDetails.profilePic,
      types: "text",
      Dates: timeString,


     })
    }
  }




  const updateMessageStatus = (removedMessageId) => {
    setMessages((prevMessages) => 
    
      prevMessages.map((message) =>
     
        message.messageId === removedMessageId.messageId
          ? { ...message, text: removedMessageId.text, unsent: removedMessageId.unsent } // Update text or any other field
          : message
      )
    );
  };

  useEffect(()=>{

    if(socket){
      socket.on('senderUnsent', (data)=>{
        console.log(data, 'userunsend')
        // setMessages((msgs) => [...msgs, data]);
        updateMessageStatus(data);
        setOpenRemoveModal(false)
      })





      socket.on('_senderUnsent', (data)=>{
        updateMessageStatus(data);
        setOpenRemoveModal(false)
      })


    }


    return () =>{
      if(socket){
        socket.off('senderUnsent')
        socket.off('_senderUnsent')
      }
    }



  },[socket])




  //31rem initial

  return (
    <div className="flex">
      <div className=" bg-[#f0f4fa]  ">

        {/* start header */}
        <div className={`${isToggled ? "w-[calc(100vw-56rem)]" : "w-[calc(100vw-31rem)]"} ${darkMode === true ? "bg-[#1E262F]" : "bg-white"}    h-[7rem] flex items-center justify-between border-r`}>
          <div className="ml-7 flex items-center ">
            <Image  src={`${process.env.NEXT_PUBLIC_API}/${receiverDetails.receiverPic}`} width={200} height={200} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />
            <div className="pl-3">
              <h1 className={`font-bold text-lg ${darkMode === true && "text-white"}`}>{receiverDetails.receiverName}</h1>
              <span className="text-green-500">{userTyping ? 'Typing...' : 'Online'}</span>
            </div>
          </div>



          <div className="mr-20 flex ">
            <div className=" mr-5 p-3  rounded-xl" >
              <Phone className="text-blue-500 cursor-pointer" size={30} onClick={handleCall} />
            </div>

            <div className={`${isToggled && "bg-blue-500 "}  p-3  rounded-xl`} >
              <DotsThreeCircle className={`${isToggled ? "text-white" : "text-blue-500"}  cursor-pointer `} size={30} onClick={() => dispatch(toggle())} />
            </div>
          </div>
        </div>

        {/* end header */}


        {/* start body */}

        <div className={`h-[calc(100vh-12rem)] overflow-y-auto py-5 ${darkMode === true && "bg-[#151B23]"}`}>
          <div className=" flex flex-col items-center justify-center mb-32">
            <Image alt="image" src={`${process.env.NEXT_PUBLIC_API}/${receiverDetails.receiverPic}`} width={200} height={200} objectFit="cover" className="rounded-full w-[6rem] h-[6rem] object-cover" />
            <h1 className={`font-bold text-xl mt-4 ${darkMode === true && 'text-white'}`}>{receiverDetails.receiverName}</h1>
            <span className={`font-medium text-sm  w-[20rem] text-center ${darkMode === true ? 'text-white' : 'text-gray-500'}`}>{receiverDetails.receiverAbout}</span>
          </div>
          {messages?.map((data, index) => (


            <div key={index} className={`flex mb-1 ${data.whoSend ? "" : "justify-end"} mx-5 mb-10`}>

              <div className="w-24 h-9 rounded-full flex items-center justify-center">
                <Image src={`${process.env.NEXT_PUBLIC_API}/${data.profile}`} width={200} height={200} objectFit="cover" className={`${data.whoSend ? "" : "hidden"} rounded-full w-[4rem] h-[4rem] object-cover`} />
              </div>
              {data.type === "image" ? (
                <Image src={`${process.env.NEXT_PUBLIC_API}/${data.text}`} width={400} height={400} className="rounded-md border" />
              ) : data.type === "audio" ? (
                <div ref={(ref) => (waveformRefs.current[index] = ref)}>
                  <button onClick={() => playAudio(index)}>Play</button>
                </div>
              ) : (
                <div className=" flex items-center relative">
                  <div className={`flex rounded-lg p-3 gap-3 items-start cursor-pointer ${data.whoSend ? `${darkMode ? 'bg-[#4C4C4C]' : 'bg-white'}` : "bg-blue-500 "} max-w-xs`}>
                    <p className={`text-gray-700 ${data.whoSend ? `${darkMode && ' text-white'}` : "text-white "} ${data.unsent && ' italic'} break-words overflow-hidden`}>
                      {data.text}
                    </p>
 
                  </div>

                  {data.whoSend ? '' :  (
                    <DotsThreeVertical size={30} className=" cursor-pointer absolute -left-9" onClick={()=> openMessageInfo(index)} />
                  )}

                  {activeIndex === index &&(
                    <div className=" absolute bg-white -top-[8rem] -left-[10rem] px-10 py-4 flex flex-col space-y-4 rounded">
                      <span className=" cursor-pointer" onClick={removeMessageModal}>Remove</span>
                      {/* <span>Forward</span> */}
                    </div>
                  )}


                  {openRemoveModal && (
                 
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                      {/* Background overlay */}
                      <div className="absolute inset-0 " ></div>

                      {/* Modal content */}
                      <div className={`relative  text-black rounded-lg px-10 py-11 w-[30rem] ${darkMode === true ? "bg-[#1E262F]" : "bg-white"}`}>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-12 border-b">
                          <h2 className={`text-2xl font-bold ${darkMode === true && "text-white"}`}>Who do you want to unsend this message for?</h2>
                          <button className="text-gray-400 " onClick={removeMessageModal}>
                            <X size={24} />
                          </button>
                        </div>

                        {/* Options */}
                        <div className={`space-y-4 ${darkMode === true && "text-white"}`}>

                          <input
                            type="radio"
                            id="unsend-everyone"
                            name="unsend"
                            className="mr-2 transform scale-150" // This scales the radio button
                            defaultChecked
                          />

                          <span className=" font-bold text-xl">Unsend for everyone</span>




                          <div className=" flex justify-end ">
                            <button onClick={()=> setOpenRemoveModal(false)} className=" mr-7 px-6 py-3  text-xs font-bold text-centert text-blue-500 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                              Cancel
                            </button>

                            <button
                              className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              type="button"
                              onClick={()=> unsent({messageId : data.messageId, index})}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  )}









                </div>



              )}
            </div>


          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* end body */}

        {/* input text */}

        <div className={`h-[5rem] ${darkMode === true ? "bg-[#1E262F]" : "bg-white"} border-r flex`}>
          <div className="flex items-center bg-blue-100 p-2 rounded-full w-full max-w-[80rem] m-auto ">
            <Paperclip className="text-blue-500 mx-2" size={24} />
            <input type="text" onKeyDown={handleEnterKeyPress} value={inputText} onChange={handleMessagesChange} placeholder="Write a message..." className="flex-1 bg-transparent outline-none text-blue-900 placeholder-blue-400" />
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
      {/* {handleClick && <OutgoingCallLayout />} */}

      {/* end right sidebar */}
    </div>
  );
};

export default DynamicMessagesPage;
