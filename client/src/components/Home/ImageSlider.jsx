import 'antd/es/carousel/style/index.css';
import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {

    return(
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '270px'}}
                             src={`https://onlineshoppingcartsystemsliit.herokuapp.com/${image}`}
                             alt={`productImg-${index}`}/>
                    </div>
                ))}
            </Carousel>
        </div>
    )

}

export default ImageSlider;