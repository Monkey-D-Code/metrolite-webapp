import itemTypes from './Item.types';


const INITIAL_STATE = {
    all_items : null,
    items_error : null,
    loading_items : false,

    search_text : '',
    cart : [],
    cartSwitch : false,

    latest_sale : null,
    sale_error : null,
    making_sale : false,
}

const itemReducer =(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case itemTypes.ADD_SALE_START:
            return {
                ...state,
                making_sale : true,
                sale_error : null,
                latest_sale : null,
            }
        case itemTypes.ADD_SALE_SUCCESS:
            return {
                ...state,
                latest_sale : action.payload,
                making_sale : false,
            }
        case itemTypes.ADD_SALE_ERROR:
            return {
                ...state,
                sale_error:action.payload,
                making_sale : false,
            }
        case itemTypes.CLEAR_CART:
            return {
                ...state,
                cart : [],
            }
        case itemTypes.CART_TOGGLE:
            return {
                ...state,
                cartSwitch : !state.cartSwitch,
            }
        case itemTypes.ADD_ITEM_TO_CART:
            
            return {
                ...state,
                cart : [...state.cart,action.payload],
                latest_sale : null,
            }
        case itemTypes.INCREASE_ITEM:
            const oldCart = state.cart;
            const newItem = action.payload;
            const index = oldCart.findIndex(i=>i.item.id===newItem.item.id);
            oldCart.splice(index,1)
            return {
                ...state,
                cart : [...oldCart,action.payload],
            }
        
            
        case itemTypes.REMOVE_ITEM_FROM_CART:
            const oldCart_1 = state.cart;
            const item = action.payload;
            const index_1 = oldCart_1.findIndex(i=>i.item.id===item.item.id);
            oldCart_1.splice(index_1,1)
            return {
                ...state,
                cart : [...oldCart_1,]
            }
        case itemTypes.SEARCH_ITEM:

            return {
                ...state,
                search_text : action.payload,
            }
        case itemTypes.ITEMS_START:
            return {
                ...state,
                loading_items : true,
                items_error : null,
            }
        case itemTypes.ITEMS_SUCCESS:
            return {
                ...state,
                all_items : action.payload,
                loading_items : false,
            }
        case itemTypes.ITEMS_ERROR:
            return {
                ...state,
                items_error : action.payload,
                loading_items : false,
            }

        default:
            return state;
    }
}

export default itemReducer;