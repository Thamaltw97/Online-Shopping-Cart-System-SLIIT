import React, {useEffect, useState} from "react";
import ImgUpload from './ImageUpload';
import './StylesProduct.css';
import Axios from "axios";

// const Categories = [
//     { key: 6, value: "Men's wear" },
//     { key: 7, value: "Women's wear" },
//     { key: 8, value: "Kid's wear" },
//     { key: 9, value: "Accessories" },
//     { key: 10, value: "Shoes" }
// ];

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
    const [BrandValue, setBrandValue] = useState("");
    const [ColourValue, setColourValue] = useState("");
    const [SizeValue, setSizeValue] = useState(0);
    const [QtyValue, setQtyValue] = useState();
    const [UPriceValue, setUPriceValue] = useState();
    const [RemarksValue, setRemarksValue] = useState("");
    const [Images, setImages] = useState([]);
    const [CategoryValue, setCategoryValue] = useState('');
    const [CategoriesValue, setCategoriesValue] = useState([]);

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

    useEffect(() => {
        Axios.get('http://localhost:5000/api/categories/')
            .then(response => {
                if (response.data.length > 0) {
                    // this.setState({
                    //     users: response.data.map(user => user.username),
                    //     username: response.data[0].username
                    // })
                    setCategoriesValue(response.data.map(categories => categories.categoryName));
                    setCategoryValue(response.data[0].categoryName);
                    // console.log(response.data[0].categoryName);

                }
            })
    },[]);
    // console.log(CategoryValue);
    // console.log(CategoriesValue);
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
                props.history.push('/product/storemanager');
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
                                    {/*<select className="form-control" onChange={onCategoryChange}>*/}
                                    {/*    {Categories.map(cat => (*/}
                                    {/*        <option key={cat.key} value={cat.value}>*/}
                                    {/*            {cat.value}*/}
                                    {/*        </option>*/}
                                    {/*    ))}*/}
                                    {/*</select>*/}
                                    <select
                                            required
                                            className="form-control"
                                            value={CategoryValue}
                                            onChange={onCategoryChange}>
                                        {
                                            CategoriesValue.map(function(Category) {
                                                return <option
                                                    key={Category}
                                                    value={Category}>{Category}
                                                </option>;
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>Product Size : </label>
                                    <select className="form-control" onChange={onSizeChange}>
                                        {Sizes.map(size => (
                                            <option key={size.key} value={size.value}>
                                                {size.value}
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