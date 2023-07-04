import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

//Funcion para conectar el socket
export const useSocket = ( serverPath ) => {
    
    // Se crea el estado del socket
    const [socket, setSocket] = useState(null);
    // Se crea el estado para saber si el usuario esta conectado
    const [ online, setOnline ] = useState(false);

    // Se crea la funcion para conectar el socket
    const connectSocket = useCallback(() => {

        // Se obtiene el token del local storage
        const token = localStorage.getItem('token');

        // Se crea el socket con los parametros necesarios
        const socketTemp = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });

        // Se guarda el socket en el estado
        setSocket( socketTemp );

    }, [serverPath]);

    // Se crea la funcion para desconectar el socket
    const disconnectSocket = useCallback(() => {

        socket?.disconnect();

    }, [socket]);

    // Se crea el useEffect para verificar si el socket existe y si existe conectarse
    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    // Se crea el useEffect para verificar si el socket existe y si existe cambiarle el estado a conectado
    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    // Se crea el useEffect para verificar si el socket existe y si existe cambiarle el estado a desconectado
    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    // Se retorna el socket, el estado de online, la funcion para conectar el socket y la funcion para desconectar el socket
    return {
        socket,
        online,
        connectSocket,
        disconnectSocket
    }
}