import React, { createContext, useReducer } from "react";
import { chatReducer } from "./ChatReducer";

export const ChatContext = createContext();

const initialState = {
    uid: '',
    activeChat: null, //UID of the user i want to send messages to
    activeBot: null, //UID of the user who is talking with the bot
    users: [], //All users
    messages: [], //Selected chat
    botmessages: [], //bot messages
}

export const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            { children }
        </ChatContext.Provider>
    )
}
