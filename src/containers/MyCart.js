import {connect} from 'react-redux';
import MyCart from "./../components/MyCart";

const mapStateToProps = state => {
    return {
        products: state.shop.products,
        cartItems: state.shop.cartItems,
        fullName: state.shop.userFullName,
        address: state.shop.userAddress,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (id) => dispatch({
            type: 'SHOP/REMOVE_FROM_CART',
            payload: {
                id,
            }
        }),
        onFullNameChanged: (e) => dispatch({
            type: 'SHOP/FULL_NAME_CHANGED',
            payload: {
                value: e.target.value,
            }
        }),
        onAddressChanged: (e) => dispatch({
            type: 'SHOP/ADDRESS_CHANGED',
            payload: {
                value: e.target.value,
            }
        }),
        submitOrder: () => dispatch({
            type: 'SHOP/SUBMIT_ORDER',
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCart);