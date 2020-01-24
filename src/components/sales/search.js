import React , {Component} from 'react';
import {connect} from 'react-redux';

// importing actions
import{
    searchItem,
} from '../../redux/item/Item.actions';

// importing selector
import {
    selectSearchText,
} from '../../redux/item/Item.selectors';
class Search extends Component{

    render=()=>{
        const {
            searchItem,
            searchText,
        } = this.props;
        return(
            <div className="search">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input 
                    type="text" 
                    name="" 
                    id=""
                    placeholder="Search Item"
                    value={searchText}
                    onChange={e=>searchItem(e.target.value)}
                />
            </div>
        )
    }
}

const mapState = state=>({
    searchText : selectSearchText(state),
})
const mapDispatch = dispatch=>({
    searchItem : (text)=>dispatch(searchItem(text)),
})

export default connect(
    mapState,
    mapDispatch,

)(Search);