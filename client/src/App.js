import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { library } from "@fortawesome/fontawesome-svg-core";
import Navigation from "./components/Shared/Navigation";
import UploadProduct from './components/Product/UploadProduct';
import HomePage from './components/Home/HomePage';
import StoreManagerDashboard from "./components/Product/StoreManagerDashboard";
import EditProduct from "./components/Product/EditProduct";

class App extends React.Component {

  render() {
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
                                <Route path="/product/storemanager" component={StoreManagerDashboard} />
                                <Route path="/product/edit/:id" component={EditProduct} />
                                <Route path="/" component={HomePage}/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            )}
        </div>
    );
  }

}

export default App;
