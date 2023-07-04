import { useState } from 'react';
import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from '../auth/AuthContext';
import { SocketContext } from '../context/SocketContext'
import { types } from '../types/Types';

const BotSendMessage = () => {
    // Utiliza el hook useState para hacer un manejo en el estado del mensaje
    const [message, setMessage] = useState('');
    // Obtiene el estado y el despachador del contexto ChatContext
    const { dispatch } = useContext(ChatContext);

    const onChange = ({ target }) => {
        setMessage(target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (message.length === 0) { return; }
        setMessage('');

        // Crea un objeto de mensaje de usuario
        const respUser = {
            status: 1,
            msg: message
        }

        // Despacha la acción de agregar un nuevo mensaje del usuario al despachador de ChatContext
        dispatch({
            type: types.newMessageBot,
            payload: respUser
        });

        try {
            // Envía una solicitud POST al servidor con el mensaje del usuario
            const response = await fetch('http://127.0.0.1:8085/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ entrada: message })
            });

            if (!response.ok) {
                throw new Error('Error al enviar el mensaje al bot');
            }

            // Lee la respuesta del servidor
            const data = await response.json();
            // Obtiene la respuesta del bot desde el objeto data
            const respuesta = data.respuesta;

            // Crea un objeto de mensaje del bot
            const respBot = {
                status: 2,
                msg: respuesta
            }

            // Despacha la acción de agregar un nuevo mensaje del bot al despachador de ChatContext
            dispatch({
                type: types.newMessageBot,
                payload: respBot
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className="type_msg row col-12">
                    <div className="input_msg_write col-sm-11">
                        <input
                            type="text"
                            className="write_msg"
                            placeholder="Mensaje..."
                            value={message}
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-sm-1 text-center">
                        <button className="msg_send_btn mt-3" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BotSendMessage;
