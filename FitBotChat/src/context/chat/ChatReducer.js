import { types } from "../../types/Types";

// Es una funcion que modificara el estado del context del chat
export const chatReducer = (state, action) => {
    
    // Dependiendo del tipo de accion que se reciba, se modificara el estado
    switch(action.type) {
        // Si el tipo de accion es uploadUsers, se pondra el campo users del estado con el valor del payload
        case types.uploadedUsers:
            return{
                ...state,
                users: [ ...action.payload ]
            }
        // Si el tipo de accion es activateChat, se pondra el campo activeChat del estado con el valor del payload y el arreglo de mensajes se vaciara
        case types.activateChat:
            if(state.activeChat === action.payload) return state;
            return{
                ...state,
                activeChat: action.payload,
                messages: []
            }
        //Si el tipo de accion es activateBot
        case types.activateBot:
            if(state.activeBot === action.payload) return state;
            return{
                ...state,
                activeBot: action.payload,
                activeChat: null,
                messages: [],
                botmessages: []
            }
        // Si el tipo de accion es newMessage, se agregara el mensaje al arreglo de mensajes
        case types.newMessage:
            if(state.activeChat === action.payload.from || state.activeChat === action.payload.to){
                return {
                    ...state,
                    messages: [ ...state.messages, action.payload ]
                }
            } else {
                return state;
            }
        // Si el tipo de accion es loadMessages, se pondra el campo messages del estado con el valor del payload 
        case types.loadMessages:
            return { 
                ...state,
                messages: [ ...action.payload ]
            }
        // Si el tipo de accion es logout, se pondra el estado en su valor inicial
        case types.logout:
            return {
                uid: '',
                activeChat: null, 
                users: [], 
                messages: [], 
            }
        //Si el tipo de accion es newMessageBot, se agregara el mensaje al arreglo de mensajes del bot
        case types.newMessageBot:
            return {
                ...state,
                botmessages: [ ...state.botmessages, action.payload ]
            }

        default:
            return state;
    }
}