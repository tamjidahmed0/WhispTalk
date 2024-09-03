'use client'
import React from 'react'
import { useSelector } from 'react-redux';
const Security = () => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`w-[calc(100vw-31rem)]  ${darkMode && 'bg-[#1E262F]'}`} >Security</div>
  )
}

export default Security