import React,{Component} from 'react';
import {connect} from 'react-redux';




// importing components
import ActiveOutlet from '../components/sales/active_outlet';
import AllMenus from '../components/sales/all_menus';




// importing actions
import {
    toggleMenu,

} from '../redux/website/Website.actions';


class Sales extends Component{

    componentDidMount = ()=>{
        this.props.toggle();
    }

    render=()=>{
        return(
            <div className="sales">
                <ActiveOutlet />
                <AllMenus />
            </div>

        );
    }
}

const mapDispatchToProps = dispatch =>({
    toggle : ()=>dispatch(toggleMenu())
})

export default connect(
    null,
    mapDispatchToProps,
)(Sales);