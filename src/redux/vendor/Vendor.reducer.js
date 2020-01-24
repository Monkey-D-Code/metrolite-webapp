import vendorTypes from './Vendor.types';


const INITIAL_STATE = {
    all_vendors:null,
    vendors_error : null,
    loading_vendors:false,

    selected_vendor : null,
}


const vendorReducer = (state=INITIAL_STATE,action)=>{
    
    switch(action.type){
        case vendorTypes.ALL_VENDORS_START:
            return {
                ...state,
                all_vendors : null,
                vendors_error:null,
                loading_vendors : true,
            }
        case vendorTypes.ALL_VENDORS_SUCCESS:
            return {
                ...state,
                all_vendors : action.payload,
                loading_vendors : false,
            }
        case vendorTypes.ALL_VENDORS_ERROR:
            return {
                ...state,
                vendors_error:action.payload,
                loading_vendors : false,
            }
        case vendorTypes.CHOOSE_VENDOR:
            return {
                ...state,
                selected_vendor : action.payload,
            }

        default:
            return state;
    }
}

export default vendorReducer;