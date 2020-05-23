import React, {Component} from "react";
import Axios from "axios";

class AddDiscount extends Component{

    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onRemarksChange = this.onRemarksChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            discountCouponName: '',
            discountDesc: '',
            discountAmount: '',
            discountProductId: this.props.match.params.id,
            discountProductName: '',
            discountRemarks: ''
        }

    }

    componentDidMount() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/products/' + this.state.discountProductId)
            .then(response => {
                this.setState({
                    discountProductName: response.data.product.productName
                });
                //console.log(this.state)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    onNameChange(e) {
        this.setState({
            discountCouponName: e.target.value
        });
    }

    onDescChange(e) {
        this.setState({
            discountDesc: e.target.value
        });
    }

    onAmountChange(e) {
        this.setState({
            discountAmount: e.target.value
        });
    }

    onRemarksChange(e) {
        this.setState({
            discountRemarks: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            discountCouponName: this.state.discountCouponName,
            discountDesc: this.state.discountDesc,
            discountAmount: parseFloat(this.state.discountAmount),
            discountProductId: this.state.discountProductId,
            discountRemarks: this.state.discountRemarks
        };
        //console.log(obj)
        Axios.post('https://onlineshoppingcartsystemsliit.herokuapp.com/api/discounts/add', obj)
            .then(res => {
                alert(res.data);
            })
            .catch(err => {console.log('Error from client: ' + err)});

        this.props.history.push('/product/discount');
    }

    render() {
        return(
            <div className="container pt-3 mt-3 mb-5" >
                <div className="card card-body my-0 bg-light">
                    <form onSubmit={this.onUpdate}>

                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <h2 className="text-capitalize text-center mt-3 mb-2">Add Discount to Product</h2>
                                <br/>
                                <br />


                                <label>Discount Coupon Name : </label>
                                <input id="discountCouponName" type="text" className="form-control text-capitalize"
                                       maxLength="30"
                                       placeholder="Enter Discount Coupon Name"
                                       onChange={this.onNameChange}
                                       value={this.state.discountCouponName} />
                                <br/>
                                <label>Description : </label>
                                <input id="discountDesc" type="text" className="form-control"
                                       maxLength="100"
                                       placeholder="Enter Discount Description"
                                       onChange={this.onDescChange}
                                       value={this.state.discountDesc} />
                                <br />
                                <label>Discount Amount : </label>
                                <input id="discountAmount" type="number" className="form-control text-capitalize"
                                       maxLength="12" pattern="[0-9]*"
                                       placeholder="Enter Discount Amount"
                                       onChange={this.onAmountChange}
                                       value={this.state.discountAmount} />
                                <br />
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Product Id : </label>
                                        <input id="discountProductId" type="text" className="form-control"
                                               maxLength="50"
                                               value={this.state.discountProductId}
                                               disabled />
                                        <br/>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Product Name : </label>
                                        <input id="discountProductId" type="text" className="form-control"
                                               maxLength="50"
                                               value={this.state.discountProductName}
                                               disabled />
                                        <br/>
                                    </div>
                                </div>

                                <label>Remarks : </label>
                                <textarea id="productRemarks" className="form-control text-capitalize"
                                          maxLength="50"
                                          placeholder="Enter Remarks"
                                          onChange={this.onRemarksChange}
                                          value={this.state.discountRemarks} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <button type="submit" className="btn btn-block btn-success mt-3"
                                        id="btnUpdate"
                                        onClick={this.onSubmit}
                                >Submit</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

}

export default AddDiscount