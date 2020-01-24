import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Route} from 'react-router-dom';
import Loader from 'react-loader-spinner';
// importing selectors
import {
    selectAllMenus,
    selectActiveMenu,
    selectMenusError,
    selectLoadingMenus,

} from '../../redux/menu/Menu.selectors';

import {
    selectActiveOutlet,

} from '../../redux/outlet/Outlet.selectors'; 

// importing actions
import {
    getAllMenusByOutlet,
    chooseMenu,

} from '../../redux/menu/Menu.actions';
// importing components
import Items from './items';

class Menus extends Component {
    componentDidMount = ()=>{
        const outlet_id = this.props.match.params.id;
        const {getMenus} = this.props;
        getMenus(outlet_id);
    }
    componentDidUpdate = oldProps =>{
        const old_outlet_id = oldProps.match.params.id;
        const new_oulet_id = this.props.match.params.id;

        const {getMenus} = this.props;
        if(old_outlet_id !== new_oulet_id){
            getMenus(new_oulet_id);
        }
    }
    componentDidUnmount=()=>{
        this.props.choose(null);
    }
    showItems = (e,menu)=>{
        const {match,choose} = this.props;
        
        choose(menu);
        this.props.history.push(`${match.url}/${e.target.id}/items`);
    }
    render=()=>{
        const {
            choose,
            menus,
            error,
            loading,
            match,
            choosen
        } = this.props;
        return(
            <div className="menus">
                
                <h1>
                    {
                        loading
                        ? 'Getting Menus'
                        : 'Our Menus'
                    }
                </h1>
                {
                    loading
                    &&
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
                    error
                    &&
                    <div className="error">
                        <h4>
                            {JSON.stringify(error)}
                        </h4>
                    </div>
                }
                <div className="list">
                    {
                        menus 
                        && menus.map((menu,i)=>{
                            return(
                                <div 
                                    className="single-menu"
                                    
                                    key={i} 
                                    id={menu.id} 
                                    onClick={(e)=>{
                                        this.showItems(e,menu)
                                    }}
                                >
                                    <img src={menu.cover_image} alt="" id={menu.id}/>
                                    {   
                                            choosen &&
                                            choosen.id === menu.id
                                            &&
                                            <div className="active-menu">
                                                <p>
                                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                                </p>
                                            </div>
                                        }
                                    <div className="info">
                                        <h4>{menu.title}</h4>
                                        <p className="type">{menu.menu_type}</p>
                                        
                                    </div>

                                    
                                </div>
                            )
                        })
                    }
                </div>
                <Route path={`${match.path}/:id/items`}>
                    <Items parentmatch={match.url} />
                </Route>
            </div>
        )
    }
}


const mapStateToProps = state =>({
    menus : selectAllMenus(state),
    error : selectMenusError(state),
    loading : selectLoadingMenus(state),

    outlet : selectActiveOutlet(state),
    choosen : selectActiveMenu(state),
})

const mapDispatchToProps = dispatch =>({
    getMenus : (outlet_id)=>dispatch(getAllMenusByOutlet(outlet_id)),
    choose : (menu)=>dispatch(chooseMenu(menu)),
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Menus)
);