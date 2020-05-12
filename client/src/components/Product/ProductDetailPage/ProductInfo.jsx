import 'antd/es/descriptions/style/index.css';
import 'antd/es/button/style/index.css';
import React, {useEffect, useState} from "react";
import {Button, Descriptions} from "antd";

function ProductInfo(props){

    const [Product, setProduct] = useState([]);

    useEffect(() => {
        setProduct(props.detail)
    },[props.detail]);

    return (
        <div>
            <Descriptions title="Product Information">
                <Descriptions.Item label="Price">{Product.productUnitPrice}</Descriptions.Item>
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
            <div className="row">
                <div className="col-md-6">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" shape="round" type="danger"
                            // onClick
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" shape="round" type="primary"
                            // onClick
                        >
                            Add to Wishlist
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default ProductInfo;