import React, { useContext } from 'react'
import SideBarChatItem from './SideBarChatItem'
import SideBarBot from './SideBarBot'
import { ChatContext } from '../context/chat/ChatContext';
import { AuthContext } from '../auth/AuthContext';

const Sidebar = () => {

  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
        <SideBarBot />
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

        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>

    </div>
  )
}

export default Sidebar