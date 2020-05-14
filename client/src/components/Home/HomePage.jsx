import 'antd/es/card/style/index.css';
import 'antd/es/col/style/css';
import 'antd/es/row/style/css';
import ImageSlider from "./ImageSlider";
//import ProductsById from "./Sections/ProductsById";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Row, Col, Card} from "antd";
const { Meta } = Card;


function HomePage() {

    const [Products, setProducts] = useState([]);
    // const [Filters, setFilters] = useState({
    //     categories: []
    // });

    useEffect(() => {

        Axios.get('http://localhost:5000/api/products/')
            .then(response => {
                if (response.data.success){

                    setProducts(response.data.products);

                    console.log(response.data.products);

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
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.productImages} /></a>}
            >

                <Meta
                    title={product.productName}
                    description={`LKR.${product.productUnitPrice}`}
                />
            </Card>
        </Col>
    });

    // const handleFilters = (filters, categ) => {
    //     console.log(filters)
    // };

    return(
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h4>Fashion At Your Fingertips <span className="fas fa-hat-cowboy"></span></h4>
            </div>

            {/*<ProductsById*/}
            {/*    handleFilters={filters => handleFilters(filters, "categories")}*/}
            {/*/>*/}

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h3>No posts yet...</h3>
                </div>  :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>
        </div>
    )

}

export default HomePage;