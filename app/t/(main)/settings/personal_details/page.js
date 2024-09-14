'use client'
import React from 'react'
import { useSelector } from 'react-redux';
const PersonalDetails = () => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`w-[calc(100vw-31rem)]  ${darkMode && 'bg-[#1E262F]'}`} >
          <div className={`flex flex-col  mx-[15rem] mt-7 max-lg:mx-[5rem] max-md:mx-[2rem]`}>
            <h1 className={` font-bold ${darkMode ===true && 'text-white'}`}>Personal details</h1>
            <div className={`${darkMode ===true && 'bg-[#161A20]'}  px-6 py-3 rounded-xl mt-6 shadow-lg  flex justify-between items-center`}>
              <div className={`${darkMode ===true && 'text-white'} `} >
              <h1 className=' font-semibold'>Contact info</h1>
              <p>jhon@gmail.com</p>
              </div>
             
                
               
            </div>
        </div>
    </div>
  )
}

export default PersonalDetails