//app context provider for admin
//file to store the admin context for the login and token
import React, { createContext } from 'react';

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const value = {


    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
            
        </AppContext.Provider>
    )
}

export default AppContextProvider