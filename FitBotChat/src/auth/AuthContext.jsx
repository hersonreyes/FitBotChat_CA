import React, { createContext, useCallback, useState } from "react";
import { fetchWithToken, fetchWithoutToken } from "../helpers/fetch";

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

            return true;
        }

        return resp.msg;

    }

    const verifyToken = useCallback( async() => {

        const token = localStorage.getItem('token');

        //If token doesnt exists
        if(!token){
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            });

            return false;
        }

        const resp = await fetchWithToken('auth/renew');
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

            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            });

            return false;
        }

    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false
        });
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
