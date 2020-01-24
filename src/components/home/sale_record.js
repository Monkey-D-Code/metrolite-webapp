import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';


// importing selectors
import {
   
    selectSaleDate,
    selectSaleRecords,
    selectSaleRecordsError,
    selectSaleRecordsLoading,

} from '../../redux/record/Record.selectors';
import {
    selectActiveUser,
} from '../../redux/accounts/accounts.selectors';

// importing actions
import {
    getSaleRecords,
    changeSaleDate,

} from '../../redux/record/Record.actions';

class SaleRecord extends Component{
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
            <div className="sale-record">
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
                <div className="sale-record-list">
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
                        records.map((record,i)=>{
                            return(
                                <div className="single-record" key={i}>
                                    <h1>
                                        <i className="fa fa-inr" aria-hidden="true"></i>{record.grand_total}
                                    </h1>
                                    <div className="datetime">
                                        
                                        <p><i className="fa fa-clock-o" aria-hidden="true"></i> {record.time.split('.')[0]}</p>
                                    </div>
                                    <div className="items">
                                        {
                                            record.items.map((item,j)=>{
                                                return(
                                                    <div className="single-item" key={j}>
                                                        <h4>
                                                            {item.item.name}
                                                        </h4>
                                                        <h4>
                                                            {item.quantity}
                                                        </h4>
                                                        <h4><i className="fa fa-inr" aria-hidden="true"></i> {item.item.price * item.quantity}</h4>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

        );
    }
}

const mapState = state =>({
    records : selectSaleRecords(state),
    error : selectSaleRecordsError(state),
    loading : selectSaleRecordsLoading(state),
    date : selectSaleDate(state),
    user : selectActiveUser(state),
})

const mapDispatch = dispatch =>({
    getRecords : (date,outlet_id)=>dispatch(getSaleRecords(date,outlet_id)),
    changeDate : date => dispatch(changeSaleDate(date)),
})

export default withRouter(connect(
    mapState,
    mapDispatch,

)(SaleRecord));