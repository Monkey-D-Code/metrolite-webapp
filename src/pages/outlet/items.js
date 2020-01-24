import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {withRouter} from 'react-router-dom';
// importing selectors
import {
    selectActiveMenu,

} from '../../redux/menu/Menu.selectors';
import {
    selectAllItems,
    selectItemsError,
    selectLoadingItems,
} from '../../redux/item/Item.selectors';

// importing actions
import {
    getItemsOfmenu,
} from '../../redux/item/Item.actions';
class Items extends Component{
    componentWillMount=()=>{
        const {menu,parentmatch} = this.props;
        if(!menu){
            this.props.history.push(parentmatch)
        }else{
            this.props.getItems(menu.id);
        }
        
    }
    componentDidUpdate = oldProps =>{
        const old_menu_id = oldProps.match.params.id;
        const new_menu_id = this.props.match.params.id;

        
        if(old_menu_id !== new_menu_id){
            this.props.getItems(new_menu_id);
        }
    }
    render=()=>{
        const {
            menu,
            items,
            loading,
            error,

        } = this.props;
        return(
            <div className="items">
                {
                    menu 
                    &&
                    <div className="item-list">
                        <img src={menu.cover_image} alt=""/>
                        <div className="menu-info">
                            <h2>
                                {menu.title}
                            </h2>
                            <p>
                                {menu.descrition}
                            </p>
                        </div>
                        {
                            loading
                            ? <div className="all-items">
                                    <Loader
                                        type="Oval"
                                        color="#D72638"
                                        height={100}
                                        width={100}
                                        timeout={12000}
                                        style={{
                                            margin:'2em auto',
                                        }} //3 secs
            
                                    />
                                </div>
                            : <div className="all-items">
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
                                        items
                                        &&
                                        items.map((item,i)=>{
                                            return(
                                                <div className="single-item" key={i}>
                                                    <img 
                                                        src={item.image ? item.image : `https://ui-avatars.com/api/?name=${item.name}&background=101D42&color=ffff&size=500`} 
                                                        alt=""
                                                    />
                                                    <h4>{item.name}</h4>
                                                    <p className="price"><i className="fa fa-inr" aria-hidden="true"></i>{item.price}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
                }
                
            </div>
        );
    }
}

const mapStateToProps = state =>({
    menu : selectActiveMenu(state),
    items : selectAllItems(state),
    loading : selectLoadingItems(state),
    error : selectItemsError(state),
})

const mapDispatchToProps = dispatch=>({
    getItems :(menu_id)=>dispatch(getItemsOfmenu(menu_id)),
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Items)
);