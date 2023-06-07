import React, { createContext, useCallback, useState } from "react";
import { fetchWithoutToken } from "../helpers/fetch";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};


export const AuthProvider = ({ children }) => {
  
    const [auth, setAuth] = useState(initialState);

    const login = async(email, password) => {

        const resp = await fetchWithoutToken('auth/login', {email, password}, 'POST');
        
        if(resp.ok){
            localStorage.setItem('token', resp.token);
            const { uid, name, email } = resp.user;

            setAuth({
                uid: uid,
                checking: false,
                logged: true,
                name: name,
                email: email
            });

            console.log('Authenticated');
        }

        return resp.ok;
    }

    const register = async(name, email, password) => {

        const resp = await fetchWithoutToken('auth/new', {name, email, password}, 'POST');
        
        if(resp.ok){
            localStorage.setItem('token', resp.token);
            const { uid, name, email } = resp.user;

            setAuth({
                uid: uid,
                checking: false,
                logged: true,
                name: name,
                email: email
            });

            console.log('Authenticated');
            return true;
        }

        return resp.msg;

    }

    const verifyToken = useCallback(() => {

    }, []);

    const logout = () => {

    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verifyToken,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}
