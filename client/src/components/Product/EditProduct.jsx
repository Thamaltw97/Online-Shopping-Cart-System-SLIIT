import React, {Component} from "react";
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import ImgUpload from "./ImageUpload";
import Axios from "axios";

class EditProduct extends Component{

    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onBrandChange = this.onBrandChange.bind(this);
        this.onQtyChange = this.onQtyChange.bind(this);
        this.onUPriceChange = this.onUPriceChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

        this.state = {
            productName: '',
            productDesc: '',
            productBrand: '',
            productQuantity: 0,
            productUnitPrice: 0
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/products/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    productName: response.data.product.productName,
                    productDesc: response.data.product.productDesc,
                    productBrand: response.data.product.productBrand,
                    productQuantity: response.data.product.productQuantity,
                    productUnitPrice: response.data.product.productUnitPrice
                });
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    onNameChange(e) {
        this.setState({
            productName: e.target.value
        });
    }

    onDescChange(e) {
        this.setState({
            productDesc: e.target.value
        });
    }

    onBrandChange(e) {
        this.setState({
            productBrand: e.target.value
        });
    }

    onQtyChange(e) {
        this.setState({
            productQuantity: e.target.value
        });
    }

    onUPriceChange(e) {
        this.setState({
            productUnitPrice: e.target.value
        });
    }

    onUpdate(e) {
        e.preventDefault();
        const obj = {
            productName: this.state.productName,
            productDesc: this.state.productDesc,
            productBrand: this.state.productBrand,
            productQuantity: this.state.productQuantity,
            productUnitPrice: this.state.productUnitPrice,
        }
        Axios.put('http://localhost:5000/api/products/update/'+this.props.match.params.id, obj)
            .then(res => {
                if (res.data.success){
                    alert(res.data.successMsg);
                } else {
                    alert('Error from server: '+ res.data.err);
                }
            })
            .catch(err => {console.log('Error from client: ' + err)});

        this.props.history.push('/product/storemanager');
    }

    render() {
        return (
            <>

                <div className="container pt-3 mt-3 mb-5" >
                    <div className="card card-body my-0 bg-light">
                        <form onSubmit={this.onUpdate}>

                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <h2 className="text-capitalize text-center mt-3 mb-2">Edit Product</h2>
                                    <br/>
                                    <br />


                                    <label>Product Name : </label>
                                    <input id="productName" type="text" className="form-control text-capitalize"
                                           maxLength="30"
                                           placeholder="Enter Product Name"
                                           onChange={this.onNameChange}
                                           value={this.state.productName} />
                                    <br/>
                                    <label>Product Description : </label>
                                    <input id="productDesc" type="text" className="form-control text-capitalize"
                                           maxLength="100"
                                           placeholder="Enter Product Description"
                                           onChange={this.onDescChange}
                                           value={this.state.productDesc} />
                                    <br />
                                    <label>Product Brand : </label>
                                    <input id="productBrand" type="text" className="form-control text-capitalize"
                                           maxLength="30"
                                           placeholder="Enter Product Brand"
                                           onChange={this.onBrandChange}
                                           value={this.state.productBrand} />
                                    <br />
                                    <label>Product Quantity : </label>
                                    <input id="productQuantity" type="number" className="form-control text-capitalize"
                                           maxLength="12" min="1"
                                           placeholder="Enter Product Quantity"
                                           onChange={this.onQtyChange}
                                           value={this.state.productQuantity} />
                                    <br />
                                    <label>Product Unit Price : </label>
                                    <input id="productUPrice" type="number" className="form-control text-capitalize"
                                           maxLength="12" pattern="[0-9]*"
                                           placeholder="Enter Product Unit Price"
                                           onChange={this.onUPriceChange}
                                           value={this.state.productUnitPrice} />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <button type="submit" className="btn btn-block btn-primary mt-3"
                                            id="btnSubmit"
                                            onClick={this.onUpdate}
                                    >Update</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </>
        )
    }

}

export default EditProduct;
