import React, { useContext, useEffect } from "react";
import "../styles/Chat.css";
import InboxPeople from "../components/InboxPeople";
import Messages from "../components/Messages";
import ChatSelect from "../components/ChatSelect";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/chat/ChatContext";
import BotMessages from "../components/BotMessages";

const Home = () => {
  // Obtiene el estado del chat del contexto ChatContext
  const { chatState } = useContext(ChatContext);

  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Si no hay un token de autenticación, redirige al usuario a la página de inicio de sesión
    if (!token) {
      return navigate("/auth/login");
    }
  }, [token]);

  return (
    <div className="messaging">
      <div className="inbox_msg">
        {/* Componente de la lista de personas en el chat */}
        <InboxPeople />

        {/* Renderiza el componente de mensajes si hay un chat activo */}
        {chatState.activeChat ? (
          <Messages />
        ) : chatState.activeBot ? (
          <BotMessages />
        ) : (
          <ChatSelect />
        )}
      </div>
    </div>
  );
};

export default Home;
