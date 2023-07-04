import React from 'react';
import { hourMonth } from '../helpers/hourMonth';

const IncomingMessageBot = ({ msg }) => {
  // Componente que representa un mensaje entrante del bot
  return (
    <div className="incoming_msg">
      <div className="received_msg">
        <div className="received_withd_msg">
          {/* Muestra el contenido del mensaje */}
          <p>{ msg.msg }</p>
          {/* Muestra la hora y fecha de creación del mensaje utilizando la función hourMonth del archivo hourMonth.js */}
          <span className="time_date"> { hourMonth(msg.createdAt) }</span>
        </div>
      </div>
    </div>
  )
}

export default IncomingMessageBot;
