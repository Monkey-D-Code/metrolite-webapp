import vendorTypes from './Vendor.types';
import backendAPI from '../../config/backend';


const vendorsStart = ()=>({
    type : vendorTypes.ALL_VENDORS_START,
})
const vendorsSuccess = allVendors =>({
    type : vendorTypes.ALL_VENDORS_SUCCESS,
    payload : allVendors,
})
const vendorsError = error =>({
    type : vendorTypes.ALL_VENDORS_ERROR,
    payload : error,
})
export const getVendorsOfOutlet = outlet_id =>{
    return dispatch =>{
        dispatch(vendorsStart());
        backendAPI.get(`/outlets/${outlet_id}/vendor/list/`)
            .then(res=>dispatch(vendorsSuccess(res.data)))
            .catch(err=>dispatch(vendorsError(err.response)));
    }
}
export const chooseVendor = vendor =>({
    type : vendorTypes.CHOOSE_VENDOR,
    payload : vendor,
})