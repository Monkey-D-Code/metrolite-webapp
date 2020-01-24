import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


// importing selectors
import {
    selectActiveUser,

} from '../../redux/accounts/accounts.selectors';
// importing actions
import {
    toggleMenu,
} from '../../redux/website/Website.actions';


class Profile extends Component{
    componentDidMount = ()=>{
        const {toggle} = this.props;
        toggle();
    }
    render=()=>{
        const {user} = this.props;
        return(
            <div className="profile">
                {
                    user
                    &&
                    <div className="user-data">
                        <img src={
                                user.display_image
                                ? user.display_image
                                : `https://ui-avatars.com/api/?name=${user.user.first_name}+${user.user.last_name}&background=ffff&color=232ED1&size=250`
                            } 
                                alt=""
                            />
                        <h1>{user.user.first_name} {user.user.last_name}</h1>
                        <div className="contact-info">
                            <p><i className="fa fa-phone" aria-hidden="true"></i> {user.contact_number}</p>
                            <p><i className="fa fa-envelope" aria-hidden="true"></i> {user.user.email}</p>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

const mapState = state =>({
    user : selectActiveUser(state),
})

const mapDispatchToProps = dispatch => ({
    toggle : ()=>dispatch(toggleMenu()),
})

export default withRouter(connect(
    mapState,
    mapDispatchToProps,

)(Profile));