import React, {useState} from "react";

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

function UploadProductPage() {

    const [NameValue, setNameValue] = useState("");
    const [DescValue, setDescValue] = useState("");
    const [BrandValue, setBrandValue] = useState("");
    const [ColourValue, setColourValue] = useState("");
    const [QtyValue, setQtyValue] = useState();
    const [UPriceValue, setUPriceValue] = useState();

    const onNameChange = (e) => {
        setNameValue(e.currentTarget.value);
    };

    const onDescChange = (e) => {
        setDescValue(e.currentTarget.value);
    };

    const onBrandChange = (e) => {
        setBrandValue(e.currentTarget.value);
    };

    const onColourChange = (e) => {
        setColourValue(e.currentTarget.value);
    };

    const onQtyChange = (e) => {
        setQtyValue(e.currentTarget.value);
    };

    const onUPriceChange = (e) => {
        setUPriceValue(e.currentTarget.value);
    };

    //render() {
    return (
        <div className="container pt-3 mt-5 mb-5" >
            <div className="card card-body my-0 bg-light">
                <form onSubmit>

                    {/*DropZone*/}

                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h3 className="text-capitalize text-center">Add New Product</h3>
                            <br/>
                            <label>Product Name : </label>
                            <input id="productName" type="text" className="form-control text-capitalize" maxLength="30" placeholder="Enter Product Name"
                                   onChange={onNameChange}
                                   value={NameValue} />
                            <br/>
                            <label>Product Description : </label>
                            <input id="productDesc" type="text" className="form-control text-capitalize" maxLength="100" placeholder="Enter Product Description"
                                   onChange={onDescChange}
                                   value={DescValue} />
                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <label style={{ marginRight: '10px' }}>Product Category : </label>
                                    <select className="form-control">
                                        {Categories.map(item => (
                                            <option key={item.key} value={item.key}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label>Product Size : </label>
                                    {/*<input id="productSize" type="text" className="form-control text-capitalize" maxLength="20" placeholder="Enter Product Size"*/}
                                    {/*       onChange={onSizeChange}*/}
                                    {/*       value={SizeValue} />*/}
                                    <select className="form-control">
                                        {Sizes.map(item => (
                                            <option key={item.key} value={item.key}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <label>Product Brand : </label>
                            <input id="productBrand" type="text" className="form-control text-capitalize" maxLength="30" placeholder="Enter Product Brand"
                                   onChange={onBrandChange}
                                   value={BrandValue} />
                            <br />
                            <label>Product Colour : </label>
                            <input id="productColour" type="text" className="form-control text-capitalize" maxLength="30" placeholder="Enter Product Colour"
                                   onChange={onColourChange}
                                   value={ColourValue} />
                            <br />
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Product Quantity : </label>
                                    <input id="productSize" type="text" className="form-control text-capitalize" maxLength="12" placeholder="Enter Product Quantity"
                                           onChange={onQtyChange}
                                           value={QtyValue} />
                                </div>
                                <div className="col-md-6">
                                    <label>Product Unit Price : </label>
                                    <input id="productSize" type="text" className="form-control text-capitalize" maxLength="12" placeholder="Enter Product Unit Price"
                                           onChange={onUPriceChange}
                                           value={UPriceValue} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <button type="submit" className="btn btn-block btn-primary mt-3" id="btnSubmit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    //}

}

export default UploadProductPage