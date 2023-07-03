import React, { useContext } from 'react'
import SideBarChatItem from './SideBarChatItem'
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

//Componente que muestra la lista de usuarios registrados en la aplicación
const Sidebar = () => {

  //Obtiene el estado del contexto de chat
  const { chatState } = useContext(ChatContext);
  //Obtiene el estado del contexto de autenticación
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">

        {//Muestra la lista de usuarios registrados en la aplicación y que no sean el usuario actual
            chatState.users
                .filter( user => user.uid !== auth.uid )
                .map((user) => (
                <SideBarChatItem 
                  key={user.uid}
                  user={user} 
                />
            ))
        }

        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>

    </div>
  )
}

export default Sidebar