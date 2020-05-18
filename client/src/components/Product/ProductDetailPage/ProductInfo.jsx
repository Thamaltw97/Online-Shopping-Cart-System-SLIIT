import 'antd/es/descriptions/style/index.css';
import 'antd/es/button/style/index.css';
import '../StylesProduct.css'
import React, {useEffect, useState} from "react";
import {Button, Descriptions} from "antd";
import Axios from "axios";

function ProductInfo(props){

    const [Product, setProduct] = useState([]);
    const [PrintAmount, setPrintAmount] = useState(0);
    const [booVal, setBooVal] = useState(false);

    useEffect(() => {
        setProduct(props.detail)

    },[props.detail]);


    useEffect(() => {
        Axios.get('http://localhost:5000/api/discounts/productdiscount/' + Product._id)
            .then(response => {
                if (response.data.length > 0){
                    let x = parseFloat(response.data[0].discountAmount);
                    let finalAmount = parseFloat(Product.productUnitPrice) - x;
                    setPrintAmount(finalAmount)
                    setBooVal(true)
                } else {
                    setPrintAmount(Product.productUnitPrice)
                }

            })
            .catch(function (err) {
                console.log(err)
            });

    },[Product]);



    const test = () => {
        if (booVal){
            return <div><span id="spanBeforePrice">{Product.productUnitPrice}</span><span id="spanAfterPrice"> {PrintAmount}</span></div>
        } else {
            //console.log(PrintAmount)
            return  <span id="test">{PrintAmount}</span>
        }
    };

    const btnSCart = (e) => {
        //Enter code for adding item to shopping cart (Should pass user id and product id)
    };

    const btnWishList = (e) => {
        e.preventDefault();

        const wishListObj = {
            productName: Product.productName,
            productDesc: Product.productDesc,
            productSize: Product.productSize,
            productColour: Product.productColour,
            productUnitPrice: Product.productUnitPrice,
            wishUserId: localStorage.getItem('user-id')
        };

        Axios.post('http://localhost:5000/api/wishlists/add', wishListObj)
            .then(res => {
                alert(res.data);
                //props.history.push('/wishlist/wishlist');
            })
            .catch(err => {
                alert('Error: ' + err);
            });
    };

    const btnAddComment = (e) => {
        //Enter code to add comment (Should pass product id and user id)
    };

    // const nextCommentPath = () => {
    //     //props.history.push('/comment/view');
    // };

    return (
        <div>
            <Descriptions title="Product Information">
                <Descriptions.Item label="Price">
                    { test() }
                </Descriptions.Item>
                <Descriptions.Item label="Colour">{Product.productColour}</Descriptions.Item>
                <Descriptions.Item label="Size">{Product.productSize}</Descriptions.Item>
                <Descriptions.Item label="Description">{Product.productDesc}</Descriptions.Item>
                {/*<br />*/}
                {/*<br />*/}
                {/*<br />*/}

            </Descriptions>
            <br />
            <br />
            <br />
            {localStorage.getItem('user-role') === 'user' ?
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button size="large" shape="round" type="danger"
                                        onClick={btnSCart}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button size="large" shape="round" type="primary"
                                    onClick={btnWishList}
                                >
                                    Add to Wishlist
                                </Button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button size="large" shape="round" type="danger"
                                        onClick={btnAddComment}
                                >
                                    Add My Comment
                                </Button>
                            </div>
                        </div>
                        {/*<div className="col-md-6">*/}
                        {/*    <div style={{display: 'flex', justifyContent: 'center'}}>*/}
                        {/*        <Button size="large" shape="round" type="primary"*/}
                        {/*                onClick={nextCommentPath('/comment/view')}*/}
                        {/*        >*/}
                        {/*            View all comments*/}
                        {/*        </Button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                : null
            }
        </div>
    )

}

export default ProductInfo;