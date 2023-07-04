import React, { useEffect, useContext } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';
import { types } from '../types/Types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

//Contexto que contiene la información del socket
export const SocketContext = createContext();

//Componente que provee el contexto del socket
export const SocketProvider = ({ children }) => {

    //Obtiene el estado del contexto de autenticación
    const { socket, online, connectSocket, disconnectSocket } = useSocket('http://localhost:8080');
    //Obtiene el estado del contexto de autenticación
    const { auth } = useContext( AuthContext );
    //Obtiene el estado del contexto de chat
    const { dispatch } = useContext( ChatContext );

    //Conecta el socket cuando el usuario se autentica
    useEffect(() => {

        if(auth.logged){
            connectSocket();
        }

    }, [auth, connectSocket]);

    //Desconecta el socket cuando el usuario se desautentica
    useEffect(() => {

        if(!auth.logged){
            disconnectSocket();
        }

    }, [auth, disconnectSocket]);

    //Escucha los cambios en en el estado de los usuarios
    useEffect(() => {

        socket?.on('users-list', (users) => {
            dispatch({
                type: types.uploadedUsers,
                payload: users
            });
        })

    }, [socket, dispatch]);

    //Escucha los mensajes personales
    useEffect(() => {

        socket?.on('personal-message', (message) => {
            dispatch({
                type: types.newMessage,
                payload: message
            });

            scrollToBottomAnimated('messages');
        });

    }, [socket, dispatch]);
    
    //Retorna el contexto del socket
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}