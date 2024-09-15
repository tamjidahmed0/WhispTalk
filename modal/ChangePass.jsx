import React, { useState, useEffect } from 'react';
import { X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import ChangePassword from '@/lib/changePassword';
import { useSelector, useDispatch } from "react-redux";

const PasswordModal = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Track whether passwords match
  const router = useRouter();

  const goBack = () => {
    router.replace("/t/settings/security"); // This will navigate to the previous page
  };

  // Use useEffect to validate passwords when either password changes
  useEffect(() => {
    if (newPassword && retypePassword) {
      setPasswordsMatch(newPassword === retypePassword);
    } else {
      setPasswordsMatch(true); // Default to true if either field is empty
    }
  }, [newPassword, retypePassword]); // Run validation whenever either password changes

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      return; // Prevent form submission if passwords do not match
    }

    console.log(currentPassword, 'cureentpass', newPassword, 'newpas')

    try {
        const update_pass = await ChangePassword(currentPassword, newPassword)
        if(update_pass.status === 201){
            goBack()

        }
        console.log(update_pass, 'update pass')
    } catch (error) {
        console.log(error, 'server error')
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 " onClick={goBack}></div>

      {/* Modal content */}
      <div className={`relative ${darkMode === true ? "bg-[#1E262F]" : "bg-white"} dark:bg-[#1E262F] text-black dark:text-white rounded-lg px-6 py-8 w-[30rem] shadow-lg`}>
        {/* Header */}
        <div className="flex items-center justify-end mb-6">
          {/* <h2 className="text-lg font-semibold">Tamjid Ahmed · </h2> */}
          <button onClick={goBack} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <h3 className={`text-2xl font-bold mb-6 ${darkMode === true && ' text-white'}`}>Change password</h3>
        <p className="text-sm text-gray-500 mb-4">
          Your password must be at least 6 characters and should include a combination of numbers, letters, and special characters (!$@%).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`${darkMode === true && 'text-white'} block text-sm font-medium mb-2`}>
              Current password 
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-lg text-sm ${darkMode === true ? "bg-[#455261] text-white" : "bg-white"} `}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode === true && 'text-white'}`}>New password</label>
            <input
              type="password"
              className={`${darkMode === true ? "bg-[#455261] text-white" : "bg-white"} w-full px-4 py-2 border ${!passwordsMatch && newPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm `}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className={`${darkMode === true && 'text-white'} block text-sm font-medium mb-2`}>Re-type new password</label>
            <input
              type="password"
              className={`${darkMode === true ? "bg-[#455261] text-white" : "bg-white"} w-full px-4 py-2 border ${!passwordsMatch && retypePassword ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm `}
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
            {!passwordsMatch && (
              <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
            )}
          </div>

        

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-center font-bold mt-4 hover:bg-blue-600 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
          >
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
