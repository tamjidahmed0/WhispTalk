import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from '@/app/features/toggleSlice'
import darkModeReducer from '@/app/features/darkModeSlice'
import blockSliceReducer from '@/app/features/blockSlice'
import rightSidebarReducer from '@/app/features/rightsidebarSlice'
import socketReducer from '@/app/features/socket'
import profileDetailsReducer from '@/app/features/profileDetails'

export const store = configureStore({
  reducer: {
    toggle:toggleReducer,
    darkMode: darkModeReducer,
    blockSlice:blockSliceReducer,
    rightsidebar:rightSidebarReducer,
    socket:socketReducer,
    profileDetails:profileDetailsReducer
  },
})