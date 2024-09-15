"use client";
import React from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { AppProvider } from "@/context/socket";
import ThemeProvider from "@/themeProvider/themeProvider";

const storeProvider = ({ children }) => {
  
  return (
   
      <Provider store={store}>
       
        <AppProvider>
        <ThemeProvider>
        {children}
        </ThemeProvider>
       
        </AppProvider>
     
      </Provider>

  );
};

export default storeProvider;
