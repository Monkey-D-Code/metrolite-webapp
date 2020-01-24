import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';

// importing selectors
import {
    selectCartSwitch,
    selectCart,
    selectCartTotal,
    selectLatestSale,
    selectSaleError,
    selectMakingSale,

} from '../../redux/item/Item.selectors';
import {
    selectActiveUser,

} from '../../redux/accounts/accounts.selectors';

// importing actions
import {
    toggleCart,
    addNewSale,
    clearCart,

}   from '../../redux/item/Item.actions';

// importing components
import Invoice from './invoice';

class SaleCart extends Component{
    confirmSale = ()=>{
        const {cart,addSale,user} = this.props;
        let cart_mod = [];
        cart.forEach((c_item)=>{
            const mod_item = {
                id : c_item.item.id,
                quantity : c_item.quantity, 
            }
            cart_mod.push(mod_item);
        })
        addSale(cart_mod,user.outlet);
    }
    render=()=>{
        const {
            flip,
            toggle,
            cart,
            total,
            clear,

            latest_sale,
            sale_error,
            making_sale,

            
        } = this.props;
        return(
            <div className="sale-cart">
                {
                    flip
                    &&
                    <div className="cart-body">
                        {
                            cart
                            &&
                            cart.map((c_item,i)=>{
                                return(
                                    <div className="cart-item" key={i}>
                                        <h4>
                                            {c_item.item.name}
                                        </h4>
                                        <p>
                                            {c_item.quantity}
                                        </p>
                                        <p><i className="fa fa-inr" aria-hidden="true"></i> {c_item.item.price * c_item.quantity}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            latest_sale
                            &&
                            <div className="latest-sale">
                                <h2><i className="fa fa-inr" aria-hidden="true"></i> {latest_sale.grand_total.split('.')[0]}</h2>
                                <div className="timestamp">
                                    <p><i className="fa fa-clock-o" aria-hidden="true"></i> {latest_sale.time.split('.')[0]}</p>
                                    <p><i className="fa fa-calendar" aria-hidden="true"></i> {latest_sale.date}</p>
                                </div>
                                <div className="items">
                                    {
                                        latest_sale.items.map((s_item,i)=>{
                                            return(
                                                <div className="one-item" key={i}>
                                                    <h4>
                                                        {s_item.item.name}
                                                    </h4>
                                                    <p>
                                                        {s_item.quantity}
                                                    </p>
                                                    <p><i className="fa fa-inr" aria-hidden="true"></i> {s_item.quantity*s_item.item.price}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Invoice />
                                
                            </div>
                        }
                        {
                            sale_error
                            &&
                            <div className="error">
                                <h4>
                                    {JSON.stringify(sale_error)}
                                </h4>
                            </div>
                        }
                    </div>
                }
                {
                    total > 0
                    &&
                    flip
                    &&
                    <h4 className="total"><i className="fa fa-inr" aria-hidden="true"></i> {total}</h4>
                }
                {
                    total > 0
                    &&
                    flip
                    &&
                    <button className='add-sale' disabled={making_sale} onClick={this.confirmSale}>
                        {
                            making_sale
                            ? <Loader
                                type="Oval"
                                color="#ffff"
                                height={30}
                                width={30}
                                timeout={12000}

                            />
                            :   <i className="fa fa-money" aria-hidden="true"></i>
                        }
                        
                    </button>
                }
                {
                    total > 0 && flip 
                    &&
                    <button className="clear-cart" onClick={clear}>
                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                    </button>
                }
                <button className="cart-toggle" onClick={toggle}>
                    {
                        flip
                        ? <i className="fa fa-times-circle" aria-hidden="true"></i>
                        : <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    }
                </button>
            </div>

        );
    }
}

const mapState = state=>({
    flip : selectCartSwitch(state),
    cart : selectCart(state),
    total : selectCartTotal(state),
    latest_sale : selectLatestSale(state),
    sale_error : selectSaleError(state),
    making_sale : selectMakingSale(state),
    user : selectActiveUser(state),
})
const mapDispatch = dispatch=>({
    toggle : ()=>dispatch(toggleCart()),
    clear : ()=>dispatch(clearCart()),
    addSale : (cart,outlet_id)=>dispatch(addNewSale(cart,outlet_id)),
})
export default connect(
    mapState,
    mapDispatch,

)(SaleCart);