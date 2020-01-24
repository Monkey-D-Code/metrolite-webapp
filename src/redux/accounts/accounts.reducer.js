import accountsTypes from './accounts.types';

const INITIAL_STATE = {
    activeUser : null,
    loadingUser : false,
    userError : null,

    token : null,
    tokenError : null,
}

const accountsReducer = (state = INITIAL_STATE , action)=>{
    switch(action.type){
        case accountsTypes.USER_LOGOUT:
            return {
                ...state,
                activeUser : null,
                userError : null,
                token : null,
                tokenError : null,
            }
        case accountsTypes.AUTH_TOKEN_START:
            return {
                ...state,
                loadingUser : true,
                userError : null,
                tokenError : null,
            }
        
            case accountsTypes.AUTH_TOKEN_SUCCESS:
                return {
                    ...state,
                    token : action.payload,
                    loadingUser : false,
                }
            case accountsTypes.AUTH_TOKEN_ERROR:
                return {
                    ...state,
                    tokenError : action.payload,
                    loadingUser : false,
                }
            case accountsTypes.USER_START:
                return {
                    ...state,
                    loadingUser : true,
                }
            case accountsTypes.USER_SUCCESS:
                return {
                    ...state,
                    activeUser : action.payload,
                    loadingUser : false,
                }
            case accountsTypes.USER_ERROR:
                return {
                    ...state,
                    userError : action.payload,
                    loadingUser : false,
                }
        default:
            return state;
    }
}

export default accountsReducer;