import React, {Component} from "react";
import Axios from "axios";

class EditDiscount extends Component{

    constructor(props) {
        super(props);

        this.onNameChange = this.onNameChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onRemarksChange = this.onRemarksChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.state = {
            discountCouponName: '',
            discountDesc: '',
            discountAmount: '',
            discountId: '',
            discountRemarks: ''
        }
    }

    componentDidMount() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/discounts/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    discountCouponName: response.data.discount.discountCouponName,
                    discountDesc: response.data.discount.discountDesc,
                    discountAmount: response.data.discount.discountAmount,
                    discountRemarks: response.data.discount.discountRemarks,
                    discountId: this.props.match.params.id
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

    onUpdate(e) {
        e.preventDefault();
        const obj = {
            discountCouponName: this.state.discountCouponName,
            discountDesc: this.state.discountDesc,
            discountAmount: this.state.discountAmount,
            discountRemarks: this.state.discountRemarks
        };
        Axios.put('https://onlineshoppingcartsystemsliit.herokuapp.com/api/discounts/update/' + this.state.discountId, obj)
            .then(res => {
                if (res.data.success){
                    alert(res.data.successMsg);
                } else {
                    alert(res.data.err);
                }
            })
            .catch(err => {console.log('Error from client: ' + err)});

        this.props.history.push('/product/discount');
    }

    onDelete(e) {
        e.preventDefault();
        Axios.delete('https://onlineshoppingcartsystemsliit.herokuapp.com/api/discounts/delete/' + this.state.discountId)
            .then(res => {
                if (res.data.success) {
                    alert(res.data.delSuccessMsg);
                    //console.log('Successfully deleted.')
                } else {
                    alert(res.data.err);
                }
            })
            .catch(err => {
                console.log('Error from client: ' + err)
            });
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
                                <h2 className="text-capitalize text-center mt-3 mb-2">Edit Discount Coupon</h2>
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
                                <br />
                                <label>Discount Amount : </label>
                                <input id="discountAmount" type="number" className="form-control text-capitalize"
                                       maxLength="12" pattern="[0-9]*"
                                       placeholder="Enter Discount Amount"
                                       onChange={this.onAmountChange}
                                       value={this.state.discountAmount} />
                                <br />
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
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-block btn-success mt-3"
                                        id="btnUpdate"
                                        onClick={this.onUpdate}
                                >Update Discount</button>
                            </div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-block btn-danger mt-3"
                                        id="btnDelete"
                                        onClick={this.onDelete}
                                >Delete Discount</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

}

export default EditDiscount;