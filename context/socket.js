"use client";
import React, { useState, useEffect, createContext, useContext, useReducer, useRef } from "react";
import { io } from "socket.io-client";
import getCookie from "@/services/getCookie";
import deleteCookies from "@/services/deleteCookies";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const router = useRouter();
  const [, forceUpdate] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const userId = (await getCookie("c_user")).value;
        const cookie = (await getCookie("token")).value;

        // Initialize socket connection with the user ID if it's not already initialized
        if (!socketRef.current) {
          const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_API, {
            query: { userID: userId },
            auth: {
              token: cookie,
            },
          });


          newSocket.on("connect_error", async(error) => {

            // await deleteCookies('c_user')
            // await deleteCookies('token')
            // router.replace("/login");
           
            console.log("Socket connection error:", error);
          });



          // Set the socket in the ref
          socketRef.current = newSocket;
          forceUpdate((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    // Call the initialization function
    initializeSocket();

    // Cleanup function to disconnect the socket when the component is unmounted
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return <AppContext.Provider value={socketRef.current}>{children}</AppContext.Provider>;
};

export const useSocketContext = () => {
  return useContext(AppContext);
};

export { AppContext };
