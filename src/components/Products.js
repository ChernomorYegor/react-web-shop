import React from 'react';
import PropTypes from 'prop-types';

function Products({products, addToCart}) {
    function _addToCart(id, e) {
        e.preventDefault();
        addToCart(id);
    }

    return (
        <div className='product-list'>
            {
                products.map((product) => (
                    <div className="card" style={{width: '18rem'}} key={product.id}>
                        <img className="card-img-top" src={product['product-image-url']} alt={product['product-name']} />
                        <div className="card-body">
                            <h5 className="card-title">{product['product-name']}</h5>
                            <p className="card-text">{product['header-top-right-text']}</p>
                            <button className="btn btn-primary" onClick={_addToCart.bind(this, product.id)}>Add to cart</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
};

export default Products;