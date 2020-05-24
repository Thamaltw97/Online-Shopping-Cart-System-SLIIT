import 'antd/es/card/style/index.css';
import 'antd/es/col/style/css';
import 'antd/es/row/style/css';
import ImageSlider from "./ImageSlider";
import RadioCategory from "./RadioCategory";
//import ProductsById from "./Sections/ProductsById";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Row, Col, Card} from "antd";
import {Link} from "react-router-dom";
const { Meta } = Card;


function HomePage() {

    const [Products, setProducts] = useState([]);

    useEffect(() => {

        Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/products/')
            .then(response => {
                if (response.data.success){

                    setProducts(response.data.products);

                    //console.log(response.data.products);

                } else {
                    alert('ERROR: ' + response.data.err + 'from server!')
                }
            })
            .catch(err => {
                console.log('Error' + err + 'from client!')
            });
    }, []);


    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                hoverable={true}
                cover={<Link to={`/product/${product._id}`}><ImageSlider images={product.productImages} /></Link>}
            >

                <Meta
                    title={product.productName}
                    description={`LKR.${product.productUnitPrice}/=    Categ.: ${product.productCategory}`}
                />
            </Card>
        </Col>
    });


    const handleFilters = (category) => {

        // console.log(category);

        if (category === 'Any'){
            Axios.get('https://onlineshoppingcartsystemsliit.herokuapp.com/api/products/')
                .then(response => {
                    if (response.data.success){

                        setProducts(response.data.products);

                        //console.log(response.data.products);

                    } else {
                        alert('ERROR: ' + response.data.err + 'from server!')
                    }
                })
                .catch(err => {
                    console.log('Error' + err + 'from client!')
                });
        } else {
            Axios.post('https://onlineshoppingcartsystemsliit.herokuapp.com/api/products/categorywise/', {productCategory: category})
                .then(response => {
                    if (response.data.success){

                        setProducts(response.data.products);

                        //console.log(response.data.products);

                    } else {
                        alert('ERROR: ' + response.data.err + 'from server!')
                    }
                })
                .catch(err => {
                    console.log('Error' + err + 'from client!')
                });
        }



    };

    return(
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Fashion At Your Fingertips <span className="fas fa-hat-cowboy"></span></h2>
            </div>
            <br />

            {/*Radio buttons to get product by category*/}
            <RadioCategory handleFilters={filters => handleFilters(filters)} />

            <br />
            <div className="blink_me"><b>*View products to check amazing discounts*</b></div>
            <br />
            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h3>No products yet...</h3>
                </div>  :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br />
            <br />
        </div>
    )

}

export default HomePage;
