'use client'
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import getNotifications from '@/lib/getNotifications';
import tamjid from '@/public/tamjid.jpg'
import { User} from "@phosphor-icons/react";
import { useSocketContext } from '@/context/socket';


const Notification = () => {
    const darkMode = useSelector((state) => state.darkMode);
    const socket = useSocketContext()
    const [Notification , setNotification] = useState([])


    useEffect(()=>{


        const api_request = async () =>{
            try {
                const {data, count} = await getNotifications ()
               
                setNotification(data)
            } catch (error) {
                console.log(error)
            }
        }

        api_request()


    },[])




    useEffect(()=>{

        if(socket){
          socket.on('acceptNotification', (data)=>{
            console.log(data, 'acceptNotification')
            setNotification((prev)=> [...prev , data])
            
          })
        
        
          
        
        
        }
        
        
        return () =>{
          if(socket){

            socket.off('acceptNotification')
          }
        }
        
        
        }, [socket])




  return (
    <div className={`w-[calc(100vw-7rem)] max-lg:w-[calc(100vw-25rem)] max-md:w-[calc(100vw-15rem)]  ${darkMode ===true && 'bg-[#161A20]'} `}>
    <div className={`flex flex-col  mx-[15rem] mt-7 max-lg:mx-[5rem] max-md:mx-[2rem]`}>
        <h1 className={` font-bold ${darkMode ===true && 'text-white'}`}>Notifications</h1>


        <div className={`${darkMode ===true && 'bg-[#1E262F]'}  px-6 py-3 rounded-xl mt-6 shadow-lg  flex flex-col  space-y-5`}>



{

Notification.length !== 0 ? 
(

    Notification?.map((value, i)=>(
        <div className={`${darkMode ===true && 'text-white'} flex  `} key={i}>    
        <div className=' relative'>
        <Image alt='image' src={`${process.env.NEXT_PUBLIC_API}/${value.profile}`} width={100} height={100} objectFit="cover" className="rounded-full w-[3rem] h-[3rem] object-cover" />
          <div className='bg-blue-500 flex items-center justify-center rounded-full w-7 h-7 p-1 absolute bottom-0 left-8'>
          <User size={28} />
          </div>
        </div>
     
            <div className=' ml-5'> 
            <p className=' font-bold'>{value.msg}</p>
            <span>{value.time}</span>
            </div>
          </div>
    
    ))
):(
    <div> <h1 className={`${darkMode ===true && 'text-white'}`}>No notification found</h1> </div>
)



}


      
         
            
            
        </div>



    </div>















</div>
  )
}

export default Notification