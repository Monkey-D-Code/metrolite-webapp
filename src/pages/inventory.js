import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


// importing components
import  ActiveOutlet from '../components/sales/active_outlet';
import AllVendors from '../components/inventory/all_vendors';

// importing actions
import {
    toggleMenu,

} from '../redux/website/Website.actions';

class Inventory extends Component{
    componentDidMount = ()=>{
        this.props.toggle();
    }
    render = ()=>{
        return (
            <div className="inventory">
                <ActiveOutlet />
                <AllVendors />
            </div>
        );
    }

}

const mapDispatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
})

export default withRouter(connect(
    null,
    mapDispatch,
)(Inventory));