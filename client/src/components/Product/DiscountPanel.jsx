import React from "react";
import {Link} from "react-router-dom";
import Axios from "axios";

const Discount  = props => (
    <tr>
        <td>{props.discount.discountCouponName}</td>
        <td>{props.discount.discountDesc}</td>
        <td>{props.discount.discountAmount}</td>
        <td>
            <Link to={"/discount/edit/"+props.discount._id}>Edit</Link>
        </td>
    </tr>
);

class DiscountPanel extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            discounts: []
            //editModelShow: false
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/discounts/')
            .then(response => {
                this.setState({discounts: response.data});
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        Axios.get('http://localhost:5000/api/discounts/')
            .then(response => {
                this.setState({discounts: response.data});
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    discountList() {
        return this.state.discounts.map(function(currentCoupon, index){
            return <Discount discount={currentCoupon} key={index} />
        })
    }


    render() {
        return(
            <div style={{ width: '75%', margin: '3rem auto' }}>
                {/*<div className="row">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <div className="row">*/}

                {/*            <form onSubmit={}>*/}

                {/*                <div className="row">*/}
                {/*                    <div className="col-md-2"></div>*/}
                {/*                    <div className="col-md-8">*/}
                {/*                        <h2 className="text-capitalize text-center mt-3 mb-2">Add New Discount Coupon</h2>*/}
                {/*                        <br/>*/}
                {/*                        <br />*/}

                {/*                        <label>Discount Coupon Name : </label>*/}
                {/*                        <input id="discountName" type="text" className="form-control text-capitalize"*/}
                {/*                               maxLength="30"*/}
                {/*                               placeholder="Enter Coupon Name"*/}
                {/*                               onChange={this.onNameChange}*/}
                {/*                               value={this.state.productName} />*/}
                {/*                        <br/>*/}
                {/*                        <label>Discount Description : </label>*/}
                {/*                        <input id="discountDesc" type="text" className="form-control text-capitalize"*/}
                {/*                               maxLength="100"*/}
                {/*                               placeholder="Enter Discount Description"*/}
                {/*                               onChange={this.onDescChange}*/}
                {/*                               value={this.state.productDesc} />*/}
                {/*                        <br />*/}
                {/*                        <label>Discount Amount : </label>*/}
                {/*                        <input id="productUPrice" type="number" className="form-control text-capitalize"*/}
                {/*                               maxLength="12" pattern="[0-9]*"*/}
                {/*                               placeholder="Enter Discount Amount"*/}
                {/*                               onChange={this.onUPriceChange}*/}
                {/*                               value={this.state.productUnitPrice} />*/}
                {/*                        <br />*/}
                {/*                        <label style={{ marginRight: '10px' }}>Product : </label>*/}
                {/*                        <select className="form-control" onChange={}>*/}
                {/*                            /!*{Categories.map(item => (*!/*/}
                {/*                            /!*    <option key={item.key} value={item.value}>*!/*/}
                {/*                            /!*        {item.value}*!/*/}
                {/*                            /!*    </option>*!/*/}
                {/*                            /!*))}*!/*/}
                {/*                        </select>*/}
                {/*                        <br />*/}
                {/*                        <label>Remarks : </label>*/}
                {/*                        <textarea id="discountRemarks" className="form-control text-capitalize"*/}
                {/*                                  maxLength="50"*/}
                {/*                                  placeholder="Enter Remarks"*/}
                {/*                                  onChange={}*/}
                {/*                                  value={} />*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <br />*/}
                {/*                <div className="row">*/}
                {/*                    <div className="col-md-2"></div>*/}
                {/*                    <div className="col-md-8">*/}
                {/*                        <button type="submit" className="btn btn-block btn-primary mt-3"*/}
                {/*                                id="btnSubmit"*/}
                {/*                                onClick={onSubmit}*/}
                {/*                        >Submit</button>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*            </form>*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-md-6">*/}

                {/*    </div>*/}
                {/*</div>*/}

                <div style={{ textAlign: 'center' }}>
                    <h2>Store Manager Dashboard  <span className="fas fa-air-freshener"></span></h2>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <h3>Discount List</h3>
                    </div>
                    <div className="col-md-5"><p> </p></div>
                    <div className="col-md-4">
                        <button className="btn" id="btnAddNewDiscount"
                                // onClick={() => this.nextAddPath('/discount/add')}
                        ><i className="fa fa-plus"></i> Add New Discount</button>
                        </div>
                </div>

                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Discount Coupon Name</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.discountList() }
                    </tbody>
                </table>

            </div>
        )
    }



}

export default DiscountPanel;