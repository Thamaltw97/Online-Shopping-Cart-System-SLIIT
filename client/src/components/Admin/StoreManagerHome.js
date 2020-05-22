import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const StoreManager = props => (
    <tr>
        <td>{props.storeManager.displayName}</td>
        <td>{props.storeManager.email}</td>
        <td>
            <Link to={"/admin/storeManagerHome/edit/"+props.storeManager._id}>Edit</Link>
        </td>
    </tr>
);

class StoreManagerHome extends Component{

    constructor(props) {
        super(props);
        this.state = {
            storeManagers: [],
        };
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/api/users/getstoremanagers')
            .then(response => {
                this.setState({storeManagers: response.data.storemanagers});
                console.log(this.state.storeManagers)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        Axios.get('http://localhost:5000/api/users/getstoremanagers')
            .then(response => {
                this.setState({storeManagers: response.data.storemanagers});
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    storeManagerList() {
         return this.state.storeManagers.map(function(currentStoreManager, index){
             return <StoreManager storeManager={currentStoreManager} key={index} />
         })
    }

    nextAddNewStoreManager() {
        this.props.history.push('/admin/storeManagerHome/upload');
    }

    render() {

        return (
            <>
                <div style={{ width: '75%', margin: '3rem auto' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Manage Store Managers <span className="fa fa-users"></span></h2>
                    </div>
                    <br />
                    <br />
                    <div className="row">
                        <div className="col-md-5">
                            <h3>Store Managers List</h3>
                        </div>
                        <div className="col-md-3"><p> </p></div>
                        <div className="col-md-4" align='right'>
                            <button className="btn btn-success"
                                    id="btnAddNewStoreManager"
                                    onClick={() => this.nextAddNewStoreManager('/admin/storeManagerHome/upload')}>
                                <i className="fa fa-plus"></i>
                                Add New Store Manager
                            </button>
                            <span>  </span>
                        </div>
                    </div>

                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        { this.storeManagerList() }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default StoreManagerHome;