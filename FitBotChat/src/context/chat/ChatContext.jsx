import React, { createContext, useReducer } from "react";
import { chatReducer } from "./ChatReducer";

//Contexto de chat que contiene el estado de la aplicación
export const ChatContext = createContext();

//Estado inicial del contexto de chat
const initialState = {
    uid: '',
    activeChat: null, //UID of the user i want to send messages to
    users: [], //All users
    messages: [], //Selected chat
}

//Componente que provee el contexto de chat
export const ChatProvider = ({ children }) => {

    //Obtiene el estado de la aplicación y el método para actualizarlo
    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    //Retorna el contexto de chat
    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            { children }
        </ChatContext.Provider>
    )
}
