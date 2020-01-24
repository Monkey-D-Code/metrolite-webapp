import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux';
// importing components
import NavBar from './components/NavBar';

// importing pages
import Home from './pages/home';
import Login from './pages/user/login';
import Register from './pages/user/register';
import Outlet from './pages/outlet/outlet';
import Sales from './pages/sales';
import Inventory from './pages/inventory';

// importing selectors
import {
  selectIsAuthenticated,
} from './redux/accounts/accounts.selectors';
import Profile from './pages/user/profile';

class App extends Component{

  render = ()=>{
    const {
      isAuth,
    } = this.props;
    return(
      
        <Router>
          {isAuth && <NavBar/>}
          <Switch>
            <Route exact path='/'>
                {isAuth ? <Redirect to='/home' />: <Login />}
            </Route>
            <Route  path='/home'>
              {isAuth ? <Home /> : <Redirect to='/' />}
            </Route>
            <Route exact path='/register'>
                {isAuth ? <Redirect to='/home' />: <Register/>}
            </Route>
            <Route path='/profile'>
                {isAuth ? <Profile /> : <Redirect to='/' />}
            </Route>
            <Route path='/outlet'>
                {isAuth ? <Outlet /> : <Redirect to='/' />}
            </Route>
            <Route path='/sales'>
                {isAuth ? <Sales /> : <Redirect to='/' />}
            </Route>
            <Route path='/inventory'>
                {isAuth ? <Inventory /> : <Redirect to='/' />}
            </Route>
          </Switch>
        </Router>
        
        
      
      

    );
  }
}

const mapStateToProps = state =>({
  isAuth : selectIsAuthenticated(state),
})
export default connect(
  mapStateToProps,
)(App);
