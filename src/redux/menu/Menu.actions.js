import menuTypes from './Menu.types';
import backendAPI from '../../config/backend';


const menusStart = ()=>({
    type : menuTypes.MENUS_START,
})
const menusSuccess = menus =>({
    type : menuTypes.MENUS_SUCCESS,
    payload : menus,
})
const menusError = err =>({
    type : menuTypes.MENUS_ERROR,
    payload : err,
})

export const getAllMenusByOutlet = outlet_id =>{
    return dispatch=>{
        dispatch(menusStart())
        backendAPI.get(`/outlets/${outlet_id}/menus/`)
            .then(res=>dispatch(menusSuccess(res.data)))
            .catch(err=>dispatchEvent(menusError(err)));
    }
}

export const chooseMenu = menu =>({
    type : menuTypes.CHOOSE_MENU,
    payload : menu,
})