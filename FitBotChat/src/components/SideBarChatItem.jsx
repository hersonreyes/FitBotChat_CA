import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/Types';

const SideBarChatItem = ({ user }) => {
  
  const { chatState, dispatch } = useContext(ChatContext);

  const activateChat = () => {
    dispatch({
      type: types.activateChat,
      payload: user.uid
    });
  }

  return (
    <div 
      className={`chat_list ${ (user.uid === chatState.activeChat) && 'active_chat' }`}
      onClick={ activateChat }
    >
        <div className="chat_people">
            <div className="chat_img"> 
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="chat_ib">
                <h5>{ user.name }</h5>
                {
                  (user.online)
                  ? <span className="text-success">Online</span>
                  : <span className="text-danger">Offline</span>
                }
            </div>
        </div>
    </div>
  )
}

export default SideBarChatItem