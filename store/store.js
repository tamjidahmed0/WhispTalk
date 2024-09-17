import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from '@/features/toggleSlice'
import darkModeReducer from '@/features/darkModeSlice'
import blockSliceReducer from '@/features/blockSlice'
import rightSidebarReducer from '@/features/rightsidebarSlice'
import socketReducer from '@/features/socket'
import profileDetailsReducer from '@/features/profileDetails'
import callToggleSliceReducer from '@/features/callToggleSlice'
import incommingCallReducer from '@/features/incommingCallSlice'
import rejectCall from '@/features/rejectCall'
import handleCallReducer from '@/features/handleCallSlice'
import outgoingCallToggle from '@/features/outgoingCallToggle'
import messageIdReducer from '@/features/messageid'
import chatReducer from '@/features/chatSlice'


export const store = configureStore({
  reducer: {
    toggle:toggleReducer,
    darkMode: darkModeReducer,
    blockSlice:blockSliceReducer,
    rightsidebar:rightSidebarReducer,
    socket:socketReducer,
    profileDetails:profileDetailsReducer,
    calltoggle:callToggleSliceReducer,
    IncommingCall: incommingCallReducer,
    rejectCall :rejectCall,
    handleCall: handleCallReducer,
    outgoingCall: outgoingCallToggle,
    messageId:messageIdReducer,
    chats: chatReducer,

  },
})