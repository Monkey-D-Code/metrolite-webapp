import productTypes from './Product.types';


const INITIAL_STATE = {
    all_products : null,
    products_error : null,
    loading_products : false,

    search_text : '',
    cart : [],

    latest_purchase : null,
    making_purchase : false,
    purchase_error : null,
}


const productReducer = (state = INITIAL_STATE , action)=>{

    switch(action.type){
        case productTypes.ADD_PRCHASE_START:
            return {
                ...state,
                making_purchase : true,
                latest_purchase : null,
                purchase_error : null,
            }
        case productTypes.ADD_PURCHASE_SUCCESS:
            return {
                ...state,
                latest_purchase : action.payload,
                making_purchase : false,
                cart : [],
            }
        case productTypes.ADD_PURCHASE_ERROR:
            return {
                ...state,
                purchase_error : action.payload,
                making_purchase : false,
            }
        case productTypes.CLEAR_PURCHASE_CART:
            return {
                ...state,
                cart : [],
            }
        case productTypes.ADD_PRODUCT_TO_CART:
            return{
                ...state,
                cart : [...state.cart,action.payload],
                latest_purchase : null,
            }
        case productTypes.REMOVE_PRODUCT_FROM_CART:
            const oldCart = state.cart;
            const index = oldCart.findIndex(i=>i.product.id===action.payload.product.id);
            
            if(index > -1){
                oldCart.splice(index , 1)
                return {
                    ...state,
                    cart : [...oldCart,]

                }
            }
            return {
                ...state,

            }
        case productTypes.UPDATE_PRODUCT_IN_CART:
            const oldCart_1 = state.cart;
            const index_1 = oldCart_1.findIndex(i=>i.product.id===action.payload.product.id);
            
            if(index_1 > -1){
                oldCart_1.splice(index_1 , 1);
                return {
                    ...state,
                    cart : [...oldCart_1,action.payload]

                }
            }
            return {
                ...state,

            }
        case productTypes.CHANGE_PRODUCT_SEARCH :
            return {
                ...state,
                search_text : action.payload,
            }
        case productTypes.ALL_PRODUCTS_START:
            return {
                ...state,
                all_products : null,
                products_error : null,
                loading_products : true,
            }
        case productTypes.ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                all_products : action.payload,
                loading_products : false,
            }
        case productTypes.ALL_PRODUCTS_ERROR:
            return {
                ...state,
                products_error : action.payload,
                loading_products : false,
            }
        default:
            return state;
    }
}

export default productReducer;