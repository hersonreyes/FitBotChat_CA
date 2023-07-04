import React, { useContext } from 'react'
import SideBarChatItem from './SideBarChatItem'
import SideBarBot from './SideBarBot'
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

const Sidebar = () => {
  // Obtiene el estado del chat y la información de autenticación del contexto
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
        {/* Componente de la barra lateral del bot */}
        <SideBarBot />

        {/* Renderiza los elementos de chat de la barra lateral para los usuarios */}
        {
            chatState.users
                .filter( user => user.uid !== auth.uid )
                .map((user) => (
                <SideBarChatItem 
                  key={user.uid}
                  user={user} 
                />
            ))
        }

        {/* Espacio adicional para el desplazamiento */}
        <div className="extra_space"></div>

    </div>
  )
}

export default Sidebar;
