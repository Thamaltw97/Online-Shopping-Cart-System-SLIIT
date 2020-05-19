import React, {Component} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import './cartPage.css'


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

            <Link to={"/"+props.item._id}>
                <button className="btn btn-success button-checkout">CHECKOUT</button>
            </Link>

            <Link to={"/cart/delete/"+props.item._id}>
                {/*Delete*/}<button className="btn btn-danger" ><i className="fa fa-trash" aria-hidden="true"></i></button>
            </Link>
        </td>
    </tr>
);




export default class Cart extends Component{

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/cart/cartbyuser/' + localStorage.getItem('user-id'))
            .then(response => {
                this.setState({items: response.data.cart});
                //console.log(this.state.items)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    itemList() {
        return this.state.items.map(function (currentItem,i) {
            return <Item item = {currentItem} key={i}/>
        });
    }


    render() {
        return (
            <div>
                <h2>Shopping Cart</h2>
                <table className="table table-striped" style={{marginTop:20}}>
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
                <div id="container" className="row">

                    <div >
                        <button className="btn btn-info button-backToShop">Back to Shopping</button>
                    </div>
                    <div >
                    <button className="btn btn-info button-empty">Empty Shopping Cart</button>
                    </div>

                </div>
                  <div>
                      <div>

                          <label>Total Amount : </label>
                          <text id="totalAmount"></text>
                      </div>
                    <button className="btn btn-success button-checkout">Proceed To CHECKOUT</button>
                </div>
            </div>
        )

    }


}
