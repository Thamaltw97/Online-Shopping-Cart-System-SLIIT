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
                            <h2 className="text-capitalize text-center mt-3 mb-2">Administrator Home</h2>
                            <br/><br/><br/><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <button type="button" className="btn btn-block btn-primary mt-3"
                                    id="btnCategoryHome"
                                    onClick={() => this.categoryHome('/admin/categoryHome')}
                            >Manage Categories</button><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <button type="button" className="btn btn-block btn-primary mt-3"
                                    id="btnSMHome"
                                    onClick={() => this.smHome('/admin/storeManagerHome')}
                            >Manage Store Managers</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdministratorHome