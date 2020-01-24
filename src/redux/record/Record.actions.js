import recordTypes from './Record.types';
import backendAPI from '../../config/backend';


export const changeSaleDate = newDate =>({
    type : recordTypes.SALE_DATE_CHANGE,
    payload : newDate,
})
export const changePurchaseDate = newDate =>({
    type : recordTypes.PURCHASE_DATE_CHANGE,
    payload : newDate,
})


const saleRecordStart = ()=>({
    type : recordTypes.SALE_RECORDS_START,

})
const saleRecordSuccess = records =>({
    type : recordTypes.SALE_RECORDS_SUCCESS,
    payload : records,
})
const saleRecordError = err =>({
    type : recordTypes.SALE_RECORDS_ERROR,
    payload : err,
})
export const getSaleRecords = (date,outlet_id) =>{
    return dispatch=>{
        dispatch(saleRecordStart());
        backendAPI.get(`/outlets/${outlet_id}/sale-record/${date}/`)
            .then(res=>dispatch(saleRecordSuccess(res.data)))
            .catch(err=>dispatch(saleRecordError(err.response)));
    }
}


const purchaseRecordStart = ()=>({
    type : recordTypes.PURCHASE_RECORDS_START,

})
const purchaseRecordSuccess = records =>({
    type : recordTypes.PURCHASE_RECORDS_SUCCESS,
    payload : records,
})
const purchaseRecordError = err =>({
    type : recordTypes.PURCHASE_RECORDS_ERROR,
    payload : err,
})
export const getPurchaseRecords = (date,outlet_id) =>{
    return dispatch=>{
        dispatch(purchaseRecordStart());
        backendAPI.get(`/outlets/${outlet_id}/purchase-record/${date}/`)
            .then(res=>dispatch(purchaseRecordSuccess(res.data)))
            .catch(err=>dispatch(purchaseRecordError(err.response)));
    }
}