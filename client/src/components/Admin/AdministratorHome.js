import React, { Component } from "react";

class AdministratorHome extends  Component{

     categoryHome() {
         this.props.history.push('/admin/categoryHome');
     };
    smHome() {
        this.props.history.push('/admin/storeManagerHome');
    };

    render() {
        return(
            <div className="container pt-3 mt-3 mb-5">
                <div className="card card-body my-0 bg-light">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <h2 className="text-capitalize text-center mt-3 mb-2">
                                Administrator Home &nbsp;
                                <span className="fa fa-home"></span>
                            </h2>
                            <br/><br/><br/><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <button type="button"
                                    className="btn btn-block btn-lg btn-info mt-3"
                                    id="btnCategoryHome"
                                    onClick={() => this.categoryHome('/admin/categoryHome')}>
                                <i className="fa fa-th-list"></i>&nbsp;
                                Manage Categories
                            </button>
                            <br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <button type="button"
                                    className="btn btn-block btn-lg btn-info mt-3"
                                    id="btnSMHome"
                                    onClick={() => this.smHome('/admin/storeManagerHome')}>
                                <i className="fa fa-users"></i>&nbsp;
                                Manage Store Managers
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdministratorHome