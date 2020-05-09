import React, {useState} from 'react';
import DropZone from 'react-dropzone';
import Axios from 'axios';
//{ FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Icon from 'antd';

function ImageUpload(props) {

    const [Images, setImages] = useState([]);

    const onDrop = (files) => {

        let formData =  new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);

        Axios.post('http://localhost:5000/api/products/uploadimage', formData, config)
        .then(res => {
            //console.log(res.data);
            if(res.data.success){

                setImages([...Images, res.data.image]);
                props.refreshFunction([...Images, res.data.image]);

            } else {
                alert('Failed to save the image in the server !');
            }
        })
    };

    const onDelete = (image) => {

        const currentIndex = Images.indexOf(image);

        let newImages = [...Images];
        newImages.splice(currentIndex, 1);

        setImages(newImages);
        props.refreshFunction(newImages);

    };

    return (
        <div style={{ display:'flex', justifyContent:'space-between' }}>
            <DropZone
                onDrop={onDrop}
                multiple={false}
                maxSize={8000000000}
            >
                {({getRootProps, getInputProps}) => (
                    <div style={{ width:'250px', height:'200px', border:'2px solid lightgray', display:'flex', alignItem:'center', justifyContent:'center' }}
                         {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <i style={{ fontSize: '3rem', marginTop: '55px' }} ><span className="fa fa-upload"></span></i>
                    </div>
                )}
            </DropZone>

            <div style={{ display:'flex', width:'200px', height:'250px', overflowX: 'scroll' }} >

                {Images.map((image, index) =>(
                    <div onClick={() => onDelete(image)} key={index}>
                        <img style={{ minWidth: '200px', width: '200px', height: '250px'}}
                             src={`http://localhost:5000/${image}`}
                             alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>
            
        </div>
    );

}

export default ImageUpload