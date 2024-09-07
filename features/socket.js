
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import getCookie from "@/services/getCookie";

const initialState = {
    socket : null
}



const socketSlice = createSlice({
    name : 'socket',
    initialState,
    reducers :{
        connectSocket : async(state) =>{
            if(!state.socket){
               
                state.socket = io(process.env.NEXT_PUBLIC_API)
            }
        },

        disconnectSocket : (state) =>{
            if(state.socket){
                state.socket.disconnect()
                state.socket = null

            }
        }
    }
})

export const {connectSocket, disconnectSocket} =socketSlice.actions
export default socketSlice.reducer