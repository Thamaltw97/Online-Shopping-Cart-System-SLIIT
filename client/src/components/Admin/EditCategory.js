import React, {Component} from "react";
import Axios from "axios";

class EditCategory extends Component{

    constructor(props) {
        super(props);

        this.onCategoryNameChange = this.onCategoryNameChange.bind(this);
        this.onCategoryDescChange = this.onCategoryDescChange.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.state = {
            categoryName: '',
            categoryDesc: '',
            categoryId: ''
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/categories/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    categoryName: response.data.categoryName,
                    categoryDesc: response.data.categoryDesc,
                    categoryId: this.props.match.params.id
                });
                console.log(this.state)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    onCategoryNameChange(e) {
        this.setState({
            categoryName: e.target.value
        });
    }

    onCategoryDescChange(e) {
        this.setState({
            categoryDesc: e.target.value
        });
    }

    onUpdate(e) {
        e.preventDefault();
        const obj = {
            categoryName: this.state.categoryName,
            categoryDesc: this.state.categoryDesc,
        };
        Axios.put('http://localhost:5000/api/categories/update/'+this.state.categoryId, obj)
            .then(res => {
                if (res.data){
                    alert(res.data);
                } else {
                    alert('Error from server: '+ res.data.err);
                }
            })
            .catch(err => {console.log('Error from client: ' + err)});
        this.props.history.push('/admin/categoryHome');
    }

    onDelete(e) {
        e.preventDefault();
        Axios.delete('http://localhost:5000/api/categories/delete/'+ this.state.categoryId)
            .then(res => {
                if (res.data) {
                    alert(res.data);
                    console.log(res.data.success);
                } else {
                    alert('Error from server: ' + res.data.err);
                }
            })
            .catch(err => {
                console.log('Error from client: ' + err)
            });
        this.props.history.push('/admin/categoryHome');
    }

    render() {
        return (
            <>
                <div className="container pt-3 mt-3 mb-5" >
                    <div className="card card-body my-0 bg-light">
                        <form onSubmit={this.onUpdate}>
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <h2 className="text-capitalize text-center mt-3 mb-2">Edit Store Manager <span className= "fa fa-pencil-square-o"></span></h2>
                                    <br/>
                                    <br />
                                    <label>Category Name : </label>
                                    <input id="categoryName" type="text" className="form-control text-capitalize"
                                           maxLength="30"
                                           onChange={this.onCategoryNameChange}
                                           value={this.state.categoryName} />
                                    <br/>
                                    <label>Category Description : </label>
                                    <input id="categoryDesc" type="text" className="form-control text-capitalize"
                                           maxLength="100"
                                           onChange={this.onCategoryDescChange}
                                           value={this.state.categoryDesc} />
                                    <br />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-block btn-primary mt-3"
                                            id="btnUpdate"
                                            onClick={this.onUpdate}
                                    >Update</button>
                                </div>
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-block btn-danger mt-3"
                                            id="btnDelete"
                                            onClick={this.onDelete.bind(this.state.categoryId)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
export default EditCategory;