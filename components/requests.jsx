"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { UserSound , UserList  } from "@phosphor-icons/react";
import tamjid from "@/public/tamjid.jpg";
import { useSelector } from "react-redux";
import getAllChat from "@/lib/getAllChats";
import Popoup from "@/modal/popoup";
import { usePathname } from "next/navigation";
import getConnectionReq from "@/lib/getConnectionReq";

const Request = () => {
    const pathname = usePathname()
  const darkMode = useSelector((state) => state.darkMode);
  const [search, setSearch] = useState("");
  const [request, setRequest] = useState([])
  const [requsetCount, setRequestCount] = useState('')
  



const menuList = [
    {icon:<UserSound size={24} /> , label: 'Connection request' , link:'/t/friends/request'},
  
]

useEffect(()=>{
    const getRequest = async()=>{
        try {
            const result = await getConnectionReq()
         
            const {data ,count, msg, } = result
          
          if(count === undefined){
setRequestCount(msg)
          }else{
            setRequestCount(count)
          }
            setRequest(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    getRequest()
},[])

console.log(requsetCount, 'request count')



  return (
    <div className={`w-[24rem] ${darkMode === true ? "bg-[#161A20]" : "bg-[#F8FAFF]"}   flex flex-col py-4 `}>
      {/* <Popoup /> */}
   
      <div className="mx-5">
        <h1 className={`text-2xl font-bold ${darkMode ===true && 'text-white'}`}>Connection request</h1>


{request?.map((value , i)=>(
        <div className=" flex mt-20" key={i}>
        <Image src={`${process.env.NEXT_PUBLIC_API}/${value.picture}`} width={60} height={60} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />
        <div className=" flex flex-col ml-3">
        <h1 className=" font-semibold text-lg">{value.name}</h1>
        <div className=" flex space-x-8 mt-4 ">
        <button className=" bg-blue-500 text-white px-2 py-2 rounded">Confirm</button>
        <button className=" bg-gray-300  px-2 py-2 rounded">Delete</button>
        </div>
        </div>
        </div>
))}



  

      </div>
    </div>
  );
};

export default Request;

