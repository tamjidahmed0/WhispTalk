"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { X, Upload } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import tamjid from "@/public/tamjid.jpg";
import { updateProfileField } from "@/features/profileDetails";
import ImageUpload from "@/lib/imageUpload";

const PhotoModal = ({ details }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const sidebarDetails = useSelector((state) => state.rightsidebar);
  const [imagePreviews, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const router = useRouter();

  const goBack = () => {
    router.replace("/t/settings/profile"); // This will navigate to the previous page
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log('Reader result:', reader.result);
        setPreview(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Reader error:", error);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const result = await ImageUpload(formData);

      if (result.status == 201) {
        dispatch(updateProfileField({ field: "profilePic", value: result.url }));
        goBack();
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={goBack}></div>

      {/* Modal content */}
      <div className={`relative  text-black rounded-lg px-10 py-11 w-[30rem] ${darkMode === true ? "bg-[#1E262F]" : "bg-white"}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b">
          <h2 className={`text-2xl font-bold ${darkMode === true && "text-white"}`}>Profile picture</h2>
          <button onClick={goBack} className="text-gray-400 ">
            <X size={24} />
          </button>
        </div>

        {/* Options */}
        {/* <div className={`space-y-4 ${darkMode === true && "text-white"}`}> */}

        <div className={`w-full max-w-md mx-auto mt-10 p-6  `}>
          {/* ${process.env.NEXT_PUBLIC_API}/${details.profilePic} */}
          <div className=" flex justify-center">
            {imagePreviews !== null ? (
              <Image src={imagePreviews} width={150} height={150} objectFit="cover" className="rounded-full w-[8rem] h-[8rem] object-cover" />
            ) : (
              <Image src={`${process.env.NEXT_PUBLIC_API}/${details.profilePic}`} width={150} height={150} objectFit="cover" className="rounded-full w-[8rem] h-[8rem] object-cover" />
            )}
          </div>

          <label for="uploadFile1" className={`${darkMode === true && "text-white bg-gray-500"} flex bg-gray-300 hover:bg-gray-400  text-base px-5 py-3 outline-none rounded w-max cursor-pointer  font-[sans-serif] mt-6`}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-blue-500 inline" viewBox="0 0 32 32">
              <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
              <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#fff" />
            </svg> */}
            <Upload size={24} className=" mr-5" />
            Upload
            <input type="file" id="uploadFile1" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          <div className=" mt-10">
            <button
              className=" w-full  select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle  text-md font-bold  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleImageUpload}
            >
              Change
            </button>
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default PhotoModal;
