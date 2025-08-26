import { createContext, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const clearUser = () => {
        setUser(null);
    }

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         const savedUser = JSON.parse(localStorage.getItem("user"));
    //         if (savedUser) {
    //             setUser(savedUser);
    //         }
    //     }
    // }, []);

    const contextValue = {
        user,
        setUser,
        clearUser
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}