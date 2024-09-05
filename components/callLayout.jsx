'use client'
import React, {useState, useEffect} from 'react'
import CallModal from '@/modal/callModal'
import MinimizeModal from '@/modal/minimizeModal'
import { Calltoggle } from '@/app/features/callToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import DraggableDiv from '@/modal/dragablediv'
import { useSocketContext } from "@/context/socket";
import { setIncommingCallDetails } from '@/app/features/incommingCallSlice'


const callLayout = () => {
  const dispatch = useDispatch()
  const socket = useSocketContext();
  const isToggled = useSelector((state) => state.calltoggle.value);
  const callState = useSelector((state) => state.IncommingCall);
  
  const [incommingCall , setIncommingCall] = useState(false)


  useEffect(()=>{

    if(socket){
      socket.on('incommingoffer', async(data)=>{
       setIncommingCall(true)
      //  dispatch(setIncommingCallDetails(data))
       dispatch(setIncommingCallDetails({
        userId:data.userId,
        requestForCallingId : data.requestForCallingId,
        profile: data.profile,
        name: data.name,
       
       }))

      //  console.log(data, 'come from call layout')


      })
    }

    console.log(callState, 'callstate')
  },[socket])


  useEffect(()=>{

    if(socket){
      socket.on('call:rejected', (data)=>{
        console.log(data, 'call rejected')
        setIncommingCall(false)
        
      })
    }



  },[socket])






  return (
    <div>

{incommingCall && (
  isToggled ? <MinimizeModal /> : <CallModal />
)}

{/* <MinimizeModal /> */}
{/* <CallModal /> */}
    </div>
 
    

  )
}

export default callLayout