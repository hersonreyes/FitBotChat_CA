import React from 'react';
import { hourMonth } from '../helpers/hourMonth';

const OutgoingMessageBot = ({ msg }) => {
  // Componente que representa un mensaje saliente del bot
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        {/* Muestra el contenido del mensaje */}
        <p>{ msg.msg }</p>
        {/* Muestra la hora y fecha de creación del mensaje utilizando la función hourMonth del archivo hourMonth.js */}
        <span className="time_date"> { hourMonth(msg.createdAt) }</span>
      </div>
    </div>
  )
}

export default OutgoingMessageBot;
