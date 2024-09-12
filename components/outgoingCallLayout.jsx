'use client'
import React, {useState, useEffect} from 'react'
import CallModal from '@/modal/callModal'
import MinimizeModal from '@/modal/minimizeModal'
import { Calltoggle } from '@/features/callToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useSocketContext } from "@/context/socket";
import { setIncommingCallDetails } from '@/features/incommingCallSlice'
import { setRejectCall } from '@/features/rejectCall'
import { setHandleCall } from '@/features/handleCallSlice'

import OutgoingCallModal from '@/modal/outgoingCallModal'
import MinimizeOutgoingCall from '@/modal/minimizeoutgoingCall'
import CallLayout from './callLayout'

const OutgoingCallLayout = () => {
  const dispatch = useDispatch()
  const socket = useSocketContext();
  const isToggled = useSelector((state) => state.calltoggle.value);
  const minimizeOutgoingCall = useSelector((state) => state.outgoingCall.value);
  const handleCall = useSelector((state) => state.handleCall.value);
  const callState = useSelector((state) => state.IncommingCall);
  
  const [incommingCall , setIncommingCall] = useState(false)


  useEffect(()=>{

    if(socket){

      socket.on('incommingoffer', async(data)=>{

        // const incommingCall = await new Audio('/incommingCall.mp3').play()

        dispatch(setRejectCall(true))
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
        dispatch(setHandleCall(false))
        setIncommingCall(false)
        
      })
    }



  },[socket])






  return (
    <div>
{/* {handleCall && <OutgoingCallModal />} */}
{handleCall && (
  minimizeOutgoingCall ? <MinimizeOutgoingCall /> : <OutgoingCallModal />
)}
<CallLayout />
{/* <MinimizeModal /> */}
{/* <CallModal /> */}
    </div>
 
    

  )
}

export default OutgoingCallLayout