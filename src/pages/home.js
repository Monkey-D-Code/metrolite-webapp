import React,{Component } from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {Route,withRouter,NavLink} from 'react-router-dom';
// importing actions
import {
    toggleMenu,
} from '../redux/website/Website.actions';
import {
    getsingleOutlet,

} from '../redux/outlet/Outlet.actions';

// importing selectors
import {
    selectSingleOutlet,
    selectOutletError,
    selectLoadingOutlet,

} from '../redux/outlet/Outlet.selectors';
import {
    selectActiveUser,

} from '../redux/accounts/accounts.selectors';

// importing components
import ActiveOutlet from '../components/sales/active_outlet';
import SaleRecord from '../components/home/sale_record';
import PurchaseRecord from '../components/home/purchase_record';

class Home extends Component{
    componentDidMount = ()=>{
        const {
            user,
            getOutlet,
            toggle,

        } = this.props;
        toggle();
        if(user) getOutlet(user.outlet);
    }
    render=()=>{
        const {
            outlet,
            error,
            loading,
            match,

        } = this.props;
        return(
            <div className="home">
                <ActiveOutlet />
                <div className="current-time">
                    <p></p>
                </div>
                {
                    outlet
                    &&
                    <div className="stats">
                        <h1 className='sale'>Sale Today : <i className="fa fa-inr" aria-hidden="true"></i> {outlet.sale_today}</h1>
                        <h1 className='purchase'>Purchase Today : <i className="fa fa-inr" aria-hidden="true"></i> {outlet.purchase_today}</h1>
                        <h1 
                            className={
                                outlet.sale_today > outlet.purchase_today
                                ? "profit"
                                : "loss"
                            }
                        
                        >Overhead : <i className="fa fa-inr" aria-hidden="true"></i> {outlet.sale_today - outlet.purchase_today}</h1>
                    </div>

                }
                {
                    loading
                    && <Loader 
                            type="Oval"
                            color="#D72638"
                            height={100}
                            width={100}
                            timeout={12000}
                        />
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
                <div className="records">
                    <div className='record-menu'>
                        <NavLink activeClassName="on" to={`${match.path}/sale-records`}><i className="fa fa-money" aria-hidden="true"></i> Sales Record</NavLink>
                        <NavLink activeClassName="on" to={`${match.path}/purchase-records`}><i className="fa fa-credit-card-alt" aria-hidden="true"></i> Purchase Record</NavLink>

                    </div>
                    <div className="route">
                        <Route exact path={`${match.path}/sale-records`}>
                            <SaleRecord />
                        </Route>
                        <Route  exact path={`${match.path}/purchase-records`}>
                            <PurchaseRecord />
                        </Route>
                    </div>
                </div>
                
            </div>

        )
    }
}

const mapState = state =>({
    outlet : selectSingleOutlet(state),
    error : selectOutletError(state),
    loading : selectLoadingOutlet(state),
    user : selectActiveUser(state),
})

const mapDisatch = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
    getOutlet : outlet_id =>dispatch(getsingleOutlet(outlet_id)),
})


export default withRouter(
    connect(
        mapState,
        mapDisatch,
    
    )(Home)
);