import React from 'react';
import '../styles/Chat.css';
import InboxPeople from '../components/InboxPeople';
import Messages from '../components/Messages';
import ChatSelect from '../components/ChatSelect';

const Home = () => {
  return (
    <div className="messaging">
        <div className="inbox_msg">

            <InboxPeople />

            {
                (true)
                    ? <Messages />
                    : <ChatSelect />  
            }
        </div>


    </div>
  )
}

export default Home