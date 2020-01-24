import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {withRouter} from 'react-router-dom';
// importing selectors
import {
    selectAllOutlets,
    selectLoadingOutlets,
    selectOutletsError,
    selectActiveOutlet,

} from '../../redux/outlet/Outlet.selectors';
import {
    selectActiveUser,

} from '../../redux/accounts/accounts.selectors';

// importing actions
import {
    getAllOutlets,
    selectOutlet,

} from '../../redux/outlet/Outlet.actions';
class AllOutlets extends Component {
    componentDidMount = ()=>{
        const {fetch} = this.props;
        fetch();
    }
    componentWillUnmount = ()=>{
        const {choose} = this.props;
        choose(null);
    }
    render = ()=>{
        const {
            outlets,
            loading,
            user,
            error,
            choose,
            activeOutlet,

        } = this.props;
        return(
            <div className="all-outlets">
                
                <h1>
                    {
                        loading
                        ? 'Food is a religion'
                        : 'All Outlets/Units'
                    }
                </h1>
                
                {
                    error &&
                    <div className="error">
                        <h4>{JSON.stringify(error)}</h4>
                    </div>
                }
                <div className="list">
                    {
                        loading &&
                        <div style={{marginTop : '50%',transform:'translateY(-50%)'}}>
                            <Loader
                                type="Oval"
                                color="#D72638"
                                height={100}
                                width={100}
                                timeout={12000} //3 secs

                            />
                        </div>
                    }
                    {
                        outlets &&
                        outlets.map((outlet,i)=>{
                            return(
                                <div 
                                    className="single-outlet" 
                                    key={i}
                                    onClick={()=>{
                                        choose(outlet);
                                        this.props.history.push(`/outlet/${outlet.id}/menus`);
                                    }}
                                >
                                    <img src={outlet.cover_image_url} alt=""/>
                                    {
                                        activeOutlet 
                                        && outlet.id === activeOutlet.id
                                        &&
                                        
                                        <div className="selected">
                                            <h4>active</h4>
                                        </div>
                                        
                                    }
                                    <div className="info">
                                        <h4>{outlet.name}</h4>
                                        <p className="contact">
                                            <i className="fa fa-phone-square" aria-hidden="true"></i>
                                            {outlet.contact_number}
                                        </p>
                                        <p className="address">
                                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                                            {outlet.address}
                                        </p>
                                    </div>
                                    {
                                        outlet.id === user.outlet
                                        &&
                                        <div className="my-outlet">
                                            <p>This is your Outlet</p>
                                        </div>
                                    }
                                    
                                </div>
                            );
                        })
                    }
                </div>
            </div>

        );
    }
}

const mapStateToProps = state =>({
    outlets : selectAllOutlets(state),
    loading : selectLoadingOutlets(state),
    error : selectOutletsError(state),
    user : selectActiveUser(state),
    activeOutlet : selectActiveOutlet(state),
})
const mapDispatchToProps = dispatch=>({
    fetch : ()=>dispatch(getAllOutlets()),
    choose : (outlet)=>dispatch(selectOutlet(outlet)),
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AllOutlets)
);