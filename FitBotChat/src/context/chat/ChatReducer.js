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
                messages: []
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

        default:
            return state;
    }

}