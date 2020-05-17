import 'antd/es/col/style/css';
import 'antd/es/row/style/css';
import React from "react";
import {Row, Col} from "antd";
import Axios from "axios";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

class DetailProduct extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Product: [],
            editModelShow: false
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/products/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    Product: response.data.product,
                    productId: this.props.match.params.id
                });
                //console.log(this.state.Product)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    componentDidUpdate() {
        Axios.get('http://localhost:5000/api/products/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    Product: response.data.product,
                    productId: this.props.match.params.id
                });
                //console.log(this.state.Product)
            })
            .catch(function (err) {
                console.log(err)
            })
    }


    render() {
        return(
            <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>{this.state.Product.productName}</h1>
                </div>
                <br />

                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24} >
                        <ProductImage detail={this.state.Product}/>
                    </Col>
                    <Col lg={12} xs={24}>
                        <ProductInfo detail={this.state.Product}/>
                    </Col>
                </Row>

            </div>
        )
    }



}

export default DetailProduct;