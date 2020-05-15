import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Category  = props => (
    <tr>
        <td>{props.category.categoryName}</td>
        <td>{props.category.categoryDesc}</td>
        <td>
            <Link to={"/category/edit/"+props.category._id}>Edit</Link>
        </td>
        {/*<td>*/}
        {/*    /!*<Link to={"/category/delete/"+props.category._id}>Delete</Link>*!/*/}
        {/*    <button type="submit" onClick={this.testDelete(props.category._id)} >Delete</button>*/}
        {/*</td>*/}
    </tr>
);

class AdDashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/categories/')
            .then(response => {
                this.setState({categories: response.data});
                console.log(this.state.categories)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        Axios.get('http://localhost:5000/api/categories/')
            .then(response => {
                this.setState({categories: response.data});
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    // testDelete(e){
    //      e.preventDefault();
    //     Axios.delete('http://localhost:5000/api/categories/delete/' + x)
    //         .then(res => {
    //                 //alert(res.data);
    //                 console.log(res.data)
    //         })
    //         .catch(err => {
    //             console.log('Error from client: ' + err)
    //         });
    //     this.props.history.push('/admin');
    // }

    categoryList() {
        return this.state.categories.map(function(currentCategory, index){
            return <Category category={currentCategory} key={index} />
        })
    }

    nextAddNewCategory() {
        this.props.history.push('/category/upload');
    }

    render() {

        return (
            <>
                <div style={{ width: '75%', margin: '3rem auto' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Administrator Dashboard  <span className="fas fa-air-freshener"></span></h2>
                    </div>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col-md-3">
                            <h3>Category List</h3>
                        </div>
                        <div className="col-md-5"><p> </p></div>
                        <div className="col-md-4">
                            <button className="btn" id="btnAddNewCategory" onClick={() => this.nextAddNewCategory('/category/upload')}><i className="fa fa-plus"></i> Add New Category</button>
                            <span>  </span>
                        </div>
                    </div>

                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Category Description</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.categoryList() }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default AdDashboard;