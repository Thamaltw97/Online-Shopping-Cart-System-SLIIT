import React, {useState} from "react";
import Axios from "axios";

function AddCategoryPage(props) {

    const [categoryNameValue, setCategoryNameValue] = useState("");
    const [categoryDescValue, setCategoryDescValue] = useState("");

    const onCategoryNameValueChange = (e) => {
        setCategoryNameValue(e.currentTarget.value);
    };
    const onCategoryDescValueChange = (e) => {
        setCategoryDescValue(e.currentTarget.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();

        if (!categoryNameValue) {
            return alert('Fill all the relevant fields first !');
        }

        const categoryObj = {
            categoryName: categoryNameValue,
            categoryDesc: categoryDescValue,
        };

        console.log(categoryObj)

        Axios.post('http://localhost:5000/api/categories/add', categoryObj)
            .then(res => {
                alert(res.data);
                props.history.push('/admin/categoryHome');
            })
            .catch(err => {
                alert('Error from client: ' + err);
            });
    };

    return(
        <div className="container pt-3 mt-3 mb-5" >
            <div className="card card-body my-0 bg-light">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2 className="text-capitalize text-center mt-3 mb-2">Add Category</h2>
                            <br/>
                            <br/>
                            <label>Category Name : </label>
                            <input id="categoryName" type="text" className="form-control text-capitalize"
                                   maxLength="30"
                                   onChange={onCategoryNameValueChange}
                                   value={categoryNameValue}/>
                            <br/>
                            <label>Category Description : </label>
                            <input id="categoryDesc" type="text" className="form-control"
                                   maxLength="30"
                                   onChange={onCategoryDescValueChange}
                                   value={categoryDescValue}/>
                            <br/>
                        </div>
                        </div>
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
}

export default AddCategoryPage