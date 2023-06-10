import React from 'react'

const OutgoingMessage = ({ msg }) => {
  return (
    <div className="outgoing_msg">
        <div className="sent_msg">
            <p>{ msg.message }</p>
            <span className="time_date"> 11:01 AM | June 9</span>
        </div>
    </div>
  )
}

export default OutgoingMessage