import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {
    Switch,
    Route,
    NavLink,
    Redirect,
} from "react-router-dom";

import Login from './containers/Login';
import Products from './containers/Products';
import MyCart from './containers/MyCart';

import data from './data/data';

function App({loadProducts, products, cartItems, isOrderAccepted, logout, authenticated}) {
    useEffect(() => {
        loadProducts(data);
    }, []);

    useEffect(() => {
        if (isOrderAccepted === true) {
            alert('Order is accepted!');
        }
    }, [isOrderAccepted]);

    useEffect(() => {
        if (authenticated === true) {
            alert('Success!');
        }
    }, [authenticated]);

    function _logout(e) {
        e.preventDefault();
        logout();
    }

    function renderNavigation() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className='nav-link' activeClassName='active' to="/" exact>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            {
                                (authenticated === true)
                                    ? <a className='nav-link' href="logout" onClick={_logout}>Logout</a>
                                    : <NavLink className='nav-link' activeClassName='active' to="/login">Login</NavLink>
                            }
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' activeClassName='active' to="/products">Products ({products.length})</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' activeClassName='active' to="/cart">My Cart ({cartItems.length})</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    (authenticated === true)
                        ? (children)
                        : ( <Redirect to={{pathname: "/login", state: { from: location } }} /> )
                }
            />
        );
    }

    return (
        <div className="container">
            {renderNavigation()}
            <h1>Webshop</h1>

            <Switch>
                <Route path="/" exact>
                    <h3>Hello to Webshop!</h3>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/products">
                    <Products />
                </PrivateRoute>
                <PrivateRoute path="/cart">
                    <MyCart />
                </PrivateRoute>
            </Switch>
        </div>
    );
}

App.propTypes = {
    loadProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    cartItems: PropTypes.array.isRequired,
    isOrderAccepted: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default App;