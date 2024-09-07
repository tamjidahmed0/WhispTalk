"use client";
import React from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { AppProvider } from "@/context/socket";

const storeProvider = ({ children }) => {
  return (
   
      <Provider store={store}>
        <AppProvider>
        {children}
        </AppProvider>
     
      </Provider>

  );
};

export default storeProvider;
