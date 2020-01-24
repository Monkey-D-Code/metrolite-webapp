import React,{Component} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {Route,withRouter} from 'react-router-dom';
// importing selectors
import {
    selectUserOutlet,

} from '../../redux/outlet/Outlet.selectors';
import {
    selectActiveUser,
} from '../../redux/accounts/accounts.selectors';
import {
    selectAllMenus,
    selectLoadingMenus,
    selectMenusError,
    selectActiveMenu,

} from '../../redux/menu/Menu.selectors';

// importing actions
import {
    getAllMenusByOutlet,
    chooseMenu,

} from '../../redux/menu/Menu.actions';


// importing components
import AllItems from './all_items';

class AllMenus extends Component{
    componentDidMount = ()=>{
        const {getMenus,user} = this.props;
        getMenus(user.outlet);
    }
    render=()=>{
        const {
            menus,
            loading,
            activeMenu,
            error,
            choose,
            match,
        } = this.props;
        return(
            <div className="all-menus">
                <div className="menu-list">
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
                        menus
                        &&
                        menus.map((menu,i)=>{
                            return(
                                <div className="single-menu" key={i} 
                                    onClick={()=>{
                                        choose(menu);
                                        this.props.history.push(`${match.path}/${menu.id}/items`)
                                    }}>
                                    <img src={menu.cover_image} alt=""/>
                                    <h4>{menu.title}</h4>
                                    {
                                        activeMenu &&
                                        activeMenu.id === menu.id
                                        &&
                                        <div className="choosen">
                                            <i className="fa fa-eye" aria-hidden="true"></i>
                                        </div>
                                    }
                                </div>
                            );
                        })
                    }
                    {
                        loading
                        &&
                        <Loader
                            type="Oval"
                            color="#D72638"
                            height={100}
                            width={100}
                            timeout={12000}

                        />

                    }
                </div>
                <Route path={`${match.path}/:id/items`}>
                    <AllItems />
                </Route>
                
            </div>

        );
    }
}

const mapStateToProps = state=>({
    menus : selectAllMenus(state),
    activeMenu : selectActiveMenu(state),
    error : selectMenusError(state),
    loading : selectLoadingMenus(state),
    outlet : selectUserOutlet(state),
    user : selectActiveUser(state),
})
const mapDispatchToProps = dispatch=>({
    getMenus : (outlet_id)=>dispatch(getAllMenusByOutlet(outlet_id)),
    choose : (menu)=>dispatch(chooseMenu(menu)),

})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    
    )(AllMenus)
);