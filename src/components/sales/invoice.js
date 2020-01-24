import React,{Component} from 'react';
import {connect} from 'react-redux';


// importing selectors
import {
    selectUserOutlet,

} from '../../redux/outlet/Outlet.selectors';
import {
    selectLatestSale,

} from '../../redux/item/Item.selectors';


class Invoice extends Component{
    state = {
        visible :false,
    }
    
    toggleVisibility = ()=>{
        this.setState({
            visible : !this.state.visible,
        })
    }
    printStyles = `.invoice-body {
        background-color: white;
        width: 55mm;
        border: 2px solid #14773e;
        display: flex;
        flex-flow: column;
        align-items: center; }
        .invoice-body h4 {
          padding: 0.2em 0.3em;
          font-family: "Yanone Kaffeesatz", sans-serif;
          text-align: center;
          color: #101D42; }
        .invoice-body .time-stamp {
          width: 100%;
          display: flex;
          font-size: 0.8em;
          justify-content: space-evenly;
          color: #77740a; }
        .invoice-body .invoice-items {
          width: 100%;
          margin: 0.5em 0; }
          .invoice-body .invoice-items .one-item {
            display: flex;
            justify-content: space-evenly;
            margin: 0.3em 0; }
        .invoice-body .gst {
          display: flex;
          justify-content: space-evenly;
          width: 100%; }
        .invoice-body .grand-total {
          font-family: "Bangers", cursive;
          font-size: 2em;
          letter-spacing: 1px;
          color: #101D42; }
        .invoice-body .message p {
          font-size: 0.8em; }
        .invoice-body .message h4 {
          font-family: "Pacifico", cursive; }
        .invoice-body .contact p {
          font-size: 0.7em;
          text-align: center;
          margin: 0.2em 0; } }`
    printInvoice = ()=>{
        const invoiceHTML = document.querySelector('.invoice-body').innerHTML;
        const printWindow = window.open('','_blank','height=800,width=1200');
        printWindow.document.open();
        printWindow.document.write(
                `   
                    <html>
                        <head>
                            <title>
                                Metrolite Invoice
                            </title>
                            <style media='print'>
                                @import url('https://fonts.googleapis.com/css?family=Montserrat+Subrayada|Pacifico|Yanone+Kaffeesatz&display=swap');
                                @import url('https://fonts.googleapis.com/css?family=Bangers&display=swap');
                                ${this.printStyles}
                            </style>
                            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
                        </head>
                        <body onload="window.print()">
                            <div class='invoice-body'>
                                ${invoiceHTML}
                            </div>
                        </body>

                    </html>
                `
        );
        printWindow.document.close();
       
        
    }
    render=()=>{
        const {visible} = this.state;
        const {
            outlet,
            latest_sale,

        } = this.props;
        return(
            <div className="invoice">
                <div className={visible ? "invoice-body visible" : "invoice-body"}>
                    <h1>Metrolite</h1>
                    <p>Choice Your's</p>
                    <div className="print-stuff">
                        <button 
                            className='print-btn'
                            onClick={this.printInvoice}
                        ><i className="fa fa-print" aria-hidden="true"></i></button>
                    </div>
                    <h4>
                        {outlet.name}
                    </h4>
                    <div className="time-stamp">
                        <p><i className="fa fa-calendar" aria-hidden="true"></i> {latest_sale.date}</p>
                        <p><i class="fa fa-clock-o" aria-hidden="true"></i> {latest_sale.time.split('.')[0]}</p>
                    </div>
                    <div className="invoice-items">
                        {
                            latest_sale.items.map((s_item,i)=>{
                                return(
                                    <div className="one-item" key={i}>
                                        <h4>
                                            {s_item.item.name}
                                        </h4>
                                        <p>
                                            {s_item.quantity}
                                        </p>
                                        <p><i className="fa fa-inr" aria-hidden="true"></i> {s_item.quantity*s_item.item.price}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="gst">
                        <p>CGST 5%</p>
                        <p>SGST 5%</p>
                        <h4>10%</h4>
                    </div>
                    <h3 className="grand-total"><i className="fa fa-inr" aria-hidden="true"></i> {latest_sale.grand_total.split('.')[0]}</h3>
                    <div className="message">
                        <p>
                            Thank You for Choosing Metrolite
                        </p>
                        <h4>Visit Again</h4>
                    </div>
                    <div className="contact">
                        <p><i className="fa fa-phone" aria-hidden="true"></i> +91 9874457122</p>
                        <p><i className="fa fa-envelope-o" aria-hidden="true"></i> metrolite.kolkata@yahoo.com</p>
                        <p><i className="fa fa-globe" aria-hidden="true"></i> metrolite.in</p>
                    </div>
                </div>

                <button className='toggle-invoice' onClick={this.toggleVisibility}><i className="fa fa-file-text-o" aria-hidden="true"></i> {visible ? 'Hide Invoice' : 'Show Invoice'}</button>
            </div>

        );
    }
}

const mapState = state =>({
    latest_sale : selectLatestSale(state),
    outlet : selectUserOutlet(state),
})
export default connect(
    mapState,

)(Invoice);