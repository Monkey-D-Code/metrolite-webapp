import itemTypes from './Item.types';
import backendAPI from '../../config/backend';

const itemsStart = ()=>({
    type : itemTypes.ITEMS_START,
})
const itemsSuccess = items =>({
    type : itemTypes.ITEMS_SUCCESS,
    payload : items,
})
const itemsError = error=>({
    type : itemTypes.ITEMS_ERROR,
    payload : error,
})
export const getItemsOfmenu = menu_id =>{
    return dispatch =>{
        dispatch(itemsStart());
        backendAPI.get(`/outlets/menu/${menu_id}/items/`)
            .then(res=>dispatch(itemsSuccess(res.data)))
            .catch(err=>dispatch(itemsError(err.response)));
    }
}
export const searchItem = (text)=>({
    type : itemTypes.SEARCH_ITEM,
    payload : text,
})
export const toggleCart = ()=>({
    type : itemTypes.CART_TOGGLE,
})



export const addItemToCart = cart_item =>({
    type : itemTypes.ADD_ITEM_TO_CART,
    payload : cart_item,
})
export const increaseItem = cart_item =>({
    type : itemTypes.INCREASE_ITEM,
    payload : cart_item,
})
export const removeItem = cart_item =>({
    type : itemTypes.REMOVE_ITEM_FROM_CART,
    payload : cart_item,
})
export const clearCart = ()=>({
    type : itemTypes.CLEAR_CART,

})


const addSaleStart = ()=>({
    type : itemTypes.ADD_SALE_START,
})
const addSaleSuccess = newSale=>({
    type : itemTypes.ADD_SALE_SUCCESS,
    payload : newSale,
})
const addSaleError = error =>({
    type : itemTypes.ADD_SALE_ERROR,
    payload : error,
})
export const addNewSale = (cart , outlet_id) =>{
    return dispatch =>{
        dispatch(addSaleStart());
        backendAPI.post(`/outlets/${outlet_id}/add-sale/`,cart)
            .then(res=>{
                dispatch(addSaleSuccess(res.data))
                dispatch(clearCart());
            })
            .catch(err=>dispatch(addSaleError(err.response)));
    }
}