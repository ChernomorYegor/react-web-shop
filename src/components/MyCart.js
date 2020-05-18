import React from 'react';
import PropTypes from 'prop-types';
import {
    useHistory,
} from "react-router-dom";

function MyCart({products, cartItems, removeFromCart, fullName, address, onFullNameChanged, onAddressChanged, submitOrder}) {

    let history = useHistory();

    function _removeFromCart(id, e) {
        e.preventDefault();
        removeFromCart(id);
    }

    function _submitOrder(e) {
        e.preventDefault();
        submitOrder();
        history.push(`/products`);
    }

    function renderCartItems() {
        return (
            products.map((product) =>
                (cartItems.includes(product['id'])) && (
                    <div className="card" style={{width: '18rem'}} key={product.id}>
                        <img className="card-img-top" src={product['product-image-url']} alt={product['product-name']} />
                        <div className="card-body">
                            <h5 className="card-title">{product['product-name']}</h5>
                            <p className="card-text">{product['header-top-right-text']}</p>
                            <button className="btn btn-danger" onClick={_removeFromCart.bind(this, product.id)}>Remove</button>
                        </div>
                    </div>
                )
            )
        );
    }

    function renderCartForm() {
        return (
            <form className="container mt-3" onSubmit={_submitOrder}>
                <h5>Order info:</h5>
                <div className="form-group">
                    <label htmlFor="exampleInputFullName">Full Name</label>
                    <input
                        value={fullName}
                        type="text"
                        className="form-control"
                        id="exampleInputFullName"
                        placeholder="Enter Full Name"
                        onChange={onFullNameChanged}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAddress">Address</label>
                    <input
                        value={address}
                        type="text"
                        className="form-control"
                        id="exampleInputAddress"
                        placeholder="Enter Address"
                        onChange={onAddressChanged}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Order</button>
            </form>
        );
    }

    return (
        <div className='cart'>
            {
                cartItems.length
                    ? <div className='cart-prod-form'>{renderCartItems()}{renderCartForm()}</div>
                    : <p>Your Cart is empty</p>
            }
        </div>
    );
}

MyCart.propTypes = {
    products: PropTypes.array.isRequired,
    cartItems: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    fullName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    onFullNameChanged: PropTypes.func.isRequired,
    onAddressChanged: PropTypes.func.isRequired,
    submitOrder: PropTypes.func.isRequired,
};

export default MyCart;