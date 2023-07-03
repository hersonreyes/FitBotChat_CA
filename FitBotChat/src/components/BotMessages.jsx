import { React, useContext } from "react";
import BotSendMessage from "./BotSendMessage";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

const BotMessages = () => {
  const { chatState } = useContext(ChatContext);
  const { auth } = useContext(AuthContext);
  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}

      <div className="row border-bottom text-center">
        <div className="chat_ib">
          <h4>FITBOT</h4>
        </div>
      </div>

      <div id="messages" className="msg_history mt-2">
        {chatState.botmessages.map((msg) =>
          msg.to === auth.uid ? (
            <IncomingMessage key={msg._id} msg={msg} />
          ) : (
            <OutgoingMessage key={msg._id} msg={msg} />
          )
        )}
      </div>
      {/* <!-- Historia Fin --> */}

      <BotSendMessage />
    </div>
  );
};

export default BotMessages;
