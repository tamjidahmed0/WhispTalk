'use client'
import React, {useState} from 'react'
import Image from "next/image";
import tamjid from "@/public/tamjid.jpg";
import { Phone, Bell, Prohibit, Trash, DotsThreeCircle  } from "@phosphor-icons/react";
import { useSelector, useDispatch } from 'react-redux';
import { setUserBlockModal } from '@/features/blockSlice';
import BlockModal from '@/components/blockModal'



const rightSidebar = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const sidebarDetails = useSelector((state) => state.rightsidebar);
  const blockModal = useSelector((state) => state.blockModal);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`w-[25rem] ${darkMode === true && 'bg-[#1E262F]'} ` }>
    {/* whole component */}

    <div className=" mx-7 mt-10">
      {/*start name username */}

      <div className="flex ">
        <Image src={`${process.env.NEXT_PUBLIC_API}/${sidebarDetails.receiverPic}`} width={50} height={50} objectFit="cover" className={` rounded-full w-[4rem] h-[4rem] object-cover`} />

        <div className=" ml-5">
          <h1 className={` font-bold text-xl ${darkMode === true && 'text-white'}`}>{sidebarDetails.receiverName}</h1>
          <p className={`${darkMode === true ? 'text-white' : 'text-gray-500'} font-medium text-gray-500 text-sm`}>@{sidebarDetails.receiverUsername}</p>
        </div>
      </div>

      {/* end name username */}

      {/* start bio */}

      <div className=" mt-10 border-b-2">
        <h1 className=" font-medium text-gray-500">About</h1>
        <p className={`${darkMode === true && 'text-white'} mt-5 mb-4`}>{sidebarDetails.receiverAbout} </p>
      </div>

      {/* end bio */}

      {/* notification start*/}

      <div className="flex justify-between border-b-2">
        <div className="flex my-5 ">
          <Bell className="text-blue-500 mx-2" size={24} />
          <p className={`${darkMode === true && 'text-white'} ml-4`}>Mute notification</p>
        </div>

        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* notification end*/}

      {/* start delete and block */}

      <div className="flex  mt-10 items-center justify-between">
        <button
        onClick={openModal}
          type="button"
          className=" flex items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <Prohibit className="text-blue-500 mx-2" size={24} />
          Block
        </button>

        <button
          type="button"
          className=" flex items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          <Trash className="text-blue-500 mx-2" size={24} />
          Delete
        </button>
      </div>

      {/* end delete and block */}
    <BlockModal isOpen={isModalOpen} onClose={closeModal}  />
    </div>
  </div>
  )
}

export default rightSidebar