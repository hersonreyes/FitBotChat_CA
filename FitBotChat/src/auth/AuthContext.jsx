import React, { createContext, useCallback, useState } from "react";
import { fetchWithoutToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: true,
    name: null,
    email: null,
};


export const AuthProvider = ({ children }) => {
  
    const [auth, setAuth] = useState(initialState);

    const login = async(email, password) => {

        const resp = await fetchWithoutToken('auth/login', {email, password}, 'POST');

        console.log(resp);
    }

    const register = (name, email, password) => {

    }

    const verifyToken = useCallback(() => {

    }, []);

    const logout = () => {

    }

    return (
        <AuthContext.Provider value={{
            login,
            register,
            verifyToken,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}
