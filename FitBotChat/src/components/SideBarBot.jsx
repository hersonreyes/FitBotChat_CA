import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from "../auth/AuthContext";
import { types } from '../types/Types';

const SideBarBot = () => {
  
  const { auth } = useContext(AuthContext);
  const { chatState, dispatch } = useContext(ChatContext);

  const activateBot = async() => {
    dispatch({
      type: types.activateBot,
      payload: auth.uid
    });
  }

  return (
    <div 
      className={`chat_list ${ (auth.uid === chatState.activeBot) && 'active_chat' }`}
      onClick={ activateBot }
    >
        <div className="chat_people">
            <div className="chat_img"> 
                <img src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" alt="sunil" />
            </div>
            <div className="chat_ib">
                <h5>FITBOT</h5>
                <span className="text-success">Online</span>
            </div>
        </div>
    </div>
  )
}

export default SideBarBot