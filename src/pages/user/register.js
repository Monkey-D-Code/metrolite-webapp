import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';



class Register extends Component{

    render =()=>{
        return(
            <div className="register-form">
                <h1>Join Metrolite</h1>
                <form action="">
                    <div className="form-group">
                        <h3>Personal Information</h3>
                    .
                        <input 
                            type="text" 
                            name="first_name" 
                            id=""
                            placeholder='Your first name'
                        />
                        <input 
                            type="text" 
                            name="last_name" 
                            id=""
                            placeholder='Your last name'
                        />
                        <input 
                            type="email" 
                            name="email" 
                            id=""
                            placeholder='Your email address'
                        />
                        <input 
                            type="number" 
                            name="phone" 
                            id=""
                            min={0}
                            placeholder='Your phone number'
                        />
                        <input 
                            type="url" 
                            name="display_image_url" 
                            id=""
                            
                            placeholder='Your display image link'
                        />
                    </div>
                    <div className="form-group">
                        <h3>Authentication</h3>
                        <input 
                            type="text" 
                            name="username" 
                            id=""
                            
                            placeholder='Choose a username'
                        />
                        <input 
                            type="password" 
                            name="password" 
                            id=""
                            
                            placeholder='Choose a password'
                        />
                        <input 
                            type="password" 
                            name="confirm_password" 
                            id=""
                            
                            placeholder='Confirm your password'
                        />
                        <button className="primary-button" type='button'>Register</button>
                        <div className="login-link">
                            <p>Already a member ? </p>
                            <NavLink to='/'>Login Here</NavLink>
                            
                        </div>
                    </div>
                    
                </form>
                
            </div>
        )
    }
}

export default Register;