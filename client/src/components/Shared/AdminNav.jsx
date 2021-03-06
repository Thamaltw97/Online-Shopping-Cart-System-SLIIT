import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
//import { Menu } from 'antd';
import { Link } from "react-router-dom";

class Navigation extends Component{

    btnLogOut(){
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-id');
        localStorage.removeItem('user-role');
        alert('User logged out successfully.');
    }

    render() {
        return(


            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Online Fashion Gallery</span>
                <ul className="navbar-nav my-2 my-lg-0 ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">
                            Admin Dashboard
                        </Link>
                    </li>
                    <Link className="nav-link" to="/" onClick={this.btnLogOut}>
                        SignOut
                    </Link>
                </ul>
                <form className="form-inline my-2 my-lg-0 ml-5">
                    <a href="https://github.com/Thamaltw97/Online-Shopping-Cart-System-SLIIT"><h3><span className="fa fa-github"></span></h3></a>
                </form>
            </nav>


        );
    }

}

export default Navigation;
