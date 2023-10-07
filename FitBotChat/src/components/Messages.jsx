import React, { useContext } from "react";
import SendMessage from "./SendMessage";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

const Messages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  const userActive = chatState.users;
  const User = userActive.filter(
    (user) => user.uid === chatState.activeChat
  )[0];

  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}

      <div className="row border-bottom text-center">
    <div className="chat_ib">
      <h4>{User.name}</h4>
    </div>
    </div>

      <div id="messages" className="msg_history mt-2">
        {chatState.messages.map((msg) => {
          if (msg.to === auth.uid)
            return <IncomingMessage key={msg._id} msg={msg} />;
          else
            return <OutgoingMessage key={msg._id} msg={msg} />;
        })}
      </div>
      {/* <!-- Historia Fin --> */}

      <SendMessage />
    </div>
  );
};

export default Messages;
