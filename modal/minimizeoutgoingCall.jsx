"use client";

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calltoggle } from "@/features/callToggleSlice";
import Image from "next/image";
import tamjid from "@/public/tamjid.jpg";
import { PhoneX, Phone, Minus } from "@phosphor-icons/react";
import { setOutgoingCall } from "@/features/outgoingCallToggle";
import { setHandleCall } from "@/features/handleCallSlice";

const MinimizeOutgoingCall = () => {
  const dispatch = useDispatch();
  const minimizeOutgoingCall = useSelector((state) => state.outgoingCall.value);
  const isToggled = useSelector((state) => state.calltoggle.value);
  const callState = useSelector((state) => state.IncommingCall);
  const divRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default text selection behavior
    const div = divRef.current;
    const offsetX = e.clientX - div.getBoundingClientRect().left;
    const offsetY = e.clientY - div.getBoundingClientRect().top;

    const handleMouseMove = (moveEvent) => {
      // Calculate the new position
      const newX = moveEvent.clientX - offsetX;
      const newY = moveEvent.clientY - offsetY;

      // Ensure the element stays within the viewport
      const maxX = window.innerWidth - div.offsetWidth;
      const maxY = window.innerHeight - div.offsetHeight;

      div.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
      div.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };


  const handleMinimize = () =>{

  }


  

  return (
    <div
      //  onClick={()=>dispatch(Calltoggle())}
      ref={divRef}
      onMouseDown={handleMouseDown}
      className="fixed  bg-blue-100 cursor-pointer shadow-lg rounded select-none px-10 py-3"
      style={{ top: "100px", left: "100px" }} // Initial position
    >
      <div className="flex items-center justify-center">
        <Image alt="image" src={`${process.env.NEXT_PUBLIC_API}/${callState.profile}`} width={50} height={50} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />
        <div className=" ml-4">
          <h1 className=" text-md font-bold">{callState.name}</h1>
          <span className=" ">Ringing...</span>
        </div>
        <div className=" px-5 flex justify-around space-x-6">
          <div className=" p-2 bg-red-500 rounded-full" onClick={()=> dispatch(setHandleCall())}>
            <PhoneX size={24} color="white" />
          </div>
        </div>

<div className=" flex justify-start  items-start" onClick={()=> dispatch(setOutgoingCall())}>
<Minus size={26} />
</div>

      </div>
    </div>
  );
};

export default MinimizeOutgoingCall;
