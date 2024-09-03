"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import UpdateName from "@/lib/updateName";
import { updateProfileField } from "@/app/features/profileDetails";

const NameModal = ({userId}) => {
  const darkMode = useSelector((state) => state.darkMode);
  const [updateResult , setUpdateResult] = useState({})
  const dispatch = useDispatch()
  const router = useRouter();

  const goBack = () => {
    router.replace("/t/settings/profile"); // This will navigate to the previous page
  };

console.log(userId, 'nameuserid')

  const handleSubmit = async(formData) =>{
   

    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const userAgent = navigator.userAgent

try {
  const result = await UpdateName(firstName, lastName , userId)



  if(result.status === 401){
    setUpdateResult(result)
  }else{
    dispatch(updateProfileField({field:'name', value: result.name}))
    setUpdateResult(result)
    goBack()
  }


  console.log(result, 'update name')
} catch (error) {
  console.log(error, 'error')
}



  }





  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={goBack}></div>
    
        
       

      {/* Modal content */}
      
      <div className={`relative  text-black rounded-lg px-10 py-11 w-[30rem] ${darkMode === true ? "bg-[#1E262F]" : "bg-white"}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b">
          <h2 className={`text-2xl font-bold ${darkMode === true && "text-white"}`}>Name</h2>
          <button onClick={goBack} className="text-gray-400 ">
            <X size={24} />
          </button>
        </div>

        {/* Options */}
        {/* <div className={`space-y-4 ${darkMode === true && "text-white"}`}> */}
        <h1 className={` text-green-600 ml-7`}>{updateResult.msg}</h1>

        <form className={`w-full max-w-md mx-auto mt-10 p-6  `} action={handleSubmit}>
     
       
   
        
          <div className="mb-4 ">
      
            <label className={`block text-sm font-bold mb-2 ${darkMode === true ? "text-white" : "text-gray-700"}`} htmlFor="firstName">
              First name
            </label>
            <input id="firstName" type="text" name="firstName" placeholder="First name" className="   w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="middleName">
          Middle name
        </label>
        <input
          id="middleName"
          type="text"
          placeholder="Middle name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      
        />
      </div> */}

          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode === true ? "text-white" : "text-gray-700"}`} htmlFor="lastName">
              Last name
            </label>
            <input id="lastName" name="lastName" type="text" placeholder="Last name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <p className={`text-gray-600 text-sm mt-6 ${darkMode === true ? "text-white" : "text-gray-700"}`}>If you change your name, you can’t change it again for 30 days. Don’t add any unusual capitalization, punctuation, characters, or random words. </p>

          <div className=" mt-10">
            <button
              className=" w-full  select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle  text-md font-bold  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Change review
            </button>
          </div>
        </form>

        {/* </div> */}
      </div>
    </div>
  );
};

export default NameModal;
