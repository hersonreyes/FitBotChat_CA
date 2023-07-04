import React, { useEffect, useContext } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { types } from '../types/Types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, connectSocket, disconnectSocket } = useSocket('https://fitchat-backend-6cb534693029.herokuapp.com');
    const { auth } = useContext( AuthContext );
    const { dispatch } = useContext( ChatContext );

    useEffect(() => {

        if(auth.logged){
            connectSocket();
        }

    }, [auth, connectSocket]);

    useEffect(() => {

        if(!auth.logged){
            disconnectSocket();
        }

    }, [auth, disconnectSocket]);

    //Listen for changes in connected users
    useEffect(() => {

        socket?.on('users-list', (users) => {
            dispatch({
                type: types.uploadedUsers,
                payload: users
            });
        })

    }, [socket, dispatch]);

    useEffect(() => {

        socket?.on('personal-message', (message) => {
            dispatch({
                type: types.newMessage,
                payload: message
            });

            scrollToBottomAnimated('messages');
        });

    }, [socket, dispatch]);
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}