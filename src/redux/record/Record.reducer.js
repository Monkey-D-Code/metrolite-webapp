import recordTypes from './Record.types';

const INITIAL_STATE = {
    sale_date : null,
    purchase_date : null,

    sale_records : null,
    sale_records_error : null,
    sale_records_loading : false,

    purchase_records : null,
    purchase_records_error : null,
    purchase_records_loading : false,
    
}


const recordReducer = (state = INITIAL_STATE , action)=>{

    switch(action.type){
        case recordTypes.SALE_DATE_CHANGE:
            return {
                ...state,
                sale_date : action.payload,
            }
        case recordTypes.PURCHASE_DATE_CHANGE:
            return {
                ...state,
                purchase_date : action.payload,
            }
        case recordTypes.SALE_RECORDS_START:
            return {
                ...state,
                sale_records_loading : true,
                sale_records : null,
                sale_records_error : null,
            }
        case recordTypes.SALE_RECORDS_ERROR:
            return {
                ...state,
                sale_records_loading : false,
                sale_records_error : action.payload,
            }
        case recordTypes.SALE_RECORDS_SUCCESS:
            return {
                ...state,
                sale_records_loading : false,
                sale_records : action.payload,
            }
        case recordTypes.PURCHASE_RECORDS_START:
            return {
                ...state,
                purchase_records_loading : true,
                purchase_records : null,
                purchase_records_error : null,
            }
        case recordTypes.PURCHASE_RECORDS_SUCCESS:
            return {
                ...state,
                purchase_records_loading : false,
                purchase_records : action.payload,
            }
        case recordTypes.PURCHASE_RECORDS_ERROR:
            return {
                ...state,
                purchase_records_loading : false,
                purchase_records_error : action.payload,
            }

        default:
            return state;
    }
}

export default recordReducer;
