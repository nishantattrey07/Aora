import React, { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { isLogged: loggedIn, user: currentUser } = await checkAuthStatus();
                setIsLogged(loggedIn);
                setUser(currentUser);
            } catch (error) {
                console.error("Error checking auth status:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser,
                loading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;