import { useContext } from "react";
import BotSendMessage from "./BotSendMessage";
import IncomingMessageBot from "./IncomingMessageBot";
import OutgoingMessageBot from "./OutgoingMessageBot";
import { ChatContext } from "../context/chat/ChatContext";

const BotMessages = () => {
  // Utiliza el hook useContext para obtener el estado del chat desde el ChatContext
  const { chatState } = useContext(ChatContext);
  return (
    <div className="mesgs">
      {/* Historia inicio */}
      {/* Comentario: Esta sección contiene el encabezado de la conversación */}
      <div className="row border-bottom text-center">
        <div className="chat_ib">
          <h4>FITBOT</h4>
        </div>
      </div>

      <div id="messages" className="msg_history mt-2">
        {/* Comentario: Mapea los mensajes del bot y muestra componentes IncomingMessageBot o OutgoingMessageBot según el estado del mensaje */}
        {chatState.botmessages.map((message, index) =>
          message.status === 2 ? (
            <IncomingMessageBot key={index} msg={message} />
          ) : (
            <OutgoingMessageBot key={index} msg={message} />
          )
        )}
      </div>
      {/* Historia Fin */}
      
      {/* Renderiza el componente BotSendMessage */}
      <BotSendMessage />
    </div>
  );
};

export default BotMessages;
