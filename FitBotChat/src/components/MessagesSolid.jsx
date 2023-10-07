import React, { useContext } from "react";
import SendMessage from "./SendMessage";
import { ChatContext } from "../context/chat/ChatContext";

const MessagesSolid = ({ children }) => {
  const { chatState } = useContext(ChatContext);
  const userActive = chatState.users;
  const User = userActive.filter(
    (user) => user.uid === chatState.activeChat
  )[0];

  return (
    <div className="mesgs">

        <div className="row border-bottom text-center">
            <div className="chat_ib">
                <h4>{User.name}</h4>
            </div>
        </div>

        <div id="messages" className="msg_history mt-2">
            { children }
        </div>

        <SendMessage />
    </div>
  );
};

export default MessagesSolid;
