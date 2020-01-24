import React,{Component} from 'react';
import {Route,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// importing actions
import {
    toggleMenu,
} from '../../redux/website/Website.actions';

// importing selectors
import {
    selectActiveOutlet,

} from '../../redux/outlet/Outlet.selectors';

// importing components
import AllOutlets from './all_outlets';
import Menus from './menus';


class Outlet extends Component {
    componentDidMount = ()=>{
        const {toggle} = this.props;
        toggle();
    }

    render = ()=>{
        const {
            match,
            

        } = this.props;
        return(
            <div className="outlet">
                <Route  path={`${match.path}`}>
                    <AllOutlets />
                    
                </Route>
                <Route path={`${match.path}/:id/menus`}>
                    <Menus />
                </Route>
                
            </div>

        );
    }
}

const mapStateToProps = state =>({
    activeOutlet : selectActiveOutlet(state),
})

const mapDispatchToProps = dispatch => ({
    toggle : ()=>dispatch(toggleMenu()),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Outlet));