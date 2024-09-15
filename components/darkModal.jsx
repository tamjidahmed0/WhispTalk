import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setDarkMode } from '@/features/darkModeSlice';
import { X  } from "@phosphor-icons/react";

const DarkModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);


if(darkMode){
localStorage.setItem('theme', 'dark')
}else{
  
localStorage.setItem('theme', 'light')
}




    if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Background overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

    {/* Modal content */}
    <div className={`relative  text-black rounded-lg px-10 py-11 w-[30rem] ${darkMode ===true ? 'bg-[#1E262F]' :'bg-white' }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-12 border-b">
        <h2 className={`text-lg font-semibold ${darkMode ===true && 'text-white'}`}>Dark mode</h2>
        <button onClick={onClose}  className="text-gray-400 ">
          <X size={24} />
        </button>
      </div>

      {/* Options */}
      <div className={`space-y-4 ${darkMode ===true && 'text-white'}`}>
        <div className="flex items-center justify-between">
          <span>Off</span>
          <input type="radio" value='off' checked ={darkMode === false } name="darkMode" className="w-6 h-6 text-blue-600 form-radio" onChange={() => dispatch(setDarkMode(false))} />
        </div>
        <div className="flex items-center justify-between">
          <span>On</span>
          <input type="radio" value='on' checked ={darkMode === true} name="darkMode" className="w-6 h-6 text-blue-600 form-radio" onChange={()=>dispatch(setDarkMode(true))} />
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default DarkModal