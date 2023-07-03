import React from 'react';
import { hourMonth } from '../helpers/hourMonth';

//Componente que muestra los mensajes entrantes en el chat (recibidos por el usuario )
const IncomingMessage = ({ msg }) => {
  
  return (
    <div className="incoming_msg">
        <div className="received_msg">
            <div className="received_withd_msg">
                <p>{ msg.message }</p>
                <span className="time_date"> { hourMonth(msg.createdAt) }</span>
            </div>
        </div>
    </div>
  )
}

export default IncomingMessage