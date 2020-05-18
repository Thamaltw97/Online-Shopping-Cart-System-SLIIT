// import React from "react";
//
// export default function Register() {
//     return(
//         <div>
//             Login
//         </div>
//     )
// }

import React, {useState} from "react";
// import ImgUpload from './ImageUpload';
// import './StylesProduct.css';
import Axios from "axios";
import { BrowserRouter as Route} from "react-router-dom";
import Register from "./Register";







function Login(props) {

    const [EmailValue, setEmailValue] = useState("");
    const [PasswordValue, setPasswordValue] = useState("");



    const onEmailChange = (e) => {
        setEmailValue(e.currentTarget.value);
    };

    const onPasswordChange = (e) => {
        setPasswordValue(e.currentTarget.value);
    };




    const onSubmit = (e) => {
        e.preventDefault();



        if(!EmailValue || !PasswordValue) {
            return alert('Fill all the fields first !');
        }


        const userObj = {
            email: EmailValue,
            password: PasswordValue

        };

        Axios.post('http://localhost:5000/api/users/login', userObj)
            .then(res => {
                // alert(res.data);
                alert("Successfully Logged in");
                props.history.push('/');


            })
            .catch(err => {
                // alert('Error: ' + err);
                alert("Login Failed");
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
                            <h2 className="text-capitalize text-center mt-3 mb-2">Login</h2>
                            <br/>
                            <br />



                            <label>Your Email : </label>
                            <input id="email" type="text" className="form-control"
                                   maxLength="50"
                                   placeholder="Enter your Email"
                                   onChange={onEmailChange}
                                   value={EmailValue} />
                            <br/>
                            <label>Password : </label>
                            <input id="password" type="password" className="form-control"
                                   maxLength="20"
                                   placeholder="Enter Password"
                                   onChange={onPasswordChange}
                                   value={PasswordValue} />
                            <br />


                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <button type="submit" className="btn btn-block btn-primary mt-3"
                                            id="btnSubmit"
                                            onClick={onSubmit}
                                    >Login</button>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <p className="col-md-8">Don't Have an Account?<a href="/register">Register</a></p>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    //}

}

export default Login