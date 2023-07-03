import React, { useContext, createContext, useCallback, useState } from "react";
import { fetchWithToken, fetchWithoutToken } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/Types";

//Contexto que utiliza la aplicación para manejar la autenticación del usuario
export const AuthContext = createContext();

//Estado inicial del contexto
const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

//Componente que provee el contexto de autenticación a la aplicación
export const AuthProvider = ({ children }) => {
  
    //Estado del contexto de autenticación
    const [auth, setAuth] = useState(initialState);
    const { dispatch } = useContext(ChatContext);

    //Función que realiza el login del usuario
    const login = async(email, password) => {

        //Realiza la petición al backend para realizar el login
        const resp = await fetchWithoutToken('auth/login', {email, password}, 'POST');
        
        //Si la petición es exitosa, se guarda el token en el local storage y se actualiza el estado del contexto
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

    //Función que realiza el registro del usuario
    const register = async(name, email, password) => {

        //Realiza la petición al backend para realizar el registro
        const resp = await fetchWithoutToken('auth/new', {name, email, password}, 'POST');
        
        //Si la petición es exitosa, se guarda el token en el local storage y se actualiza el estado del contexto
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

    //Función que verifica si el token del usuario es válido y lo renueva si es necesario
    const verifyToken = useCallback( async() => {

        //Obtiene el token del local storage
        const token = localStorage.getItem('token');

        //Si no hay token, se actualiza el estado del contexto
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

        //Realiza la petición al backend para verificar el token y renovarlo si es necesario
        const resp = await fetchWithToken('auth/renew');
        //Si la petición es exitosa, se guarda el token en el local storage y se actualiza el estado del contexto
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
            //Si la petición no es exitosa, se actualiza el estado del contexto
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

    //Función que realiza el logout del usuario, actualiza el estado del contexto y el local storage
    const logout = () => {
        localStorage.removeItem('token');

        dispatch({ type: types.logout });

        setAuth({
            checking: false,
            logged: false
        });
    }

    //Retorna el contexto de autenticación con las funciones y el estado del contexto
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
