import React,{Component} from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// importing selectors
import {
    selectMenuToggle,
} from '../redux/website/Website.selectors';

import {
    selectActiveUser,
} from '../redux/accounts/accounts.selectors';


// importing actins
import {
    toggleMenu,
} from '../redux/website/Website.actions';

import {
    logout,
} from '../redux/accounts/accounts.actions';
import {
    getAllOutlets,
} from '../redux/outlet/Outlet.actions';

class NavBar extends Component{
    componentDidMount =()=>{
        this.props.getAllOutlets();
    }

    render =()=>{
        const {
            menuSwitch,
            toggle,
            logout,
            user,

        } = this.props;
        return(
            <div>
                <nav className={menuSwitch ? "active" : ""}>
                    <div className="brand">
                        <h1>Metrolite</h1>
                        <p>Choice Your's</p>
                    </div>
                    {
                        user
                        &&
                        <div className="user">
                            <img src={
                                user.display_image
                                ? user.display_image
                                : `https://ui-avatars.com/api/?name=${user.user.first_name}+${user.user.last_name}&background=ffff&color=232ED1&size=150`
                            } 
                                alt=""
                            />
                            <h2>{user.user.first_name} {user.user.last_name}</h2>
                            <div className="settings">
                                <button 
                                    className='profile-btn'
                                    onClick={()=>this.props.history.push('/profile')}
                                >Profile</button>
                                <button className='logout-btn' onClick={()=>logout()}>Logout</button>
                            </div>
                        </div>
                    }
                    
                    <div className="menu">
                        <ul>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/outlet'>Outlets</NavLink></li>
                            
                        </ul>
                        <ul>
                            <li><NavLink to='/sales'>Sales</NavLink></li>
                            <li><NavLink to='/inventory'>Inventory</NavLink></li>
                            <li><NavLink to='/'>Usage</NavLink></li>

                        </ul>
                        
                    </div>
                    
                </nav>
                <button className="menu-toggle" onClick={toggle}>
                     {
                         menuSwitch 
                         ? <i className="fa fa-times" aria-hidden="true"></i>
                         : <i className="fa fa-bars" aria-hidden="true"></i>
                     }
                </button>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    menuSwitch : selectMenuToggle(state),
    user : selectActiveUser(state),
})

const mapDispatchToProps = dispatch =>({
    toggle : ()=>dispatch(toggleMenu()),
    logout : ()=>dispatch(logout()),
    getAllOutlets : ()=>dispatch(getAllOutlets())
})

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    
    )(NavBar)
);