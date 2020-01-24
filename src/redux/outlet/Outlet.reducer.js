import outletTypes from './Outlet.types';

const INITIAL_STATE = {
    all_outlets : null,
    outlets_error : null,
    loading_outlets : false,

    active_outlet : null,

    single_outlet : null,
    outlet_error : null,
    loading_outlet : false,
    
}


const outletReducer = (state = INITIAL_STATE,action)=>{

    switch(action.type){
        case outletTypes.SINGLE_OUTLET_START:
            return {
                ...state,
                loading_outlet : true,
                outlet_error : null,
                single_outlet : null,
            }
        case outletTypes.SINGLE_OUTLET_SUCCESS:
            return {
                ...state,
                loading_outlet : false,
                
                single_outlet : action.payload,
            }
        case outletTypes.SINGLE_OUTLET_ERROR:
            return {
                ...state,
                loading_outlet : false,
                outlet_error : action.payload,
            }
        case outletTypes.SELECT_OUTLET:
            return {
                ...state,
                active_outlet : action.payload,
            }
        case outletTypes.ALL_OUTLETS_START:
            return {
                ...state,
                loading_outlets : true,
                outlets_error : null,
            }
        case outletTypes.ALL_OUTLETS_SUCCESS:
            return {
                ...state,
                all_outlets : action.payload,
                loading_outlets : false,
            }
        case outletTypes.ALL_OUTLETS_ERROR:
            return {
                ...state,
                outlets_error : action.payload,
                loading_outlets : false,
            }

        default :
            return state;

    }
}

export default outletReducer;