'use client'
import React, {useState} from 'react'
import DarkModal from '@/components/darkModal'
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '@/app/features/darkModeSlice';

const DarkMode = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
   <div className={`w-[calc(100vw-31rem)] max-lg:w-[calc(100vw-25rem)] max-md:w-[calc(100vw-15rem)]  ${darkMode ===true && 'bg-[#1E262F]'} `}>
        <div className={`flex flex-col  mx-[15rem] mt-7 max-lg:mx-[5rem] max-md:mx-[2rem]`}>
            <h1 className={` font-bold ${darkMode ===true && 'text-white'}`}>Dark mode</h1>
            <div className={`${darkMode ===true && 'bg-[#161A20]'}  px-6 py-3 rounded-xl mt-6 shadow-lg  flex justify-between items-center`}>
              <div className={`${darkMode ===true && 'text-white'} `} >
              <h1 className=' font-semibold'>Dark mood</h1>
              <p>Adjust the appearance to reduce glare and give your eyes a break.</p>
              </div>
             
                
                <span className=' px-5 py-2 bg-gray-200 rounded-xl cursor-pointer' onClick={openModal}>{darkMode === true ? 'On' : 'Off'}</span>
            </div>
        </div>



{isModalOpen &&  <DarkModal isOpen={isModalOpen} onClose={closeModal} />}


 




{/* <DarkModal /> */}
    




   </div>
  )
}

export default DarkMode