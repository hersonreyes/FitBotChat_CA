import { types } from "../../types/Types";

export const chatReducer = (state, action) => {
    // El reducer recibe el estado actual y una acción que contiene el tipo y los datos adicionales

    switch(action.type) {
        case types.uploadedUsers:
            // Actualiza la lista de usuarios con los datos proporcionados en la acción
            return {
                ...state,
                users: [ ...action.payload ]
            }
        
        case types.activateChat:
            // Activa un chat específico y desactiva el chat bot
            if(state.activeChat === action.payload) return state;
            return {
                ...state,
                activeChat: action.payload,
                activeBot: null,
                botmessages: [],
                messages: []
            }
        
        case types.activateBot:
            // Activa el chat bot y desactiva el chat activo
            if(state.activeBot === action.payload) return state;
            return {
                ...state,
                activeBot: action.payload,
                activeChat: null,
                messages: [],
                botmessages: []
            }

        case types.newMessage:
            // Agrega un nuevo mensaje al estado solo si el chat activo coincide con el remitente o el destinatario del mensaje
            if(state.activeChat === action.payload.from || state.activeChat === action.payload.to){
                return {
                    ...state,
                    messages: [ ...state.messages, action.payload ]
                }
            } else {
                return state;
            }
        
        case types.loadMessages:
            // Carga los mensajes del chat en el estado
            return { 
                ...state,
                messages: [ ...action.payload ]
            }
        
        case types.logout:
            // Realiza un restablecimiento del estado cuando el usuario cierra sesión
            return {
                uid: '',
                activeChat: null, 
                users: [], 
                messages: [], 
            }
        
        case types.newMessageBot:
            // Agrega un nuevo mensaje del bot al estado
            return {
                ...state,
                botmessages: [ ...state.botmessages, action.payload ]
            }

        default:
            return state;
    }
}