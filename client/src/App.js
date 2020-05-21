import React, {useEffect, useState} from 'react';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { library } from "@fortawesome/fontawesome-svg-core";
import Navigation from "./components/Shared/Navigation";
import UploadProduct from './components/Product/UploadProduct';
import HomePage from './components/Home/HomePage';

import AddStoreManagerPage from "./components/Admin/AddStoreManager";
import AddCategoryPage from "./components/Admin/AddCategory";
import CategoriesHome from "./components/Admin/CategoriesHome";
import EditCategory from "./components/Admin/EditCategory";
import AdministratorHome from "./components/Admin/AdministratorHome";
import StoreManagerHome from "./components/Admin/StoreManagerHome";
import EditStoreManager from "./components/Admin/EditStoreManager";

import GuestPage from './components/Home/GuestPage';
import  WishlistPage from './components/WishList/wishlistPage';
import  CartPage from './components/Cart/cartPage'
import StoreManagerDashboard from "./components/Product/StoreManagerDashboard";
import EditProduct from "./components/Product/EditProduct";
import DetailProduct from "./components/Product/ProductDetailPage/DetailProduct";
import DiscountPanel from "./components/Product/Discount/DiscountPanel";
import EditDiscount from "./components/Product/Discount/EditDiscount";
import AddDiscount from "./components/Product/Discount/AddDiscount";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import GuestNav from "./components/Shared/GuestNav";
import AdminNav from "./components/Shared/AdminNav";
import StoreManagerNav from "./components/Shared/StoreManagerNav";
import ViewComments from "./components/Comment/ViewComments";
import EditComment from "./components/Comment/EditComment";
import Payment from "./components/Payment/paymentPage";

function App(props) {


    let [loggedNavStatus, setLoggedNavStatus] = useState('user');

    useEffect(() => {

        if (window.location.href === 'http://localhost:3000/login') {
            setLoggedNavStatus('guest');
        } else if (window.location.href === 'http://localhost:3000/register') {
            setLoggedNavStatus('guest');
        } else if (window.location.href.match(/admin.*/)) {
            setLoggedNavStatus('admin');
        } else if (window.location.href.match(/storemanager.*/)) {
            setLoggedNavStatus('storeManager');
        } else if (window.location.href.match(/upload.*/)) {
            setLoggedNavStatus('storeManager');
        } else if (window.location.href.match(/discount.*/)) {
            setLoggedNavStatus('storeManager');
        }

    },[]);

    const checkLogin = (component) => {
        if (component === "/") {
            setLoggedNavStatus('guest');
            return <GuestPage/>
        } else if(localStorage.getItem('user-role') === 'user'){
            setLoggedNavStatus('user');
            return <HomePage/>
        } else if(localStorage.getItem('user-role') === 'admin'){
            setLoggedNavStatus('admin');
            return <HomePage/>
        } else if(localStorage.getItem('user-role') === 'storeManager'){
            setLoggedNavStatus('storeManager');
            return <HomePage/>
        } else {
            alert("No user logged in yet.!");
            //props.history.push('/');
        }

    };
    console.log(loggedNavStatus);
  // render() {
    return (
        <div>
            {(
                <div>
                    <Router>
                        {/*<Navigation/>*/}
                        {loggedNavStatus === 'guest' ? <GuestNav /> :
                            loggedNavStatus === 'admin' ? <AdminNav /> :
                                loggedNavStatus === 'storeManager' ? <StoreManagerNav /> :
                                    <Navigation />}
                        {/*<div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>*/}
                        <div>
                            <Switch>
      
                                <Route path="/admin/storeManagerHome/edit/:id" component={EditStoreManager}/>
                                <Route path="/admin/categoryHome/edit/:id" component={EditCategory}/>
                                <Route path="/admin/categoryHome/upload" component={AddCategoryPage}/>
                                <Route path="/admin/categoryHome" component= {CategoriesHome} />
                                <Route path="/admin/storeManagerHome/upload" component={AddStoreManagerPage}/>
                                <Route path="/admin/storeManagerHome" component= {StoreManagerHome} />
                                <Route path="/admin" component={AdministratorHome} />
                                <Route path="/product/discount" component={DiscountPanel} />
                                <Route path="/discount/edit/:id" component={EditDiscount} />
                                <Route path="/product/adddiscount/:id" component={AddDiscount} />
                                <Route path="/product/upload" component={UploadProduct} />
                                <Route path="/WishList/wishlist" component={WishlistPage}/>
                                <Route exact path="/comment/:id" component={ViewComments} />
                                <Route path="/comment/edit/:id" component={EditComment} />
                                <Route path="/product/storemanager" component={StoreManagerDashboard} />
                                <Route path="/product/edit/:id" component={EditProduct} />
                                <Route path="/product/:id" component={DetailProduct} />
                                <Route exact path="/" component={() => checkLogin("/")} />
                                <Route exact path="/home" component={() => checkLogin("/home")}/>
                                <Route path="/register" component={Register} />
                                <Route path="/login" component={Login} />
                                <Route path="/cart" component={CartPage}/>
                                <Route path="/payment" component={Payment}/>

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
