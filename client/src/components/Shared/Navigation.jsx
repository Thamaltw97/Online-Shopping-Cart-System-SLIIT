import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import { Menu } from 'antd';
import { Link } from "react-router-dom";

class Navigation extends Component{
    render() {
        return(


            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Online Fashion Stop</span>
                <ul className="navbar-nav my-2 my-lg-0 ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/product/upload">
                            Upload
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/storeManager/upload">
                            Store Manager
                        </Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0 ml-5">
                    <a href="https://github.com/Thamaltw97/Online-Shopping-Cart-System-SLIIT"><h3><span className="fa fa-github"></span></h3></a>
                </form>
            </nav>


        );
    }

}

export default Navigation;