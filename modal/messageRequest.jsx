"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "@phosphor-icons/react";

const MessageRequests = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const [updateResult, setUpdateResult] = useState({});

  // Close modal function
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleOverlayClick}></div>

      {/* Modal content */}
      <div
        className={`relative text-black rounded-lg px-10 py-11 w-[30rem] ${
          darkMode ? "bg-[#1E262F]" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b">
          <h2 className={`text-2xl font-bold ${darkMode && "text-white"}`}>Username</h2>
          <button onClick={onClose} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        <h1 className="text-green-600 ml-7">{updateResult.msg}</h1>

        <form className="w-full max-w-md mx-auto mt-10 p-6">
          <div className="mb-4">
            <label
              className={`block text-sm font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              name="userName"
              placeholder="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p
            className={`text-sm mt-6 ${darkMode ? "text-white" : "text-gray-700"}`}
          >
            If you change your username, it will reflect to others.
          </p>

          <div className="mt-10">
            <button
              className="w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center text-md font-bold text-white shadow-md transition-all hover:shadow-lg focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none disabled:pointer-events-none disabled:opacity-50"
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

export default MessageRequests;
