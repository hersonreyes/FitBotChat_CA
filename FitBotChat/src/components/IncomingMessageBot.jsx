import React from 'react';
import { hourMonth } from '../helpers/hourMonth';

const IncomingMessage = ({ msg }) => {
  
  return (
    <div className="incoming_msg">
        <div className="received_msg">
            <div className="received_withd_msg">
                <p>{ msg.msg }</p>
                <span className="time_date"> { hourMonth(msg.createdAt) }</span>
            </div>
        </div>
    </div>
  )
}

export default IncomingMessage