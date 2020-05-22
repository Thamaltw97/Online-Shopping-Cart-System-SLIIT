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

                <div style={{ textAlign: 'center' }}>
                    <h2>Store Manager Dashboard  <span className="fas fa-air-freshener"></span></h2>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <h3>Discount List</h3>
                    </div>
                </div>

                <table className="table table-striped table100" style={{ marginTop: 20 }}>
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