"use client";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import tamjid from '@/public/tamjid.jpg'
import getMsgRequest from "@/lib/getMessageRequest";
import { useSocketContext } from "@/context/socket";
import getCookie from "@/services/getCookie";
import { addUser , addUserObject} from "@/features/chatSlice";


const MessageRequest = ({ isOpen, onClose, name }) => {
  if (!isOpen) return null;
  const [requestList, setRequestList] = useState([])
  const socket = useSocketContext()
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.darkMode);
  const sidebarDetails = useSelector((state) => state.rightsidebar);
  const conversation = useSelector((state) => state.chats.users);

  useEffect(()=>{

const getRequest = async () =>{
  try {
    
    const result = await getMsgRequest()

    const {count ,data} = result

    setRequestList(data)

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}

getRequest()





  },[conversation])


const handleAccept = async (Id) =>{

  const userId = (await getCookie('c_user')).value;
  if(socket){
     socket.emit('messageAccept', {
      requestId : Id,
      userId : userId,
      socketId :socket.id
     })
  }


}


useEffect(()=>{

if(socket){
  socket.on('messageAccept', (data)=>{
    console.log(data, 'messageAccept')
    dispatch(addUserObject({Id: data.Id , profile:data.profile, name: data.name, text:data.text,date:data.date, verified: data.verified,  }))
  })


  


}


return () =>{
  if(socket){
    socket.off('messageAccept')
    
  }
}


}, [socket])





  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 " onClick={onClose}></div>

      {/* Modal content */}
      <div className={`relative  text-black rounded-lg px-10 py-11 w-[30rem] ${darkMode === true ? "bg-[#1E262F]" : "bg-white"}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b">
          <h2 className={`text-2xl font-bold ${darkMode === true && "text-white"}`}>Message requests</h2>
          <button onClick={onClose} className="text-gray-400 ">
            <X size={24} />
          </button>
        </div>


        <div className="w-full h-[300px] overflow-y-auto  ">

        {requestList.length > 0 ? (
  requestList.map((value, index) => (
    <div key={index} className="flex bg-gray-600 px-6 py-4 rounded mb-4">
      <Image
        alt="image"
        src={`${process.env.NEXT_PUBLIC_API}/${value.profile}`}
        width={50}
        height={50}
        objectFit="cover"
        className="rounded-full w-[4rem] h-[4rem] object-cover"
      />
      <div className="ml-5">
        <h1 className="font-bold text-lg">{value.name}</h1>
        <span className="font-semibold text-gray-500">{value.convText}</span>
        <div className="flex space-x-8 mt-4">
          <button className="bg-blue-500 text-white px-1 py-1 rounded" onClick={()=>handleAccept(value.Id)}>
            Accept
          </button>
          <button className="bg-gray-300 px-1 py-1 rounded">Delete</button>
        </div>
      </div>
      <span className="ml-20 font-semibold text-gray-500 text-sm">{value.date}</span>
    </div>
  ))
) : (
  // Display a message or a component when the requestList is empty
  <div className="text-center text-gray-500 py-4">
    No requests available.
  </div>
)}

     
  

   
    </div>
        




      </div>
    </div>
  );
};

export default MessageRequest;
