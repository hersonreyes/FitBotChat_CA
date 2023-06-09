import { types } from "../../types/Types";

export const chatReducer = (state, action) => {
    
    switch(action.type) {
        case types.uploadedUsers:
            return{
                ...state,
                users: [ ...action.payload ]
            }

        default:
            return state;
    }

}