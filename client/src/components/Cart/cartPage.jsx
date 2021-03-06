import React, {Component} from "react";
import Axios from "axios";
import './cartPage.css'
import {Link} from "react-router-dom";


const Item = props => (
    <tr>
        <td>{props.item.productName}</td>
        <td>{props.item.productDesc}</td>
        <td>{props.item.productColour}</td>
        <td>{props.item.productSize}</td>
        <td>{props.item.productUnitPrice}</td>
        <td>{props.item.quantity}</td>
        <td>{props.item.totalPrice}</td>
        <td>
        <Link to={"/cart/edit/"+props.item._id}>Edit</Link><span> | </span>
        <button className="btn btn-danger" button type="submit" id="btnDelete"
                onClick={() =>
                    Axios.delete('https://onlineshoppingcartsystemsliit.herokuapp.com/api/cart/delete/' + props.item._id)
                        .then(res => {
                            // alert(res.data);
                            alert("Your Item has been Deleted!")

                        })
                        .catch(err => {
                            console.log('Error from client: ' + err)
                        })
                }>
        <i className="fa fa-trash" aria-hidden="true"></i>
        </button>

        </td>
    </tr>
);



export default class Cart extends Component{

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totalAmount:0
        };
    }


    componentDidMount() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/cart/cartbyuser/' + localStorage.getItem('user-id'))
            .then(response => {
                this.setState({items: response.data.cart});
                let finalAmount = 0;
                for (let i = 0; i < this.state.items.length; i++){
                    finalAmount = finalAmount + this.state.items[i].totalPrice
                }
                //console.log(finalAmount)
                this.setState({totalAmount: finalAmount});
                //console.log(this.state.totalAmount)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.componentDidMount()
    }

    itemList() {
        return this.state.items.map(function (currentItem,i) {
            return <Item item = {currentItem} key={i}/>
        });
    }


    backToPath (){
        this.props.history.push('/home');
    };

    paymentPath (){
        this.props.history.push('/payment');
        alert("Your Shopping Details Recorded successfully!")

    };




    render() {
        return (
            <div style={{ width: '95%', margin: '3rem auto' }}>
                <h2 className="header-shoppingcart">Shopping Cart</h2>
                <table className="table table-striped tableComment" style={{marginTop:20}}>
                    <thead>
                    <tr>
                        <th className="th-cart">Item Name</th>
                        <th className="th-cart">Item Description</th>
                        <th className="th-cart">Item Colour</th>
                        <th className="th-cart">Item Size</th>
                        <th className="th-cart">Item Price</th>
                        <th className="th-cart">Item Quantity</th>
                        <th className="th-cart">Total Price</th>
                        <th className="th-cart">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.itemList()}
                    </tbody>
                </table>
                <div className="div-space2"></div>
                <div id="container " className="row">

                    <div >
                        <button className="btn btn-info button-backToShop" onClick={() => this.backToPath('/home')}>

                            <i className="fa fa-chevron-left" aria-hidden="true"/>       Back to Shopping</button>
                    </div>

                </div>
                <div className="div-space1"/>
                  <div className="div-totalAmount">
                      <div >

                          <label className="lable-totalAmount">Total Amount : </label>
                          <text id="finalAmount" className="text-totalAmount">Rs{this.state.totalAmount}.00</text>
                      </div>
                    <button className="btn btn-success button-checkout" onClick={() => this.paymentPath('/payment')}>Proceed To CHECKOUT</button>
                </div>
            </div>
        )

    }


}
