import websiteTypes from './Website.types';

const INITIAL_STATE  = {
    menuSwitch : false,

}


const websiteReducer = (state = INITIAL_STATE , action)=>{
    switch(action.type){
        case websiteTypes.TOGGLE_MENU:
            return {
                ...state,
                menuSwitch : !state.menuSwitch,

            }

        default:
            return state;
    }
}

export default websiteReducer;