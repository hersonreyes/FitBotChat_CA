import React, { useContext, useEffect } from 'react';
import '../styles/Chat.css';
import InboxPeople from '../components/InboxPeople';
import Messages from '../components/Messages';
import ChatSelect from '../components/ChatSelect';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../context/chat/ChatContext';
import BotMessages from '../components/BotMessages';

const Home = () => {

  const { chatState } = useContext( ChatContext );

  let navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(!token){
      return navigate("/auth/login");
    }
  }, [token]);

  return (
    <div className="messaging">
        <div className="inbox_msg">

            <InboxPeople />

            {
                (chatState.activeChat)
                    ? <Messages />
                    : (chatState.activeBot) ? <BotMessages />
                    :  <ChatSelect />
            }
        </div>


    </div>
  )
}

export default Home