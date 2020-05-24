import React, {Component} from "react";
import Axios from "axios";
import {Button} from "antd";
//import { Link } from "react-router-dom";


const Item = props => (
    <tr>
        <td>{props.item.productName}</td>
        <td>{props.item.productDesc}</td>
        <td>{props.item.productColour}</td>
        <td>{props.item.productSize}</td>
        <td>{props.item.productUnitPrice}</td>
        <td>
            <button type="submit" className="btn btn-block btn-danger mt-3" id="btnDelete"
                    onClick={() =>
                        Axios.delete('https://onlineshoppingcartsystemsliit.herokuapp.com/api/wishlists/delete/' + props.item._id)
                            .then(res => {
                                    alert(res.data);
                                    //this.props.history.push('/wishlist/wishlist');
                            })
                            .catch(err => {
                                console.log('Error from client: ' + err)
                            })
                    }>Delete</button>
        </td>
    </tr>
);




export default class WishList extends Component{

    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.state = {items: []};
    }

    componentDidMount() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/wishlists/wishlistbyuser/' + localStorage.getItem('user-id'))
            .then(response => {
                this.setState({items: response.data.wishlist});
                //console.log(this.state.items)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentDidUpdate() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/wishlists/wishlistbyuser/' + localStorage.getItem('user-id'))
            .then(response => {
                this.setState({items: response.data.wishlist});
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

    addToCart() {
        for(let i = 0 ; i < this.state.items.length ; i++){
            let cartObj = {
                productName: this.state.items[i].productName,
                productDesc: this.state.items[i].productDesc,
                productSize: this.state.items[i].productSize,
                productColour: this.state.items[i].productColour,
                productUnitPrice: this.state.items[i].productUnitPrice,
                quantity: 1,
                totalPrice: this.state.items[i].productUnitPrice,
                cartUserId: localStorage.getItem('user-id')
            };

            Axios.post('https://onlineshoppingcartsystemsliit.herokuapp.com/api/cart/add', cartObj)
                .then(res => {
                    Axios.delete('https://onlineshoppingcartsystemsliit.herokuapp.com/api/wishlists/delete/' + this.state.items[i]._id)
                        .then(res => {
                            //alert(res.data);
                        })
                        .catch(err => {
                            console.log('Error from client when deleting wishlist: ' + err)
                        });
                    if (i === this.state.items.length - 1) {
                        alert(res.data);
                    }
                })
                .catch(err => {
                    alert('Error from client: ' + err);
                });

        }
    }


    render() {
        return (
            <div style={{ width: '95%', margin: '3rem auto'  }}>
                <br />
                <h3>WishList</h3>
                <table className="table table-striped tableComment" style={{marginTop:20}}>
                    <thead>
                    <tr className="bg-warning">
                        <th>Item Name</th>
                        <th>Item Description</th>
                        <th>Item Colour</th>
                        <th>Item Size</th>
                        <th>Item Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
                <Button className="btn btn-primary" onClick={this.addToCart}>Add to Cart</Button>
            </div>
        )

    }


}
