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
                console.log(this.state.Product)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    // const productId = props.match.params.id;
    //
    // const[Product, setProduct] = useState([])
    //const[ProductId, setProductId] = useState(this.props.match.params.id);

    // useEffect(() => {
    //
    //     Axios.get('http://localhost:5000/api/products/5eaf243e51cc0624643fe428')
    //         .then(response => {
    //             if (response.data.success){
    //                 setProduct(response.data[0]);
    //                 console.log(Product);
    //                 // alert('SUCCESS!')
    //             } else {
    //                 alert('ERROR: ' + response.data.err + 'from server!')
    //             }
    //         })
    //         .catch(err => {
    //             console.log('Error' + err + 'from client!')
    //         });
    //
    // });

    // useEffect(() => {
    //     Axios.get('http://localhost:5000/api/products/'+productId)
    //         .then(response => {
    //             setProduct(response.data.product)
    //             //console.log(Product.productName)
    //         })
    //
    // },[productId])

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