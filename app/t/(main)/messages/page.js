'use client'
import { useSelector } from 'react-redux';
import logopng from '@/public/logopng.png'
import Image from 'next/image';

const page = () => {
  const darkMode = useSelector((state) => state.darkMode);
  return (
    // <Chat />
    <div className ={`${darkMode === true && 'bg-[#1E262F]'} w-[calc(100vw-31rem)] flex flex-col justify-center items-center`}>
    
      <Image src={logopng} width={300}  height={300}/>
      <h1 className=' font-bold text-xl'>Select conversation</h1>
    </div>
  ) 
}

export default page
