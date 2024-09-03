'use client'
import React from 'react'
import { useSelector } from 'react-redux';
const Help = () => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`w-[calc(100vw-31rem)]  ${darkMode && 'bg-[#1E262F]'}`} >Help</div>
  )
}

export default Help