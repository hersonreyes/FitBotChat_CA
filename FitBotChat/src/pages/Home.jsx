import React, { useContext, useEffect } from 'react';
import '../styles/Chat.css';
import InboxPeople from '../components/InboxPeople';
import Messages from '../components/Messages';
import ChatSelect from '../components/ChatSelect';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../context/chat/ChatContext';

//Pagina principal de la aplicacion
const Home = () => {

  //Obtenemos el estado del chat
  const { chatState } = useContext( ChatContext );

  //Obtenemos la función para navegar entre páginas
  let navigate = useNavigate();
  //Obtenemos el token del usuario
  const token = localStorage.getItem('token');

  //Si no hay token, redirige a la página de login
  useEffect(() => {
    if(!token){
      return navigate("/auth/login");
    }
  }, [token]);

  //Si no hay chat activo, redirige a la página de chat select
  return (
    <div className="messaging">
        <div className="inbox_msg">

            <InboxPeople />

            {
                (chatState.activeChat)
                    ? <Messages />
                    : <ChatSelect />  
            }
        </div>


    </div>
  )
}

export default Home