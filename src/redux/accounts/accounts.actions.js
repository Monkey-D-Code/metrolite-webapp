import accountsTypes from './accounts.types';
import backendAPI from '../../config/backend';





const authTokenStart = ()=>({
    type : accountsTypes.AUTH_TOKEN_START,
})
const authTokenSuccess = token =>({
    type : accountsTypes.AUTH_TOKEN_SUCCESS,
    payload : token,
})
const authTokenError = error =>({
    type : accountsTypes.AUTH_TOKEN_ERROR,
    payload : error,
})

const userStart = ()=>({
    type : accountsTypes.USER_START,
})
const userSuccess = user =>({
    type : accountsTypes.USER_SUCCESS,
    payload : user,
})
const userError = error=>({
    type : accountsTypes.USER_ERROR,
    payload  : error,
})


export const userLogin = authData =>{
    return dispatch =>{
        dispatch(authTokenStart());
        backendAPI.post('/accounts/login/' , authData)
            .then(res=>{
                dispatch(authTokenSuccess(res.data.token));
                dispatch(userStart());
                backendAPI.post('/accounts/staff-from-token/',{token:res.data.token})
                    .then(res2=>dispatch(userSuccess(res2.data)))
                    .catch(err=>dispatch(userError(err.response)));
            })
            .catch(err=>dispatch(authTokenError(err.response)));
    }
}

export const logout = ()=>({
    type : accountsTypes.USER_LOGOUT,
})