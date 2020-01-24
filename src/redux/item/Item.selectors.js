import {createSelector} from 'reselect';

const selectItem = state => state.item;


export const selectAllItems = createSelector(
    [selectItem],
    item=>item.all_items,
)
export const selectItemsError = createSelector(
    [selectItem],
    item=>item.items_error,
)
export const selectLoadingItems = createSelector(
    [selectItem],
    item=>item.loading_items,
)
export const selectFilterItems = createSelector(
    [selectItem],
    item=>item.all_items ? item.all_items.filter(i=>i.name.toLowerCase().includes(item.search_text.toLowerCase())) : null,
)
export const selectSearchText =createSelector(
    [selectItem],
    item=>item.search_text,
)
export const selectCartSwitch = createSelector(
    [selectItem],
    item=>item.cartSwitch,
)

export const selectItemQuantity = item_id => createSelector(
    [selectItem],
    item=>{
        const {cart} = item;
        const cart_item = cart.find(i=>i.item.id===item_id);
        if(cart_item) return cart_item.quantity;
        return 0;
    }
)

export const selectCart = createSelector(
    [selectItem],
    item=>item.cart,
)

export const selectCartTotal = createSelector(
    [selectItem],
    item=>{
        let total = 0;
        if(item.cart){
            
            item.cart.forEach(c_i=>{
                total += c_i.item.price*c_i.quantity;
            })
        }
        return total;
    }
)

export const selectLatestSale = createSelector(
    [selectItem],
    item=>item.latest_sale,
)
export const selectSaleError = createSelector(
    [selectItem],
    item=>item.sale_error,
)
export const selectMakingSale = createSelector(
    [selectItem],
    item=>item.making_sale,
)