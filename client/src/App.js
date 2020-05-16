import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import { library } from "@fortawesome/fontawesome-svg-core";
import Navigation from "./components/Shared/Navigation";
import UploadProduct from './components/Product/UploadProduct';
import HomePage from './components/Home/HomePage';
import  WishlistPage from './components/WishList/wishlistPage'
import DeleteWishlist from "./components/WishList/DeleteWishlist";

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
                                <Route path="/WishList/wishlist" component={WishlistPage}/>
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
