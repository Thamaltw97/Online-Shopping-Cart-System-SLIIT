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
    const [QuantityValue, setQuantityValue] = useState("");
    const [TotalValue, setTotalValue] = useState("");
    const [CommentValue, setCommentValue] = useState("");
    const [SuggestionsValue, setSuggestionsValue] = useState("");

    const onCommentChange = (e) => {
        setCommentValue(e.currentTarget.value);
    };

    const onSuggestionsChange = (e) => {
        setSuggestionsValue(e.currentTarget.value);
    };

    const onQuantityChange = (e) => {
        setQuantityValue(e.currentTarget.value);
    };

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

        e.preventDefault();
        let total = 0;
        if (booVal){
            total = PrintAmount * parseFloat(QuantityValue);
            //console.log(PrintAmount)
        } else {
            total = parseFloat(Product.productUnitPrice) * parseFloat(QuantityValue);
        }

        setTotalValue(total);
        // console.log(total);


        const cartObj = {
            productName: Product.productName,
            productDesc: Product.productDesc,
            productSize: Product.productSize,
            productColour: Product.productColour,
            productUnitPrice: Product.productUnitPrice,
            quantity: QuantityValue,
            totalPrice: total,
            cartUserId: localStorage.getItem('user-id')
        };

        Axios.post('http://localhost:5000/api/cart/add', cartObj)
            .then(res => {
                alert(res.data);
                setQuantityValue('');
                // props.history.push('/cart');
            })
            .catch(err => {
                alert('Error: ' + err);
            });
    };

    const btnWishList = (e) => {
        e.preventDefault();
//let x = parseFloat(Product.productUnitPrice) * parseFloat('textbox value');
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

    const onSubmitComment = (e) => {
        //Enter code to add comment (Should pass product id and user id)

        e.preventDefault();

        if(!CommentValue) {
            return alert('Fill Comment section to submit !');
        }

        const commentObj = {
            comment: CommentValue,
            suggestions: SuggestionsValue,
            productId: Product._id,
            userId: localStorage.getItem('user-id')
        };

        Axios.post('http://localhost:5000/api/comments/add', commentObj)
            .then(res => {
                alert(res.data);
                setCommentValue('');
                setSuggestionsValue('');

            })
            .catch(err => {
                alert('Error from client: ' + err);
            });

    };


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

                            <label>Quantity : </label>
                            <input id="quantity" type="text" className="form-control "
                                   maxLength="50"
                                   placeholder="1"
                                   onChange={onQuantityChange}
                                   value={QuantityValue} />
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button size="large" shape="round" type="danger"
                                        onClick={btnSCart}
                                >
                                    Add to Cart<i className="fa fa-shopping-cart" aria-hidden="true"/>
                                </Button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button size="large" shape="round" type="primary"
                                    onClick={btnWishList}
                                >
                                    Add to Wishlist<i className="fa fa-heart" aria-hidden="true"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button size="large" shape="round" type="danger"
                                        //onClick={btnAddComment}
                                        data-toggle="modal" data-target="#myModal"
                                >
                                    Add My Comment
                                </Button>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Comment</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-10">
                                            <label>Comment : </label>
                                            <textarea id="comment" className="form-control"
                                                      maxLength="200"
                                                      placeholder="Enter comment"
                                                      onChange={onCommentChange}
                                                      value={CommentValue}
                                            />
                                            <br />
                                            <label>Suggestions : </label>
                                            <textarea id="suggestions" className="form-control"
                                                      maxLength="200"
                                                      placeholder="Enter your suggestions"
                                                      onChange={onSuggestionsChange}
                                                      value={SuggestionsValue}
                                            />
                                            <br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <button type="submit" className="btn btn-block btn-success mt-3"
                                                    id="btnSubmitComment"
                                                    onClick={onSubmitComment}
                                            >Submit</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default btn-danger" data-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                : null
            }
        </div>
    )

}

export default ProductInfo;
