"use client";
import React, {useState,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname hook
import { useSelector } from 'react-redux';

import tamjid from '@/public/tamjid.jpg';
import { ChatCircleDots, Users, Phone, Gear, FramerLogo, Bell, UserPlus  } from "@phosphor-icons/react";
import getProfileDetails from '@/lib/getProfileDetails';
import getCookie from '@/services/getCookie';
import logo from '@/public/logo.png'
import logoGif from '@/public/logogif.gif'

const Sidebar = () => {
  const pathname = usePathname(); // Get current path
  const darkMode = useSelector((state) => state.darkMode);
  const [profileDetails, setProfileDetail] = useState({})


  useEffect(()=>{

const getProfile = async () =>{
  try {
    const userId = await getCookie('c_user')
    const result = await getProfileDetails(userId.value)

    setProfileDetail(result)

    


  } catch (error) {
    console.log(error)
  }
}


getProfile()




  },[])





  return (
   
      <div className={`w-[7rem] max-lg:w-[5rem] max-md:w-[2rem]  bg-[f0f4fa] flex flex-col items-center py-4  ${darkMode === true ? 'bg-[#1E262F]' : 'bg-white'} `}>
        {/* Top Icon Section */}
        <div className={`space-y-4 ${darkMode === true ? 'text-white' : 'text-black'}`}>
          <div className="flex justify-center mt-10 mb-14 bg-[#4c6081] rounded ">
            {/* <FramerLogo color="#f248" size={80} /> */}
            <Image src={logoGif} height={150} width={80} />
          </div>

          <Link href="/t/messages" className={`flex justify-center px-3 py-4 rounded-full hover:scale-110 ${pathname === '/t/messages' ? 'bg-[#5b96f7] text-white' : 'hover:bg-[#5b96f7] hover:text-white'}`}>
            <ChatCircleDots weight='bold' size={28} />
          </Link>

          <Link href="/t/friends" className={`flex justify-center px-3 py-4 rounded-full hover:scale-110 ${pathname === '/t/friends' ? 'bg-[#5b96f7] text-white' : 'hover:bg-[#5b96f7] hover:text-white'}`}>
            <Users weight='bold' size={28} />
          </Link>

          <Link href="/calls" className={`flex justify-center px-3 py-4 rounded-full hover:scale-110 ${pathname === '/calls' ? 'bg-[#5b96f7] text-white' : 'hover:bg-[#5b96f7] hover:text-white'}`}>
            <Phone weight='bold' size={28} />
          </Link>

          <Link href="/t/request" className={`flex justify-center px-3 py-4 rounded-full hover:scale-110 ${pathname === '/t/request' ? 'bg-[#5b96f7] text-white' : 'hover:bg-[#5b96f7] hover:text-white'}`}>
            <UserPlus weight='bold' size={28} />
          </Link>
          <Link href="/t/notification" className={`flex justify-center px-3 py-4 rounded-full hover:scale-110 ${pathname === '/t/notification' ? 'bg-[#5b96f7] text-white' : 'hover:bg-[#5b96f7] hover:text-white'}`}>
            <Bell weight='bold' size={28} />
          </Link>

          <Link href="/t/settings" className={`flex justify-center px-3 py-4 rounded-full hover:scale-110 ${pathname === '/t/settings' ? 'bg-[#5b96f7] text-white' : 'hover:bg-[#5b96f7] hover:text-white'}`}>
            <Gear weight='bold' size={28} />
          </Link>
        </div>

        {/* Bottom User Icon */}
        <div className="mt-auto">
          <Image alt='image' src={`${process.env.NEXT_PUBLIC_API}/${profileDetails?.profilePic}`} width={60} height={60} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />
        </div>
      </div>

  );
};

export default Sidebar;
