
import React, { createContext, useState } from 'react';

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const[aToken,setAToken] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const value = {
        aToken,setAToken,backendUrl,



    }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
            
        </AdminContext.Provider>
    )
}

/**
 * Provides the AdminContext to its children components.
 * This context can be used to manage and access admin-related state and actions.
 *
 * @component
 * @example
 * return (
 *   <AdminContextProvider>
 *     <YourComponent />
 *   </AdminContextProvider>
 * )
 */
export default AdminContextProvider;
