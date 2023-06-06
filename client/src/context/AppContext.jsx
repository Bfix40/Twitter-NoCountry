import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [appContext, setAppContext] = useState({
    post: {},
    active: false
  });

  return (
        <AppContext.Provider value={[appContext, setAppContext]}>
            {children}
        </AppContext.Provider>
  );
}
