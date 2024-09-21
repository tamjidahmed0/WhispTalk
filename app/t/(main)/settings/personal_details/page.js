'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PasswordModal from '@/modal/ChangePass';
import PersonalDetailsModal from '@/modal/personal_details';



const PersonalDetails = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const profileDetails = useSelector((state) => state.profileDetails);
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')


  const options = [
    {label: 'Contact info', link : 'email'}
  ]



  const renderModal = () => {
    switch (tab) {
      case 'email':
        return <PersonalDetailsModal/> ;
      default:
        return null;
    }
  };


  return (
    <div className={`w-[calc(100vw-31rem)] max-lg:w-[calc(100vw-25rem)] max-md:w-[calc(100vw-15rem)]  ${darkMode ===true && 'bg-[#1E262F]'}`} >
    <div className={`flex flex-col  mx-[15rem] mt-7 max-lg:mx-[5rem] max-md:mx-[2rem]`}>
      <h1 className={` font-bold ${darkMode ===true && 'text-white'}`}>Personal details</h1>
      <span className={` ${darkMode ===true && 'text-white'}`}>Manage your passwords, login preferences and recovery methods.</span>
      
 

    {options.map((value, index)=>(
     <Link href={`/t/settings/personal_details?tab=${value.link}`} key={index} className={`${darkMode ===true ?'bg-[#161A20] hover:bg-[#242b35]' : 'hover:bg-blue-100'}  px-6 py-6 rounded-xl mt-6 shadow-lg  flex justify-between items-center  cursor-pointer`}>
     <div className={`${darkMode ===true && 'text-white'} `} >
     <h1 className=' font-semibold'>{value.label}</h1>
     <span>{profileDetails.email}</span>
     </div>       
   </Link>
    ))}

  </div>

{renderModal()}


</div>
  )
}

export default PersonalDetails