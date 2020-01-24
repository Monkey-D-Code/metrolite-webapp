import outletTypes from './Outlet.types';
import backendAPI from '../../config/backend';

const allOutletsStart = ()=>({
    type :  outletTypes.ALL_OUTLETS_START
})
const allOutletsSuccess = all_outlets =>({
    type : outletTypes.ALL_OUTLETS_SUCCESS,
    payload : all_outlets,
})
const allOutletsError = error =>({
    type : outletTypes.ALL_OUTLETS_ERROR,
    payload : error,
})
export const getAllOutlets = ()=>{
    return dispatch =>{
        dispatch(allOutletsStart());
        backendAPI.get('/outlets/list/')
            .then(res=>dispatch(allOutletsSuccess(res.data)))
            .catch(err=>dispatch(allOutletsError(err.response)));
    }
}

export const selectOutlet = outlet=>({
    type : outletTypes.SELECT_OUTLET,
    payload : outlet,
})

const singleOutletStart = ()=>({
    type :  outletTypes.SINGLE_OUTLET_START
})
const singleOutletSuccess = all_outlets =>({
    type : outletTypes.SINGLE_OUTLET_SUCCESS,
    payload : all_outlets,
})
const singleOutletError = error =>({
    type : outletTypes.SINGLE_OUTLET_ERROR,
    payload : error,
})
export const getsingleOutlet = (outlet_id)=>{
    return dispatch =>{
        dispatch(singleOutletStart());
        backendAPI.get(`/outlets/edit/${outlet_id}/`)
            .then(res=>dispatch(singleOutletSuccess(res.data)))
            .catch(err=>dispatch(singleOutletError(err.response)));
    }
}