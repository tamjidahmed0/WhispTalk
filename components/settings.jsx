"use client";
import React from "react";
import Image from "next/image";
import tamjid from "@/public/tamjid.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from 'react-redux';
import { Bell, Lock, Key, Info, Moon, User, IdentificationBadge } from "@phosphor-icons/react";

const Settings = () => {
  const pathname = usePathname()
  const darkMode = useSelector((state) => state.darkMode);


  const menuItem = [

    {
      icon: <User className="  mx-2" size={28} />,
      label: "Profile",
      link: "/t/settings/profile",
    },
  
    // {
    //   icon: <Lock className="  mx-2" size={28} />,
    //   label: "Privacy",
    //   link: "/t/settings/privacy",
    // },
    {
      icon: <Key className="  mx-2" size={28} />,
      label: "Security and password",
      link: "/t/settings/security",
    },
    {
      icon: <IdentificationBadge className="  mx-2" size={28} />,
      label: "Personal details",
      link: "/t/settings/personal_details",
    },
    // {
    //   icon: <Bell className="  mx-2" size={28} />,
    //   label: "Notification",
    //   link: "/t/settings/notification",
    // },
    {
      icon: <Moon className="  mx-2" size={28} />,
      label: "Dark mood",
      link: "/t/settings/dark_mode",
    },
    // {
    //   icon: <Info className="  mx-2" size={28} />,
    //   label: "Help",
    //   link: "/t/settings/help",
    // },
  
  ];

  return (
    <div className="flex h-screen">
      <div className={`w-[24rem] max-lg:w-[20rem] max-md:w-[13rem] ${darkMode === true ? 'bg-[#161A20]' : 'bg-[#F8FAFF]'}   flex flex-col py-4 `}>
      <h1 className={`mx-5 text-2xl font-bold  ${darkMode === true && ' text-white' }`}>Settings</h1>
        <div className=" mx-5 mt-12">
         

          {/* <div className="py-5 px-2 flex rounded-xl mt-5 relative">
            <Image src={tamjid} width={60} height={60} objectFit="cover" className="rounded-full w-[4rem] h-[4rem] object-cover" />

            <div className={`ml-4  ${darkMode === true && ' text-white' }`}>
              <h1 className={`font-bold`}>Tamjid Ahmed</h1>
              <p className="text-gray-500 mt-1">This is about</p>
            </div>
          </div> */}

          {menuItem.map((valu, index) => (
            <Link key={index} href={valu.link} className="">
            
            <div key={index} className={` flex rounded-xl py-4  mt-3   ${pathname === valu.link && 'bg-[#5b96f7]' }` }>
              <div className={ `flex `}>
              <span className={`text-gray-500 ${pathname === valu.link && 'text-white' }   ${darkMode === true && ' text-white' }`}>{valu.icon}</span>
              <h1 className={`ml-4 font-medium text-gray-500 ${pathname === valu.link && ' text-white' }   ${darkMode === true && ' text-white' }   `}>{valu.label}</h1>    
              </div>
         
                 
        </div>
            </Link>
        
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
