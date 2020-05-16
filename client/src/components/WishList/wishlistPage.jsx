import React, {Component} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";


const Item = props => (
    <tr>
        <td>{props.item.productName}</td>
        <td>{props.item.productQuantity}</td>
        <td>{props.item.productDesc}</td>
        <td>{props.item.productUnitPrice}</td>
        <td>
            <Link to={"/WishList/delete/"+props.item._id}>Delete</Link>
        </td>
    </tr>
);




export default class WishList extends Component{

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/wishlists/')
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


    render() {
        return (
            <div>
                <h3>WishList</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Item Quantity</th>
                        <th>Item Description</th>
                        <th>Item Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
            </div>
        )

    }


}
