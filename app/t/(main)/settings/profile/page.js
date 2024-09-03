'use client'
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import tamjid from '@/public/tamjid.jpg'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import getProfileDetails from '@/lib/getProfileDetails';
import getCookie from '@/services/getCookie';
import NameModal from '@/modal/nameModal';
import UsernameModal from '@/modal/usernameModal';
import PhotoModal from '@/modal/photoModal';

import { useSelector ,useDispatch } from 'react-redux';
import { setProfile , updateProfileField} from '@/app/features/profileDetails';



const Profile = () => {
  const dispatch = useDispatch()
  // const [profileDetails , setProfileDetails] = useState({})
  const [userId, setUserId] = useState('')
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const darkMode = useSelector((state) => state.darkMode);
  const details = useSelector((state) => state.rightsidebar);
  const profileDetails = useSelector((state) => state.profileDetails);
  const tab = searchParams.get('tab');

  console.log(details, 'details from profile')

  useEffect(()=>{

    const getProfile = async () =>{
      const userId = await getCookie('c_user')
      setUserId(userId.value)
      try {
        const result = await getProfileDetails(userId.value)

        dispatch(setProfile(result))


        // setProfileDetails(result)

      } catch (error) {
        console.log(error)
      }
    }

    getProfile()



  },[])

console.log(profileDetails, 'profle det')




  const options = [
    { label: 'Name', link: 'name' },
    { label: 'Username', link: 'username' },
    { label: 'Profile picture', link: 'photo' },
  ];

  const renderModal = () => {
    switch (tab) {
      case 'name':
        return <NameModal userId={userId} updateProfileField = {updateProfileField}/> ;
      case 'username':
        return <UsernameModal userId={userId} updateProfileField ={updateProfileField}/>;
      case 'photo':
        return <PhotoModal details = {profileDetails}/>;
      default:
        return null;
    }
  };

  return (
    <div className={`w-[calc(100vw-31rem)] max-lg:w-[calc(100vw-25rem)] max-md:w-[calc(100vw-15rem)] ${darkMode && 'bg-[#1E262F]'}`} >
      <div className={`shadow-lg mx-[20rem] mt-[10rem]  rounded-lg ${darkMode === true && 'bg-[#161A20]'} max-lg:mx-[5rem] max-md:mx-[2rem]`}>
        <div className='flex flex-col justify-center items-center pt-10'>
          <Image alt='image' src={`${process.env.NEXT_PUBLIC_API}/${profileDetails?.profilePic}`} width={100} height={100} objectFit="cover" className="rounded-full w-[6rem] h-[6rem] object-cover" />
          <h1 className={`mt-3 text-xl font-bold ${darkMode === true && ' text-white'}`}>{profileDetails.name}</h1>
          <span className=' font-semibold text-gray-500'>{`${profileDetails.username}`} </span> 
        </div>
        <div className="py-10 mt-16">
          <ul className={` ${darkMode === true && ' text-white'}`}>
            {options.map((option, index) => (
              <Link href={`/t/settings/profile?tab=${option.link}`} key={index} className="px-5 py-3 flex justify-between items-center cursor-pointer">
                <span>{option.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Render the appropriate modal */}
      {renderModal()}

    </div>
  );
};

export default Profile;
