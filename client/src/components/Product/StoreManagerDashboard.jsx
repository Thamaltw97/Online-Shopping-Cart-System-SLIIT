import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import './StylesProduct.css';

const Product  = props => (
    <tr>
        <td>{props.product.productName}</td>
        <td>{props.product.productDesc}</td>
        <td>{props.product.productBrand}</td>
        <td>{props.product.productQuantity}</td>
        <td>{props.product.productUnitPrice}</td>
        <td>
            <Link to={"/product/edit/"+props.product._id}>Edit</Link> <span>
             |
        </span> <Link to={"/product/adddiscount/"+props.product._id}>Add Discount</Link>

        </td>
    </tr>
);

class StoreManagerDashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            //editModelShow: false
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

    nextUploadPath() {
        this.props.history.push('/product/upload');
    }

    nextDiscountPath() {
        this.props.history.push('/product/discount');
    }

    render() {

        //let editModelClose = () => this.setState({editModelShow: false});

        return (
            <>
            <div style={{ width: '75%', margin: '3rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Store Manager Dashboard  <span className="fas fa-air-freshener"></span></h2>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <h3>Product List</h3>
                    </div>
                    <div className="col-md-5"><p> </p></div>
                    <div className="col-md-4">
                        <button className="btn" id="btnAddNewProduct" onClick={() => this.nextUploadPath('/product/upload')}><i className="fa fa-plus"></i> Add New Product</button>
                        <span>  </span>
                        <button className="btn" id="btnDiscountPanel" onClick={() => this.nextDiscountPath('/product/discount')}><i className="fas fa-percent"></i> Discount Panel</button>
                    </div>
                </div>

                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productList() }
                    </tbody>
                </table>
            </div>

            </>
        )
    }

}

export default StoreManagerDashboard;