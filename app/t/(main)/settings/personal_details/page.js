'use client'
import React from 'react'
import { useSelector } from 'react-redux';
const personalDetails = () => {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={`w-[calc(100vw-31rem)]  ${darkMode && 'bg-[#1E262F]'}`} >personalDetails</div>
  )
}

export default personalDetails