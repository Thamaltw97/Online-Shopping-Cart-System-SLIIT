import React, {useState} from "react";
import ImgUpload from './ImageUpload';
import './StylesProduct.css';
import Axios from "axios";

const Categories = [
    { key: 1, value: "Shirts" },
    { key: 2, value: "T-Shirts" },
    { key: 3, value: "Trousers" },
    { key: 4, value: "Shorts" },
    { key: 5, value: "Sarongs" }
];

const Sizes = [
    { key: 1, value: "X-Small" },
    { key: 2, value: "Small" },
    { key: 3, value: "Medium" },
    { key: 4, value: "Large" },
    { key: 5, value: "X-Large" }
];

function UploadProductPage(props) {

    const [NameValue, setNameValue] = useState("");
    const [DescValue, setDescValue] = useState("");
    const [CategoryValue, setCategoryValue] = useState(0);
    const [BrandValue, setBrandValue] = useState("");
    const [ColourValue, setColourValue] = useState("");
    const [SizeValue, setSizeValue] = useState(0);
    const [QtyValue, setQtyValue] = useState();
    const [UPriceValue, setUPriceValue] = useState();
    const [RemarksValue, setRemarksValue] = useState("");
    const [Images, setImages] = useState([]);

    const onNameChange = (e) => {
        setNameValue(e.currentTarget.value);
    };

    const onDescChange = (e) => {
        setDescValue(e.currentTarget.value);
    };

    const onCategoryChange = (e) => {
        setCategoryValue(e.currentTarget.value);
    };

    const onBrandChange = (e) => {
        setBrandValue(e.currentTarget.value);
    };

    const onColourChange = (e) => {
        setColourValue(e.currentTarget.value);
    };

    const onSizeChange = (e) => {
        setSizeValue(e.currentTarget.value);
    };

    const onQtyChange = (e) => {
        setQtyValue(e.currentTarget.value);
    };

    const onUPriceChange = (e) => {
        setUPriceValue(e.currentTarget.value);
    };

    const onRemarksChange = (e) => {
        setRemarksValue(e.currentTarget.value);
    };

    const updateImages = (newImages) => {
        //console.log(newImages);
        setImages(newImages);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if(!NameValue || !DescValue || !BrandValue || !ColourValue
            || !QtyValue || !UPriceValue || !RemarksValue || !Images) {
            return alert('Fill all the fields first !');
        }

        const productObj = {
            productName: NameValue,
            productDesc: DescValue,
            productCategory: CategoryValue,
            productBrand: BrandValue,
            productColour: ColourValue,
            productSize: SizeValue,
            productQuantity: QtyValue,
            productUnitPrice: UPriceValue,
            productImages: Images,
            productRemarks: RemarksValue
        };

        Axios.post('http://localhost:5000/api/products/add', productObj)
            .then(res => {
                alert(res.data);
                props.history.push('/product/upload');
            })
            .catch(err => {
                alert('Error: ' + err);
            });

    };


    //render() {
    return (
        <div className="container pt-3 mt-3 mb-5" >
            <div className="card card-body my-0 bg-light">
                <form onSubmit={onSubmit}>

                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2 className="text-capitalize text-center mt-3 mb-2">Add New Product</h2>
                            <br/>
                            <br />

                            {/*DropZone*/}
                            <ImgUpload refreshFunction={updateImages} />
                            <br />
                            <br />

                            <label>Product Name : </label>
                            <input id="productName" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   placeholder="Enter Product Name"
                                   onChange={onNameChange}
                                   value={NameValue} />
                            <br/>
                            <label>Product Description : </label>
                            <input id="productDesc" type="text" className="form-control text-capitalize"
                                   maxLength="100"
                                   placeholder="Enter Product Description"
                                   onChange={onDescChange}
                                   value={DescValue} />
                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <label style={{ marginRight: '10px' }}>Product Category : </label>
                                    <select className="form-control" onChange={onCategoryChange}>
                                        {Categories.map(item => (
                                            <option key={item.key} value={item.value}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>Product Size : </label>
                                    <select className="form-control" onChange={onSizeChange}>
                                        {Sizes.map(item => (
                                            <option key={item.key} value={item.value}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <label>Product Brand : </label>
                            <input id="productBrand" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   placeholder="Enter Product Brand"
                                   onChange={onBrandChange}
                                   value={BrandValue} />
                            <br />
                            <label>Product Colour : </label>
                            <input id="productColour" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   placeholder="Enter Product Colour"
                                   onChange={onColourChange}
                                   value={ColourValue} />
                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Product Quantity : </label>
                                    <input id="productQuantity" type="number" className="form-control text-capitalize"
                                           maxLength="12" min="1"
                                           placeholder="Enter Product Quantity"
                                           onChange={onQtyChange}
                                           value={QtyValue} />
                                </div>
                                <div className="col-md-6">
                                    <label>Product Unit Price : </label>
                                    <input id="productUPrice" type="number" className="form-control text-capitalize"
                                           maxLength="12" pattern="[0-9]*"
                                           placeholder="Enter Product Unit Price"
                                           onChange={onUPriceChange}
                                           value={UPriceValue} />
                                </div>
                            </div>
                            <br />
                            <label>Remarks : </label>
                            <textarea id="productRemarks" className="form-control text-capitalize"
                                   maxLength="50"
                                   placeholder="Enter Remarks"
                                   onChange={onRemarksChange}
                                   value={RemarksValue} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <button type="submit" className="btn btn-block btn-primary mt-3"
                                    id="btnSubmit"
                                    onClick={onSubmit}
                            >Submit</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
    //}

}

export default UploadProductPage