import React, { createContext } from 'react';

export const UserAppContext = createContext();

const UserAppContextProvider = (props) => {
  const value = {
    // You can add shared values or functions here if needed
  };

  return (
    <UserAppContext.Provider value={value}>
      {props.children}
    </UserAppContext.Provider>
  );
};

export default UserAppContextProvider;
