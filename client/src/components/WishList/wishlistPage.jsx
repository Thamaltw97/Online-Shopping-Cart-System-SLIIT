import React, {Component} from "react";
import Axios from "axios";
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


    render() {
        return (
            <div>
                <h3>WishList</h3>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                    <tr>
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
            </div>
        )

    }


}
