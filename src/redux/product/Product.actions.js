import productTypes from './Product.types';
import backendAPI from '../../config/backend';


const productsStart = ()=>({
    type : productTypes.ALL_PRODUCTS_START,
})
const productsSuccess = products =>({
    type : productTypes.ALL_PRODUCTS_SUCCESS,
    payload : products,
})
const productsError = error =>({
    type : productTypes.ALL_PRODUCTS_ERROR,
    payload : error,
})
export const getProductsOfVendor = vendor_id =>{
    return dispatch =>{
        dispatch(productsStart());
        backendAPI.get(`/outlets/vendor/${vendor_id}/products/`)
            .then(res=>dispatch(productsSuccess(res.data)))
            .catch(err=>dispatch(productsError(err.response)));
    }
}
export const searchProducts = text =>({
    type : productTypes.CHANGE_PRODUCT_SEARCH,
    payload : text,
})

export const addProductToCart = product =>({
    type : productTypes.ADD_PRODUCT_TO_CART,
    payload : product,
})
export const removeProductFromCart = product =>({
    type : productTypes.REMOVE_PRODUCT_FROM_CART,
    payload : product,
})
export const updateProductInCart = product =>({
    type : productTypes.UPDATE_PRODUCT_IN_CART,
    payload : product,
})
export const clearPurchaseCart = ()=>({
    type : productTypes.CLEAR_PURCHASE_CART,
})


const addPurchaseStart = ()=>({
    type : productTypes.ADD_PRCHASE_START,
})
const addPurchaseSuccess = newPurchase=>({
    type : productTypes.ADD_PURCHASE_SUCCESS,
    payload : newPurchase,
})
const addPurchaseError = error =>({
    type : productTypes.ADD_PURCHASE_ERROR,
    payload  : error,
})
export const addNewPurchase = (data,outlet_id) =>{
    return dispatch=>{
        dispatch(addPurchaseStart());
        backendAPI.post(`/outlets/${outlet_id}/add-purchase/`,data)
            .then(res=>dispatch(addPurchaseSuccess(res.data)))
            .catch(err=>dispatch(addPurchaseError(err.response)));
    }
}