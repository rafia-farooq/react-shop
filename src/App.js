import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, IconButton, Badge } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import css from "./App.module.css";

import Shop from "./product/Shop";
import AddProduct from "./product/AddCompleteProduct";
import ShowProduct from "./product/ShowProduct";
import SingleProduct from "./product/SingleProduct";
import MyCart from "./product/MyCart";
import EditProduct from "./product/EditProduct";
import Login from "./user/Login";
import Register from "./user/Register";
import LoadingPage from "./LoadingPage";
import Reduxpage from "./Reduxpage";
import Contact from "./contact/Contact";
import Users from "./user/AllUsers";

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { useSelector } from "react-redux";



function App() {

  const Welcome = React.lazy(
    () => import ("./user/Welcome")
  )
  
  const cart = useSelector(state => state.addCart)

  const logout = () => {
    localStorage.removeItem('loginID')
    localStorage.removeItem('loginName')
    localStorage.removeItem('loginEmail')
    localStorage.removeItem('loginPic')
    localStorage.removeItem('loginPassword')
    window.location = "http://localhost:3000/login"
  }

  return (
    <React.Suspense fallback={<LoadingPage/>}>
      <Router>
        <nav className={css.navBar}>
            <Button style={{marginRight: "30px"}}>
                <Link to={'/'} className={css.navLinks}>Home</Link>
            </Button>

            <Button style={{marginRight: "30px"}}>
                <Link to={'/add'} className={css.navLinks}>Add Product</Link>
            </Button>

            <Button style={{marginRight: "30px"}}>
                <Link to={'/index'} className={css.navLinks}>Products</Link>
            </Button>

            <Button style={{marginRight: "30px"}}>
                <Link to={'/cart'} className={css.navLinks}>           
                  <Badge badgeContent={cart.totalQty} color={"primary"} anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}>
                    <ShoppingBasketIcon />
                  </Badge>
            </Link>
            </Button>

          {!localStorage.getItem('loginName') && ( 
            <>
              <Button style={{marginRight: "30px"}}>
                    <Link to={'/login'} className={css.navLinks}>Login</Link>
                </Button>
                
                <Button style={{marginRight: "30px"}}>
                    <Link to={'/register'} className={css.navLinks}>Register</Link>
                </Button>
              </>
            )}
            
            {localStorage.getItem('loginName') && (
              <Button className="nav-item dropdown show" style={{marginRight: "30px"}}>
                <Link class="dropdown-toggle" to="#" id="dropdownMenuLink" data-toggle="dropdown">
                  <span className={css.navLinks}>{localStorage.getItem('loginName')}</span>
                </Link>

                <Button class="dropdown-menu">
                  <Link class="dropdown-item" to="/welcome">Profile</Link>
                  <Link class="dropdown-item" to="/login" onClick={logout}>LogOut</Link>
                </Button>
              </Button>
            )}

            <Button style={{marginRight: "30px"}}>
                <Link to={'/redux'} className={css.navLinks}>Counter</Link>
            </Button>

            <Button style={{marginRight: "30px"}}>
                <Link to={'/user'} className={css.navLinks}>Staff</Link>
            </Button>

            <Button style={{marginRight: "30px"}}>
                <Link to={'/contact-us'} className={css.navLinks}>Contact Us</Link>
            </Button>
        </nav>

        <Switch>
          <Route path={'/'} exact>
            <Shop />
          </Route>

          <Route path={'/add'}>
            <AddProduct />
          </Route>

          <Route path={'/index'}>
            <ShowProduct />
          </Route>

          <Route path={'/login'}>
            <Login />
          </Route>

          <Route path={'/register'}>
            <Register />
          </Route>

          <Route path={'/contact-us'}>
            <Contact />
          </Route>

          <Route path={'/user'}>
            <Users />
          </Route>

          {/* Routes for internal page changes */}
          <Route path={'/singleProduct/:id'} render={(props) => <SingleProduct {...props}/> }/>

          <Route path={'/:id/edit'} render={(props) => <EditProduct {...props}/> }/>

          <Route path={'/redux'}>
            <Reduxpage />
          </Route>

          <Route path={'/cart'}>
            <MyCart />
          </Route>

          <Route path={'/welcome'}>
            <Welcome />
          </Route>

          <Route path={'/loading'}>
            <LoadingPage />
          </Route>

        </Switch>
      </Router>
    </React.Suspense>
    
  );
}

export default App;
