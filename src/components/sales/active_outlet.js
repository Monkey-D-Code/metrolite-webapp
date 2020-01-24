import React,{Component} from 'react';
import {connect} from 'react-redux';


// importing selectors
import {
    selectUserOutlet,

} from '../../redux/outlet/Outlet.selectors';




class ActiveOutlet extends Component{

    render=()=>{
        const {
            outlet,
            
        } = this.props;
        if(!outlet) return <div>hgkjhgkjh</div>
        return(
            <div className="active-outlet">
                <img src={outlet.cover_image_url} alt=""/>
                <h1>
                    {outlet.name}
                </h1>
                <p><i className="fa fa-phone-square" aria-hidden="true"></i> {outlet.contact_number}</p>
                <p><i className="fa fa-map-marker" aria-hidden="true"></i> {outlet.address}</p>
            </div>

        );
    }
}

const mapStateToProps = state =>({
    outlet : selectUserOutlet(state),
})

export default connect(
    mapStateToProps,
)(ActiveOutlet);