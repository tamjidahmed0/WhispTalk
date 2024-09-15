'use client'
import { useSelector, useDispatch } from 'react-redux';
import logopng from '@/public/logo.png'
import Image from 'next/image';
import { setDarkMode } from '@/features/darkModeSlice';

const Page = () => {
  const darkMode = useSelector((state) => state.darkMode);

 




  return (
    // <Chat />
    <div className ={`${darkMode === true && 'bg-[#1E262F]'} w-[calc(100vw-31rem)] flex flex-col justify-center items-center`}>
    
      <Image src={logopng} width={300}  height={300}/>
      <h1 className={`font-bold text-xl ${darkMode === true && 'text-white'}`}>Select a conversation to start new chat</h1>
    </div>
  ) 
}

export default Page
