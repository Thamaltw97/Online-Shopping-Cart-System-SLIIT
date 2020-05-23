import React, {useEffect, useState} from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props){

    const [Images, setImages] = useState([]);

    useEffect(() => {
        if (props.detail.productImages && props.detail.productImages.length > 0) {
            let images = [];

            props.detail.productImages && props.detail.productImages.map(item => {
                return images.push({
                    original: `https://onlineshoppingcartsystemsliit.herokuapp.com/${item}`,
                    thumbnail: `https://onlineshoppingcartsystemsliit.herokuapp.com/${item}`
                })
                //console.log(`http://localhost:5000/${item}`)
            });
            setImages(images)
        }
    }, [props.detail]);

    return (
        <div>
            <ImageGallery items={Images}/>
        </div>
    )

}

export default ProductImage;