import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext';
import { types } from '../types/Types';
import { fetchWithToken } from '../helpers/fetch';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

//Componente que contiene la información de un usuario en la lista de chats
const SideBarChatItem = ({ user }) => {
  
  //Obtiene el estado del contexto de chat
  const { chatState, dispatch } = useContext(ChatContext);

  //Activa el chat del usuario seleccionado
  const activateChat = async() => {
    dispatch({
      type: types.activateChat,
      payload: user.uid
    });

    //Carga los mensajes del usuario seleccionado
    const resp = await fetchWithToken(`messages/${user.uid}`);
    dispatch({
      type: types.loadMessages,
      payload: resp.messages
    });

    scrollToBottomAnimated('messages');
  }

  return (
    //Muestra la información del usuario en la lista de chats y lo marca como activo si es el usuario seleccionado
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
                {//Muestra el estado del usuario (Online/Offline)
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