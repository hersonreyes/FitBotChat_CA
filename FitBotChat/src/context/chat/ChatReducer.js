import { types } from "../../types/Types";

export const chatReducer = (state, action) => {
    
    switch(action.type) {
        case types.uploadedUsers:
            return{
                ...state,
                users: [ ...action.payload ]
            }
        
        case types.activateChat:
            if(state.activeChat === action.payload) return state;
            return{
                ...state,
                activeChat: action.payload,
                activeBot: null,
                botmessages: [],
                messages: []
            }
        
        case types.activateBot:
            if(state.activeBot === action.payload) return state;
            return{
                ...state,
                activeBot: action.payload,
                activeChat: null,
                messages: [],
                botmessages: []
            }

        case types.newMessage:
            if(state.activeChat === action.payload.from || state.activeChat === action.payload.to){
                return {
                    ...state,
                    messages: [ ...state.messages, action.payload ]
                }
            } else {
                return state;
            }
        
        case types.loadMessages:
            return { 
                ...state,
                messages: [ ...action.payload ]
            }
        
        case types.logout:
            return {
                uid: '',
                activeChat: null, 
                users: [], 
                messages: [], 
            }
        case types.newMessageBot:
            return {
                ...state,
                botmessages: [ ...state.botmessages, action.payload ]
            }

        default:
            return state;
    }

}