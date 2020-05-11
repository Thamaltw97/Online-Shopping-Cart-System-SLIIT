import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
//import EditProduct from "./EditProduct";

const Product  = props => (
    <tr>
        <td>{props.product.productName}</td>
        <td>{props.product.productDesc}</td>
        <td>{props.product.productBrand}</td>
        <td>{props.product.productQuantity}</td>
        <td>{props.product.productUnitPrice}</td>
        <td>
            <Link to={"/product/edit/"+props.product._id}>Edit</Link>
        </td>
    </tr>
);

class StoreManagerDashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            editModelShow: false
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/products/')
            .then(response => {
                this.setState({products: response.data.products});
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        Axios.get('http://localhost:5000/api/products/')
            .then(response => {
                this.setState({products: response.data.products});
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    productList() {
        return this.state.products.map(function(currentProduct, index){
            return <Product product={currentProduct} key={index} />
        })
    }

    render() {

        //let editModelClose = () => this.setState({editModelShow: false});

        return (
            <>
            <div>
                <h3>Product List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Size</th>
                            <th>Unit Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productList() }
                    </tbody>
                </table>
            </div>
            {/*<EditProduct*/}
            {/*    show={this.state.editModelShow}*/}
            {/*    onHide={editModelClose}*/}
            {/*/>*/}
            </>
        )
    }

}

export default StoreManagerDashboard;