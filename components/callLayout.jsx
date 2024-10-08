'use client'
import React, {useState, useEffect} from 'react'
import CallModal from '@/modal/callModal'
import MinimizeModal from '@/modal/minimizeModal'
import { Calltoggle } from '@/features/callToggleSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useSocketContext } from "@/context/socket";
import { setIncommingCallDetails } from '@/features/incommingCallSlice'
import { setRejectCall } from '@/features/rejectCall'
import { setMessageId } from '@/features/messageid'







const CallLayout = () => {
  const dispatch = useDispatch()
  const socket = useSocketContext();
  const isToggled = useSelector((state) => state.calltoggle.value);
  const rejectCall = useSelector((state) => state.rejectCall.value);
  const callState = useSelector((state) => state.IncommingCall);
  const messageid = useSelector((state) => state.messageId.messageid);
  const [incommingCall , setIncommingCall] = useState(false)


  useEffect(()=>{

    if(socket){

      socket.on('incommingoffer', async(data)=>{

      

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
  },[socket,])


  useEffect(()=>{

    if(socket){
      socket.on('call:rejected', (data)=>{
        console.log(data, 'call rejected')
        dispatch(setRejectCall(false))
        setIncommingCall(false)
        
      })
    }



  },[socket])


  console.log(rejectCall, 'reject call')

  return (
    <div>

{incommingCall && (
  isToggled ? <MinimizeModal /> : <CallModal />
)}

{/* {incommingCall &&  <CallModal />} */}


{/* <MinimizeModal /> */}
{/* <CallModal /> */}
    </div>
 
    

  )
}

export default CallLayout