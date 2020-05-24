import React, {Component} from "react";
import Axios from "axios";

class EditCart extends Component{

    constructor(props) {
        super(props);

        // this.onCategoryNameChange = this.onCategoryNameChange.bind(this);
        this.onQtyChange = this.onQtyChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);

        this.state = {
            itemId: this.props.match.params.id,
            quantity: 0
        }
    }

    onQtyChange(e) {
        this.setState({
            quantity: e.target.quantity
        });
    }

    componentDidMount() {
        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/cart/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    quantity: response.data.quantity
                });
                console.log(response.data)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    onUpdate(e) {
        e.preventDefault();
        const obj = {
            quantity: this.state.quantity,
        };
        Axios.put('https://onlineshoppingcartsystemsliit.herokuapp.com/api/cart/update/' + this.state.itemId, obj)
            .then(res => {
                if (res.data){
                    alert(res.data);
                } else {
                    alert('Error from server: '+ res.data);
                }
            })
            .catch(err => {console.log('Error from client: ' + err)});
        this.props.history.push('/cart');
    }

    render() {
        return(
            <div className="container pt-3 mt-3 mb-5" >
                <div className="card card-body my-0 bg-light">
                    <form onSubmit={this.onUpdate}>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <h2 className="text-capitalize text-center mt-3 mb-2">Edit Cart Item <span className= "fa fa-pencil-square-o"></span></h2>
                                <br/>
                                <br />
                                <label>Item Id : </label>
                                <input id="categoryName" type="text" className="form-control text-capitalize"
                                       maxLength="30" disabled
                                       // onChange={this.onCategoryNameChange}
                                       value={this.state.itemId}
                                />
                                <br/>
                                <label>Item Quantity : </label>
                                <input id="itemQuantity" type="number" className="form-control text-capitalize"
                                       maxLength="12" min="1"
                                       placeholder="Enter Item Quantity"
                                       onChange={this.onQtyChange}
                                       value={this.state.quantity} />
                                <br />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <button type="submit" className="btn btn-block btn-primary mt-3"
                                        id="btnUpdate"
                                        onClick={this.onUpdate}
                                >Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
export default EditCart;