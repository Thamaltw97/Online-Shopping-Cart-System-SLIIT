import React,{useState}  from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./Style.css";




import Navigation from "./components/Shared/Navigation";
import UploadProduct from './components/Product/UploadProduct';
import HomePage from './components/Home/HomePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from "./context/UserContext";


// class App extends React.Component{
function App() {

  // render() {


    return (
        <div>
            {(
                <div>
                    <Router>

                        <Navigation/>
                        {/*<div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>*/}
                        <div>
                            <Switch>
                                <Route path="/product/upload" component={UploadProduct} />
                                <Route exact path="/" component={HomePage}/>
                                <Route path="/register" component={Register}/>
                                <Route path="/login" component={Login}/>


                            </Switch>
                        </div>

                    </Router>
                </div>
            )}
        </div>
    );
  // }

}

export default App;
