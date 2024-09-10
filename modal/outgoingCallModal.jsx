"use client";
import React, { useEffect, useState , useRef} from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { PhoneX, Phone, Minus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import tamjid from "@/public/tamjid.jpg";
import { updateProfileField } from "@/features/profileDetails";
import { Calltoggle } from "@/features/callToggleSlice";
import ImageUpload from "@/lib/imageUpload";
import { useSocketContext } from "@/context/socket";
import { setRejectCall } from "@/features/rejectCall";
import { setOutgoingCall } from "@/features/outgoingCallToggle";
import { setHandleCall } from "@/features/handleCallSlice";
import getCookie from "@/services/getCookie";

// import '@/app/globals.css'

const OutgoingCallModal = ({ details }) => {
  const hasRunEffect = useRef(false);
  const dispatch = useDispatch();
  const socket = useSocketContext();
  const darkMode = useSelector((state) => state.darkMode);
  const callState = useSelector((state) => state.IncommingCall);
  const isToggled = useSelector((state) => state.calltoggle.value);
  const sidebarDetails = useSelector((state) => state.rightsidebar);
  const [imagePreviews, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const messageid = useSelector((state) => state.messageId.messageid);

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //   const goBack = () => {
  //     router.replace("/t/settings/profile");
  //   };

  const handleCallDecline = () =>{
    // if(socket){
    //   socket.emit("call:rejected", {
    //     // requestForCalling,
    //     // userId,
    //     callRejectedId:callState.requestForCallingId,
    //     callRequestId:callState.userId,
    //     socket: socket.id,
      

    //   });
    // }

dispatch(setHandleCall())

  }


// useEffect(()=>{
//   if (hasRunEffect.current) return;
// const handleCall = async () =>{

//   const id = (await getCookie('c_user'))

//   console.log(id, 'cookie id')

//   if( socket){
//     socket.emit('user:incomming' , {
//       id:id.value,
//       requestForCalling:messageid,
//       callerSocketId:socket.id,
//       // peerOffer: peerId
//     })
  
//   }


// }

//  handleCall()
//  hasRunEffect.current = true; 



// },[socket, messageid])





  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Modal content */}
      <div className={`relative text-black rounded-lg px-10 py-11 w-[30rem] ${darkMode ? "bg-[#1E262F]" : "bg-white"} border pointer-events-auto shadow-lg z-10`}>
        <div className="flex items-center justify-end mb-12 ">

          <button onClick={() => dispatch(setOutgoingCall())} className="text-gray-400 ">
            <Minus size={24} />
          </button>
        </div>

        {/* Content */}
        <div className=" max-w-md mx-auto mt-10 p-6">
          <div className="flex flex-col items-center mb-6">
            <Image alt="image" src={tamjid} width={100} height={100} objectFit="cover" className="rounded-full w-[6rem] h-[6rem] object-cover" />
            <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Tamjid ahmed</h1>
            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>is calling...</span>
          </div>

          <div className="flex  justify-evenly">
        
            <div  className=" bg-red-500 p-4 rounded-full cursor-pointer" onClick={handleCallDecline}>
       
              <PhoneX size={24} color="white" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OutgoingCallModal;
