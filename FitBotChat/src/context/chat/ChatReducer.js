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

        default:
            return state;
    }

}