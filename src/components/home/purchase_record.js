import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';

// importing selectors'
import {
    selectPurchaseDate,
    selectPurchaseRecords,
    selectPurchaseRecordsError,
    selectPurchaseRecordsLoading,

} from '../../redux/record/Record.selectors';
import {
    selectActiveUser,

} from '../../redux/accounts/accounts.selectors';


// importing actions
import {
    getPurchaseRecords,
    changePurchaseDate,

} from '../../redux/record/Record.actions';

class PurchaseRecord extends Component{
    componentDidMount = ()=>{
        const {getRecords,user,changeDate} = this.props;
        const date = new Date();
        const date_string = `${date.getFullYear()}-${date.getMonth()+1 > 10 ? date.getMonth()+1 : `0${date.getMonth()+1}`}-${date.getDate()}`;
        changeDate(date_string);
        if(user) getRecords(date_string , user.outlet);
    }
    render=()=>{
        const {
            date,
            changeDate,
            user,
            records,
            error,
            loading,
            getRecords,

        } = this.props;
        return(
            <div className="purchase-record">
               <div className="date">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    <input 
                        type="date" 
                        name="date" 
                        id=""
                        value={date}
                        onChange={e=>{
                            changeDate(e.target.value);
                            getRecords(e.target.value , user.outlet);
                        }}
                        placeholder="Choose a Date"
                    />
                </div>
                <div className="purchase-record-list">
                    {
                        loading
                        &&
                        <Loader
                            type="Oval"
                            color="#D72638"
                            height={100}
                            width={100}
                            timeout={12000} //3 secs
                            style={{marginTop : '7em'}}
                        />
                    }
                    {
                        error
                        &&
                        <div className="error">
                            <h4>
                                {JSON.stringify(error.data)}
                            </h4>
                        </div>
                    }
                    {
                        records
                        &&
                        records.map((r,i)=>{
                            return(
                                <div className="one-record" key={i}>
                                    <h1><i className="fa fa-inr" aria-hidden="true"></i>{r.grand_total}</h1>
                                    <div className="datetime">
                                        
                                        <p><i className="fa fa-clock-o" aria-hidden="true"></i> {r.time.split('.')[0]}</p>
                                    </div>
                                    <div className="products">
                                        {
                                            r.products.map((p,j)=>{
                                                return(
                                                    <div className="single-product" key={j}>
                                                        <h4>
                                                            {p.product.name}
                                                        </h4>
                                                        <h4>
                                                            {p.quantity} {p.product.measuring_unit}
                                                        </h4>
                                                        <h4><i className="fa fa-inr" aria-hidden="true"></i> {p.product.price_per_unit * p.quantity}</h4>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        );
    }
}

const mapState = state =>({
    records : selectPurchaseRecords(state),
    loading : selectPurchaseRecordsLoading(state),
    error : selectPurchaseRecordsError(state),
    user : selectActiveUser(state),
    date : selectPurchaseDate(state),
})
const mapDispatch = dispatch =>({
    changeDate : date =>dispatch(changePurchaseDate(date)),
    getRecords : (date,outlet_id)=>dispatch(getPurchaseRecords(date,outlet_id))
})


export default withRouter(connect(
    mapState,
    mapDispatch,

)(PurchaseRecord));