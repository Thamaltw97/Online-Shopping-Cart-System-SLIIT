import React, {useEffect, useState} from 'react';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { library } from "@fortawesome/fontawesome-svg-core";
import Navigation from "./components/Shared/Navigation";
import UploadProduct from './components/Product/UploadProduct';
import HomePage from './components/Home/HomePage';
import GuestPage from './components/Home/GuestPage';
import  WishlistPage from './components/WishList/wishlistPage'
//import DeleteWishlist from "./components/WishList/DeleteWishlist";
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

function App(props) {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         loggedNavStatus: false
    //     }
    // }

    let [loggedNavStatus, setLoggedNavStatus] = useState('user');

    // useEffect(() => {
    //
    // },[]);

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

        // else if (component === "register") {
        //     return <RegisterForm />;
        // } else if (component === "admin") {
        //     return <Admin />;
        // }
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
                                <Route path="/product/discount" component={DiscountPanel} />
                                <Route path="/discount/edit/:id" component={EditDiscount} />
                                <Route path="/product/adddiscount/:id" component={AddDiscount} />
                                <Route path="/product/upload" component={UploadProduct} />
                                <Route path="/WishList/wishlist" component={WishlistPage}/>
                                <Route exact path="/comment/view" component={ViewComments} />
                                <Route path="/product/storemanager" component={StoreManagerDashboard} />
                                <Route path="/product/edit/:id" component={EditProduct} />
                                <Route path="/product/:id" component={DetailProduct} />
                                <Route exact path="/" component={() => checkLogin("/")} />
                                <Route exact path="/home" component={() => checkLogin("/home")}/>
                                <Route path="/register" component={Register} />
                                <Route path="/login" component={Login} />

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
