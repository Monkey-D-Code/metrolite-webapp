import menuTypes from './Menu.types';


const INITIAL_STATE = {
    all_menus : null,
    menus_error : null,
    loading_menus : false,

    activeMenu : null,
}

const menuReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case menuTypes.MENUS_START:
            return {
                ...state,
                loading_menus : true,
                menus_error : false,
            }
        case menuTypes.MENUS_SUCCESS:
            return {
                ...state,
                all_menus : action.payload,
                loading_menus : false,
            }
        case menuTypes.MENUS_ERROR:
            return {
                ...state,
                menus_error : action.payload,
                loading_menus : false,
            }

        case menuTypes.CHOOSE_MENU:
            return {
                ...state,
                activeMenu : action.payload,
            }

        default:
            return state;
    }
}

export default menuReducer;