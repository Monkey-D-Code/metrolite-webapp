import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {withRouter} from 'react-router-dom';


// importing selectors
import {
    selectAllItems,
    selectItemsError,
    selectLoadingItems,
    selectFilterItems,
    selectItemQuantity,

} from '../../redux/item/Item.selectors';

// importng actions
import {
    getItemsOfmenu,
    addItemToCart,
    increaseItem,
    removeItem,

} from '../../redux/item/Item.actions';


// importing components
import Search from './search';
import SaleCart from './sale_cart';

class AllItems extends Component{
    componentDidMount =()=>{
        const {getItems,match} = this.props;
        getItems(match.params.id);
    }
    componentDidUpdate = oldProps =>{
        const old_menu_id = oldProps.match.params.id;
        const new_menu_id = this.props.match.params.id;

        
        if(old_menu_id !== new_menu_id){
            this.props.getItems(new_menu_id);
        }
    }
    addItem = item =>{
        const {add,quantity,increase} = this.props;
        const q = quantity(item.id);
        if(!q){
            add({
                item,
                quantity : 1,
            })
        }else{
            increase({
                item,
                quantity : q+1,
            })
        }

    }
    removeItem = item =>{
        const {quantity,increase,remove} = this.props;
        const q = quantity(item.id);
        if(!q){

        }else if(q > 1){
            increase({
                item,
                quantity : q-1,
            })
        }else{
            remove({item,})
        }
    }
    render=()=>{
        const {
            items,
            error,
            loading,
            filteredItems,
            
            quantity,

        } = this.props;
        return(
            <div className="all-items">
                <h1>
                    All Items
                    {
                        loading
                        && <Loader
                                type="Oval"
                                color="#D72638"
                                height={50}
                                width={50}
                                timeout={12000}

                            />
                            
                    }
                </h1>
                {
                    error
                    &&
                    <div className="error">
                        <h4>
                            {
                                JSON.stringify(error)
                            }
                        </h4>
                    </div>
                }
                <div className="items-list">
                    {
                        items
                        &&
                        filteredItems
                        ? filteredItems.map((item,i)=>{
                            return(
                                <div className="single-item" key={i}>
                                    <img 
                                        src={
                                                item.image 
                                                ? item.image 
                                                : `https://ui-avatars.com/api/?name=${item.name}&size=200x150&background=EEE82C`
                                            } 
                                        alt=""
                                    />
                                    <div className="info">
                                        <h4>
                                            {item.name}
                                        </h4>
                                        <p><i className="fa fa-inr" aria-hidden="true"></i> {item.price.split('.')[0]}</p>
                                    </div>
                                    <div className="controls">
                                        <button className='q-plus' onClick={()=>this.addItem(item)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                                        <p>{quantity(item.id)}</p>
                                        {
                                            quantity(item.id) !== 0
                                            &&
                                            <button className='q-minus' onClick={()=>this.removeItem(item)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                                        }
                                        
                                    </div>
                                </div>
                            )
                        })
                        : items && items.map((item,i)=>{
                            return(
                                <div className="single-item" key={i}>
                                    <img 
                                        src={
                                                item.image 
                                                ? item.image 
                                                : `https://ui-avatars.com/api/?name=${item.name}&size=200x150&background=EEE82C`
                                            } 
                                        alt=""
                                    />
                                    <div className="info">
                                        <h4>
                                            {item.name}
                                        </h4>
                                        <p><i className="fa fa-inr" aria-hidden="true"></i> {item.price.split('.')[0]}</p>
                                    </div>
                                    <div className="controls">
                                        <button className='q-plus'><i className="fa fa-plus" aria-hidden="true"></i></button>
                                        <p>1</p>
                                        <button className='q-minus'><i class="fa fa-minus" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Search />
                <SaleCart />
            </div>

        );
    }
}

const mapStateToProps = state =>({
    items : selectAllItems(state),
    filteredItems : selectFilterItems(state),
    error : selectItemsError(state),
    loading : selectLoadingItems(state),
    quantity : item_id => selectItemQuantity(item_id)(state),
})
const mapDispatchToProps = dispatch=>({
    getItems : (menu_id)=>dispatch(getItemsOfmenu(menu_id)),
    add : cart_item =>dispatch(addItemToCart(cart_item)),
    increase : cart_item=>dispatch(increaseItem(cart_item)),
    remove : cart_item=>dispatch(removeItem(cart_item)),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,

)(AllItems));