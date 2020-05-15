import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { library } from "@fortawesome/fontawesome-svg-core";
import Navigation from "./components/Shared/Navigation";
import UploadProduct from './components/Product/UploadProduct';
import HomePage from './components/Home/HomePage';
import StoreManagerDashboard from "./components/Product/StoreManagerDashboard";
import EditProduct from "./components/Product/EditProduct";
import DetailProduct from "./components/Product/ProductDetailPage/DetailProduct";
import DiscountPanel from "./components/Product/Discount/DiscountPanel";
import EditDiscount from "./components/Product/Discount/EditDiscount";
import AddDiscount from "./components/Product/Discount/AddDiscount";

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
                                <Route path="/product/discount" component={DiscountPanel} />
                                <Route path="/discount/edit/:id" component={EditDiscount} />
                                <Route path="/product/adddiscount/:id" component={AddDiscount} />
                                <Route path="/product/upload" component={UploadProduct} />
                                <Route path="/product/storemanager" component={StoreManagerDashboard} />
                                <Route path="/product/edit/:id" component={EditProduct} />
                                <Route path="/product/:id" component={DetailProduct} />
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
