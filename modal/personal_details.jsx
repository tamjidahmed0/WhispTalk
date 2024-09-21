"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import ChangeEmail from "@/lib/changeEmail";
import { updateProfileField } from "@/features/profileDetails";


const PersonalDetailsModal = ({ userId }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const profileDetails = useSelector((state) => state.profileDetails);
  const [updateResult, setUpdateResult] = useState({});
  const [about, setAbout] = useState("");


  const router = useRouter();

  const goBack = () => {
    router.replace("/t/settings/personal_details"); 
  };

  const handleSubmit = async (formData) => {
    const email = formData.get('email')
    try {
      const result = await ChangeEmail(profileDetails.email, email); 
      setUpdateResult(result);
      if (result.status === 201) {
        dispatch(updateProfileField({field:'email', value: result.email}))
        goBack()
     
        goBack();
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 " onClick={goBack}></div>

      {/* Modal content */}
      <div className={`relative  text-black rounded-lg px-10 py-11 w-[30rem] ${darkMode === true ? "bg-[#1E262F]" : "bg-white"}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b">
          <h2 className={`text-2xl font-bold ${darkMode === true && "text-white"}`}>Contact info</h2>
          <button onClick={goBack} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        <h1 className={` text-green-600 ml-7`}>{updateResult.msg}</h1>

        <form className={`w-full max-w-md mx-auto mt-10 p-6`} action={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode === true ? "text-white" : "text-gray-700"}`} htmlFor="about">
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="Change Email"
              type="email"
              // Limit the input to 101 characters
              // value={about}
              // onChange={(e) => setAbout(e.target.value)}
              className={` w-full resize-none px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
         
          </div>

       

          <div className="mt-10">
            <button
              className="w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center text-md font-bold text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85]"
              type="submit"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsModal;
