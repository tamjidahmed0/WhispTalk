import { io } from "socket.io-client";
import getCookie from "@/services/getCookie";

let socket = null; // initialize socket object to null

const getSocket = async(userId, id) => {
  
  if (!socket) {
    const userId = (await getCookie('c_user')).value;
    const cookie = (await getCookie('token')).value;
    // console.log(id , 'come from socket')
    socket = io(process.env.NEXT_PUBLIC_API, {
      query: { userID:userId, receiverId:id }  ,
      auth:{
        token: cookie
      }
    });
    // add event listeners and emit events as needed
  }
return socket
  
};

export default getSocket;
