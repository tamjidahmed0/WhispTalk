"use client";
import { useSelector } from "react-redux";
import { X } from "@phosphor-icons/react";

const Modal = ({ isOpen, onClose, name }) => {
  const darkMode = useSelector((state) => state.darkMode);
  const sidebarDetails = useSelector((state) => state.rightsidebar);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal content */}
      <div className={`relative  text-black rounded-lg px-10 py-11 w-[30rem] ${darkMode === true ? "bg-[#1E262F]" : "bg-white"}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b">
          <h2 className={`text-2xl font-bold ${darkMode === true && "text-white"}`}>Block {sidebarDetails.receiverName}</h2>
          <button onClick={onClose} className="text-gray-400 ">
            <X size={24} />
          </button>
        </div>

        {/* Options */}
        <div className={`space-y-4 ${darkMode === true && "text-white"}`}>
          <h1 className=" text-xl font-semibold">Block messages and calls</h1>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Your account won&rsquo;t receive messages or calls from {sidebarDetails.receiverName}&rsquo;s account.</li>
            <li>If you&rsquo;re in shared groups or rooms with this account, you&rsquo;ll still be able to see and communicate with each other. You can leave groups or rooms anytime.</li>
          </ul>

          <div className=" flex justify-end ">
            <button onClick={onClose} className=" mr-7 px-6 py-3  text-xs font-bold text-centert text-blue-500 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
             Cancel
            </button>

            <button
        className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Block
      </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
