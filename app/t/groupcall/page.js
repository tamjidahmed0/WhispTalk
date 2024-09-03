'use client'
import React, {useState, useEffect} from 'react'
import { useSocketContext } from "@/context/socket";

const GroupCall = () => {
  const socket = useSocketContext()


  useEffect(()=>{

    if(socket){
      console.log(socket)
    }


  },[socket])

  
  return (
    <div>GroupCall</div>
  )
}

export default GroupCall