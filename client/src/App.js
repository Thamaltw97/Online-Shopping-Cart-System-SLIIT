import React from 'react';
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

class App extends React.Component {

  render() {
    return (
        <div>
            {(
                <div>
                    <Router>
                        <Navigation/>
                        <div>
                            <Switch>
                                <Route path="/admin/storeManagerHome/edit/:id" component={EditStoreManager}/>
                                <Route path="/admin/categoryHome/edit/:id" component={EditCategory}/>
                                <Route path="/admin/categoryHome/upload" component={AddCategoryPage}/>
                                <Route path="/admin/categoryHome" component= {CategoriesHome} />
                                <Route path="/admin/storeManagerHome/upload" component={AddStoreManagerPage}/>
                                <Route path="/admin/storeManagerHome" component= {StoreManagerHome} />
                                <Route path="/admin" component={AdministratorHome} />
                                <Route path="/product/upload" component={UploadProduct} />
                                <Route exact path="/" component={HomePage}/>
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
