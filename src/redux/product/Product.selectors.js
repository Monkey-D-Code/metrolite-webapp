import {createSelector} from 'reselect';

const selectProduct = state=>state.product;

export const selectAllProducts = createSelector(
    [selectProduct],
    product => product.all_products,
)
export const selectProductsError = createSelector(
    [selectProduct],
    product => product.products_error,
)
export const selectLoadingProducts = createSelector(
    [selectProduct],
    product => product.loading_products,
)
export const selectSearchText = createSelector(
    [selectProduct],
    product => product.search_text,
)

export const selectFilteredProducts = createSelector(
    [selectProduct],
    product =>{
        const text = product.search_text;
        if(product.all_products){
            if(text){
                return product.all_products.filter(p=>p.name.toLowerCase().includes(text.toLowerCase()));
            }else{
                return product.all_products;
            }
        }else{
            return null;
        }
    }
)

export const selectProductQuantity = product_id =>createSelector(
    [selectProduct],
    product=>{
        const index = product.cart.findIndex(i=>i.product.id === product_id);
        if(index > -1){
            return product.cart[index].quantity;
        }
        return 0;
    }
)

export const selectPurchaseCart = createSelector(
    [selectProduct],
    product => product.cart,
)

export const selectPurchaseCartTotal = createSelector(
    [selectProduct],
    product => {
        let total = 0;
        if(product.cart.length > 0){
            product.cart.forEach(pro=>{
                total += pro.product.price_per_unit*pro.quantity;
            })
        }   
        return total;
    }
)
export const selectLatestPurchase = createSelector(
    [selectProduct],
    product => product.latest_purchase,
)
export const selectMakingPurchase = createSelector(
    [selectProduct],
    product => product.making_purchase,
)
export const selectPurchaseError = createSelector(
    [selectProduct],
    product => product.purchase_error,
)