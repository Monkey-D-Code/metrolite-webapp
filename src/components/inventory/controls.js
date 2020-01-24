import React,{Component} from 'react';
import {connect} from 'react-redux';

// importing selectors
import {
    
    selectProductQuantity,

} from '../../redux/product/Product.selectors';

// importing actions
import {
    addProductToCart,
    removeProductFromCart,
    updateProductInCart,

} from '../../redux/product/Product.actions';

class Controls extends Component{
    state = {
        quan : 0,
    }
    changeQuantity = e =>{
        this.setState({
            quan : e.target.value,
        })
    }

    pressAdd = product =>{
        const {add,update,quantity} = this.props;
        const {quan} = this.state;
        const q = quantity(product.id);
        if(q){
            update({
                product,
                quantity : quan,
            })
        }else{
            add({
                product,
                quantity : quan,
            })
        }

    }
    
    render=()=>{
        const {
            quantity,
            product,

        } = this.props;
        const {
            quan,

        } = this.state;
        return(
            <div className="controls">
                <input 
                    className='input'
                    placeholder = 'Type in Quantity'
                    type='number'
                    min={0}
                    value={quan}
                    onChange={this.changeQuantity}
                />
                
                {
                    quantity(product.id)
                    ?  <button className='update-product' onClick={()=>this.pressAdd(product)}><i className="fa fa-upload" aria-hidden="true"></i></button>
                    : <button  onClick={()=>this.pressAdd(product)} disabled={!quan}><i className="fa fa-plus" aria-hidden="true"></i></button>
                }
            </div>
        );
    }
}

const mapState = state =>({
    quantity : product_id =>selectProductQuantity(product_id)(state),
})

const mapDispatch = dispatch =>({
    add : p=>dispatch(addProductToCart(p)),
    remove : p=>dispatch(removeProductFromCart(p)),
    update : p=>dispatch(updateProductInCart(p)),
})

export default connect(
    mapState,
    mapDispatch,

)(Controls);