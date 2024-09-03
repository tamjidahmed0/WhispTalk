// "use client";
// import React from "react";
// import Image from "next/image";
// import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react";
// import tamjid from "@/public/tamjid.jpg";

// const page = () => {
//   return (
//     <div className="flex h-screen">
//       <div className="w-[27rem] bg-[#F8FAFF] flex flex-col py-4 border-r">
//         <div className="mx-5">
//           <h1 className="text-2xl font-bold">Chats</h1>

//           <div className="flex items-center w-full bg-blue-100 rounded-full px-2 py-4 mt-5">
//             {/* Search Icon */}
//             <MagnifyingGlass className="text-blue-500 mx-2" size={24} />

//             {/* Input */}
//             <input
//               type="text"
//               placeholder="Search"
//               className="bg-transparent flex-1 outline-none text-blue-500"
//             />

//             {/* Filter Icon */}
//             <SlidersHorizontal className="text-blue-500 mx-2" size={24} />
//           </div>

//           <h1 className="text-gray-400 mt-8">All Chats</h1>

//           {/* Scrollable Chats Section */}
//           <div className="overflow-y-auto h-[calc(100vh-14rem)] mt-5 space-y-5">
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>
//             <div className="py-5 px-2 flex rounded-xl bg-white relative">
//               <Image
//                 src={tamjid}
//                 width={60}
//                 height={60}
//                 objectFit="cover"
//                 className="rounded-full w-[4rem] h-[4rem] object-cover"
//               />

//               <div className="ml-4">
//                 <h1 className="font-bold">Tamjid Ahmed</h1>
//                 <p className="text-gray-500 mt-1">That's good for you.</p>
//               </div>

//               <div className="absolute right-5 flex flex-col">
//                 <span className="text-gray-500">10:30</span>
//                 <span className="bg-blue-500 flex items-center justify-center rounded-full w-6 h-6 text-white mt-3">
//                   2
//                 </span>
//               </div>
//             </div>

//             {/* Add more chat items here */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;


'use client'
import { useSelector } from 'react-redux';

const page = () => {
  const darkMode = useSelector((state) => state.darkMode);
  return (
    // <Chat />
    <div className ={`${darkMode === true && 'bg-[#1E262F]'} w-[calc(100vw-31rem)]`}>Select a conversation</div>
  )
}

export default page
