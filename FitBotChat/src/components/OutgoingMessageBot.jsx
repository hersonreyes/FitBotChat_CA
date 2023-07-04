import React from 'react';
import { hourMonth } from '../helpers/hourMonth';

const OutgoingMessage = ({ msg }) => {
  return (
    <div className="outgoing_msg">
        <div className="sent_msg">
            <p>{ msg.msg }</p>
            <span className="time_date"> { hourMonth(msg.createdAt) }</span>
        </div>
    </div>
  )
}

export default OutgoingMessage