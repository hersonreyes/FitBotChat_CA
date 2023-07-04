import { useContext } from "react";
import BotSendMessage from "./BotSendMessage";
import IncomingMessageBot from "./IncomingMessageBot";
import OutgoingMessageBot from "./OutgoingMessageBot";
import { ChatContext } from "../context/chat/ChatContext";

const BotMessages = () => {
  const { chatState } = useContext(ChatContext);
  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}

      <div className="row border-bottom text-center">
        <div className="chat_ib">
          <h4>FITBOT</h4>
        </div>
      </div>

      <div id="messages" className="msg_history mt-2">
        {chatState.botmessages.map((message, index) =>
          message.status === 2 ? (
            <IncomingMessageBot key={index} msg={message} />
          ) : (
            <OutgoingMessageBot key={index} msg={message} />
          )
        )}
      </div>
      {/* <!-- Historia Fin --> */}

      <BotSendMessage />
    </div>
  );
};

export default BotMessages;
