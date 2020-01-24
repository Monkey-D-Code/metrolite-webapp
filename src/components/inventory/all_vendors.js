import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Route} from 'react-router-dom';
import Loader from 'react-loader-spinner';
// importing selectors
import {
    selectAllVendors,
    selectVendorsError,
    selectLoadingVendors,
    selectSelectedVendor,

} from '../../redux/vendor/Vendor.selectors';

import {
    selectActiveUser,

} from '../../redux/accounts/accounts.selectors';

// importing actions
import {
    getVendorsOfOutlet,
    chooseVendor,

} from '../../redux/vendor/Vendor.actions';


// importing components
import AllProducts from './all_products';

class AllVendors extends Component{

    componentDidMount = ()=>{
        const {user,getVendors} = this.props;
        getVendors(user.outlet);
    }
    componentWillUnmount = ()=>{
        const {choose} = this.props;
        choose(null);
    }

    render = ()=>{
        const {
            vendors,
            loading,
            error,
            choosen,
            match,
            history,

            choose,
        } = this.props;
        return (
            <div className="all-vendors">
                
                <div className="vendor-list">
                    <h1>
                        All Vendors
                        {
                            loading
                            &&
                            <Loader
                                type="Oval"
                                color="#D72638"
                                height={50}
                                width={50}
                                timeout={12000} //3 secs

                            />
                        }
                    </h1>
                    {
                        vendors
                        &&
                        vendors.map((vendor,i)=>{
                            return(
                                <div className="one-vendor" key={i} 
                                    onClick={()=>{
                                        choose(vendor);
                                        history.push(`${match.path}/${vendor.id}/products`);
                                    }}
                                >
                                    <h3><i className="fa fa-user-circle-o" aria-hidden="true"></i> {vendor.name}</h3>
                                    <p><i className="fa fa-phone" aria-hidden="true"></i> {vendor.contact_number}</p>
                                    <p><i className="fa fa-map-marker" aria-hidden="true"></i> {vendor.address}</p>
                                    {   choosen
                                        &&
                                        choosen.id === vendor.id
                                        &&
                                        <p className="active"><i className="fa fa-eye" aria-hidden="true"></i></p>
                                    }
                                    
                                </div>
                            )
                        })
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
                <Route path={`${match.path}/:id/products`}>
                    <AllProducts />
                </Route>   
                
            </div>
            
        );
    }

}
const mapState = state =>({
    vendors : selectAllVendors(state),
    loading : selectLoadingVendors(state),
    error : selectVendorsError(state),
    choosen : selectSelectedVendor(state),
    user : selectActiveUser(state),
})
const mapDispatch = dispatch =>({
    getVendors : outlet_id =>dispatch(getVendorsOfOutlet(outlet_id)),
    choose : vendor =>dispatch(chooseVendor(vendor)),
})

export default withRouter(connect(
    mapState,
    mapDispatch,

)(AllVendors));