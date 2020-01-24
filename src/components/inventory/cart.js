import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Route} from 'react-router-dom';
import Loader from 'react-loader-spinner';
// importing selectors
import {
    selectPurchaseCart,
    selectPurchaseCartTotal,
    selectLatestPurchase,
    selectMakingPurchase,
    selectPurchaseError,

} from '../../redux/product/Product.selectors';
import {
    selectActiveUser,
} from '../../redux/accounts/accounts.selectors';

// importing actions
import {
    removeProductFromCart,
    clearPurchaseCart,
    addNewPurchase,

} from '../../redux/product/Product.actions';

class PurchaseCart extends Component{
    state = {
        visible : false,
    }
    toggleVisibility = ()=>{
        this.setState({
            visible : !this.state.visible,
        })
    }
    createPurchase = ()=>{
        const {cart,user,addPurchase} = this.props;
        const mod_cart = [];
        cart.forEach((cart_p)=>{
            const mod_cart_p = {
                id : cart_p.product.id,
                quantity : cart_p.quantity,
            }
            mod_cart.push(mod_cart_p);
        })
        addPurchase(mod_cart , user.outlet);
    }
    render = ()=>{
        const {
            visible,

        } = this.state;
        const {
            cart,
            remove,
            clear,

            total,

            latest_purchase,
            error,
            loading,

            

        } = this.props;
        return (
            <div className="purchase-cart">
                <div className={visible ? "purchase-cart-body visible" : "purchase-cart-body"}>
                    {
                        cart
                        &&
                        cart.map((cart_p,i)=>{
                            return(
                                <div className="cart-product" key={i}>
                                    <h4>
                                        {cart_p.product.name}
                                    </h4>
                                    <p>{cart_p.quantity} {cart_p.product.measuring_unit}</p>
                                    <h3><i className="fa fa-inr" aria-hidden="true"></i> {cart_p.product.price_per_unit * cart_p.quantity}</h3>
                                    <button className='remove-product' onClick={()=>remove(cart_p)}><i className="fa fa-times" aria-hidden="true"></i></button>
                                </div>
                            )
                        })
                    }
                    {
                        latest_purchase
                        &&
                        <div className="latest-purchase">
                            <h1><i className="fa fa-inr" aria-hidden="true"></i> {latest_purchase.grand_total.split('.')[0]}</h1>
                            <div className="products">
                                {
                                    latest_purchase.products.map((cart_p , i)=>{
                                        return(
                                            <div className="cart-product" key={i}>
                                                <h4>
                                                    {cart_p.product.name}
                                                </h4>
                                                <p><i className="fa fa-times" aria-hidden="true"></i> {cart_p.quantity}</p>
                                                <p><i className="fa fa-inr" aria-hidden="true"></i> {cart_p.quantity * cart_p.product.price_per_unit}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    {
                        error
                        &&
                        <div className="error">
                            <h4>
                                {JSON.stringify(error)}
                            </h4>
                        </div>
                    }
                </div>
                {   
                    total > 0
                    &&
                    visible
                   
                    &&
                    <div className="purchase-cart-total"  >
                        <h4><i className="fa fa-inr" aria-hidden="true"></i> {total}</h4>
                    </div>
                }
                {
                    total > 0
                    &&
                    visible
                    &&
                    <button className="clear-purchase-cart" onClick={clear}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                }
                
                <button className="purchase-cart-toggle" onClick={this.toggleVisibility}>
                    {
                        visible
                        ? <i className="fa fa-times" aria-hidden="true"></i>
                        : <i className="fa fa-cart-plus" aria-hidden="true"></i>
                         
                    }
                </button>
                <button 
                    className={visible ? "confirm-purchase active" : "confirm-purchase"}
                    disabled={!total || loading}
                    onClick={this.createPurchase}
                >
                    {
                        loading
                        ? <Loader
                            type="Oval"
                            color="#ffff"
                            height={50}
                            width={50}
                            timeout={12000} //3 secs

                        />
                        : <i className="fa fa-file-text" aria-hidden="true"></i>
                    }
                </button>
            </div>
        );
    }

}

const mapState = state=>({
    cart : selectPurchaseCart(state),
    total : selectPurchaseCartTotal(state),
    latest_purchase : selectLatestPurchase(state),
    error : selectPurchaseError(state),
    loading : selectMakingPurchase(state),
    user : selectActiveUser(state),
})

const mapDispatch = dispatch=>({
    remove : product => dispatch(removeProductFromCart(product)),
    clear : ()=>dispatch(clearPurchaseCart()),
    addPurchase : (data,outlet_id) =>dispatch(addNewPurchase(data , outlet_id))
})

export default withRouter(connect(
    mapState,
    mapDispatch,

)(PurchaseCart));