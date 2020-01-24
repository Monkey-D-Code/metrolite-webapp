import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';

// importing Selectors
import {
    selectSelectedVendor,

} from '../../redux/vendor/Vendor.selectors';
import {
    selectAllProducts,
    selectLoadingProducts,
    selectProductsError,
    selectFilteredProducts,
    selectSearchText,
    selectProductQuantity,

} from '../../redux/product/Product.selectors';


// importing actions
import {
    getProductsOfVendor,
    searchProducts,
    addProductToCart,
    removeProductFromCart,
    updateProductInCart,

} from '../../redux/product/Product.actions';


// importing components
import PurchaseCart from './cart';
import Controls from './controls';

class AllProducts extends Component{
    
    

    componentDidMount = ()=>{
        const {match : {params : {id,},}, getProducts} = this.props;
        getProducts(id);
    }

    addProduct = product =>{
        const {add,update,quantity} = this.props;
        const q = quantity(product.id);
        if(q){
            update({
                product,
                quantity : q+1,
            })
        }else{
            add({
                product,
                quantity : 1,
            })
        }
    }
    updateProduct = product =>{
        const {update,remove,quantity} = this.props;
        const q = quantity(product.id);
        if(q >=1){
            update({
                product,
                quantity : q-1,
            })
        }else{
            remove({
                product,
            })
        }
    }

    componentDidUpdate = oldProps =>{
        const old_ven_id = oldProps.match.params.id;
        const new_ven_id = this.props.match.params.id;
        if(old_ven_id !== new_ven_id) this.props.getProducts(new_ven_id);
    }

    render = ()=>{
        const {
            vendor,
            loading,
            error,
            search,
            filteredProducts,
            search_text,
            quantity,

        } = this.props;

        
        
        return (
            <div className="all-products">
                {
                    vendor
                    &&
                    <div className="selected-vendor">
                        <h1>
                            {vendor.name}
                        </h1>
                        <p><i className="fa fa-phone" aria-hidden="true"></i> {vendor.contact_number}</p>
                        <p><i className="fa fa-map-marker" aria-hidden="true"></i> {vendor.address}</p>
                    </div>
                }
                <div className="products-list">
                    {
                        error
                        &&
                        <div className="error">
                            <h4>
                                {JSON.stringify(error)}
                            </h4>
                        </div>
                    }
                    {
                        loading
                        &&
                        <Loader
                            type="Oval"
                            color="#D72638"
                            height={100}
                            width={100}
                            timeout={12000} //3 secs

                        />
                        
                    }
                    {
                        filteredProducts
                        &&
                        filteredProducts.map((p,i)=>{
                            return(
                                <div className="product" key={i}>
                                    <h4>
                                        {p.name}
                                    </h4>
                                    <div className="info">
                                        <p><i className="fa fa-inr" aria-hidden="true"></i> {p.price_per_unit}</p>
                                        <p>Per <i className="fa fa-balance-scale" aria-hidden="true"></i> {p.measuring_unit}</p>
                                    </div>
                                    <Controls  product={p}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="product-search">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input 
                        type="text" 
                        name="search_text" 
                        id=""
                        placeholder="Search product"
                        value={search_text}
                        onChange={e=>{
                            search(e.target.value);

                        }}

                    />
                </div>
                <PurchaseCart />
            </div>
        );
    }

}

const mapState = state =>({
    vendor : selectSelectedVendor(state),
    products : selectAllProducts(state),
    filteredProducts : selectFilteredProducts(state),
    error : selectProductsError(state),
    loading : selectLoadingProducts(state),
    search_text : selectSearchText(state),
    quantity : product_id => selectProductQuantity(product_id)(state),
})

const mapDispatch = dispatch =>({
    getProducts : vendor_id =>dispatch(getProductsOfVendor(vendor_id)),
    search : text=>dispatch(searchProducts(text)),
    add : p => dispatch(addProductToCart(p)),
    remove : p => dispatch(removeProductFromCart(p)),
    update : p => dispatch(updateProductInCart(p)),
})

export default withRouter(connect(
    mapState,
    mapDispatch,

)(AllProducts));