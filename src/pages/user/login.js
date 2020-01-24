import React ,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';

// importing selectors
import {
    selectLoadingUser,
    selectUserError,
    selectTokenError,

} from '../../redux/accounts/accounts.selectors';


// importing actions
import {
    userLogin,
} from '../../redux/accounts/accounts.actions';


class Login extends Component{

    state = {
        username : '',
        password : '',
    }
    inputChange = e =>{
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
    submit = ()=>{
        const {
            username,
            password,

        } = this.state;
        const {
            login,

        } = this.props;
        login({username,password});
    }
    render = ()=>{
        const {
            username,
            password,
        } = this.state;
        const {
            loading,
            userError,
            tokenError,

        } = this.props;
        
        return(
            <div className="login-form">
                {
                    tokenError &&
                    <div className='error'>
                        <h4>{JSON.stringify(tokenError.data)}</h4>
                    </div>
                }
                {
                    userError &&
                    <div className="error">
                        <h4>{JSON.stringify(userError.data)}</h4>
                    </div>
                }
                <form action="">
                    <div className="form-group">
                        <h3>
                            {
                                loading
                                ? 'Verifying details'
                                : 'Login To Metrolite'
                            }
                        </h3>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username"
                            value={username}
                            onChange={this.inputChange}
                            disabled={loading}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={password}
                            onChange={this.inputChange}
                            disabled={loading}
                        />
                        <button 
                            className="primary-button" 
                            type='button' 
                            onClick={this.submit}
                            disabled={loading}
                        >{
                            loading 
                            ? <Loader
                                type="Oval"
                                color="#ffff"
                                height={40}
                                width={40}
                                timeout={12000} //3 secs
        
                            />
                            :'Login'
                        }</button>
                    </div>
                </form>
                {!loading && <div className="register-link">
                    <p>New to Metrolite ? </p>
                    <NavLink to='/register'>Join Here</NavLink>
                </div>}
            </div>

        )
    }
}


const mapStateToProps = state =>({
    loading : selectLoadingUser(state),
    userError : selectUserError(state),
    tokenError : selectTokenError(state),
});

const mapDispatchToProps = dispatch=>({
    login : (authData)=>dispatch(userLogin(authData)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);