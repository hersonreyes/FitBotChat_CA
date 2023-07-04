import React, { useContext } from "react";
import SendMessage from "./SendMessage";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";

//Componente que contiene el historial de mensajes de un chat
const Messages = () => {
  //Obtiene el estado del contexto de chat
  const { chatState } = useContext(ChatContext);
  //Obtiene el estado del contexto de autenticación
  const { auth } = useContext(AuthContext);
  //Obtiene el usuario activo del chat
  const userActive = chatState.users;
  //Obtiene el usuario activo del chat que se encuentra en el estado del contexto de chat
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
        {/*Se obtienen los mensajes del chatState y se mapean para mostrarlos*/}
        {chatState.messages.map((msg) =>
          //Si el mensaje es enviado por el usuario activo, se muestra un mensaje entrante, de lo contrario se muestra un mensaje saliente
          msg.to === auth.uid ? (
            <IncomingMessage key={msg._id} msg={msg} />
          ) : (
            <OutgoingMessage key={msg._id} msg={msg} />
          )
        )}
      </div>
      {/* <!-- Historia Fin --> */}

      <SendMessage />
    </div>
  );
};

export default Messages;
