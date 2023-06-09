import React, { useEffect, useContext } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { types } from '../types/Types';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, connectSocket, disconnectSocket } = useSocket('http://localhost:8080');
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
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}