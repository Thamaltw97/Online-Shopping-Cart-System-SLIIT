import React, {useState} from "react";
// import ImgUpload from './ImageUpload';
// import './StylesProduct.css';
import Axios from "axios";
// import { BrowserRouter as Route} from "react-router-dom";
// import Register from "./Register";
import './Login.css'







function Login(props) {

    const [EmailValue, setEmailValue] = useState("");
    const [PasswordValue, setPasswordValue] = useState("");
    //const [Token, setToken] = useState("");


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

        if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(EmailValue))){
            return alert('Please Check you Email Adsress');
        }


        const userObj = {
            email: EmailValue,
            password: PasswordValue

        };

        Axios.post('https://onlineshoppingcartsystemsliit.herokuapp.com/api/users/login', userObj)
            .then(res => {
                //console.log(res.data);
                //setToken(res.data.token);
                //console.log(res.data.token)
                //console.log(res.data.user.id)
                localStorage.setItem('auth-token', res.data.token);
                localStorage.setItem('user-id', res.data.user.id);
                localStorage.setItem('user-role', res.data.user.userRole);
                alert("Successfully Logged in");
                props.history.push('/home');


            })
            .catch(err => {
                // alert('Error: ' + err);
                alert("Sorry..Login Failed. Please check your e-mail and password");
            });

    };


    //render() {
    return (
        <div className="container pt-3 mt-3 mb-5 " >
            <div className="card card-body my-0 bg-light">
                <form onSubmit={onSubmit}>

                    <div className="row div-login">
                        <div className="col-md-2"/>
                        <div className="col-md-8">
                            <h2 className="text-capitalize text-center mt-3 mb-2">Sign In</h2>
                            <br/>
                            <br />



                            <label className='lable-form'>Your Email : </label>
                            <input id="email" type="text" className="form-control"
                                   maxLength="50"
                                   placeholder="Enter your Email"
                                   onChange={onEmailChange}
                                   value={EmailValue} />
                            <br/>
                            <label className='lable-form'>Password : </label>
                            <input id="password" type="password" className="form-control"
                                   maxLength="20"
                                   placeholder="Enter Password"
                                   onChange={onPasswordChange}
                                   value={PasswordValue} />
                            <br />


                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <button type="submit" className="btn btn-block btn-primary mt-3 btn-signIn"
                                            id="btnSubmit"
                                            onClick={onSubmit}
                                    >SIGN IN</button>
                                </div>
                            </div>
                            <br/>
                            <div className="div-p1">
                                <p className="col-md-8">Not Registered?<a href="/register">Register</a></p>
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