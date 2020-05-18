import {connect} from 'react-redux';
import App from "./../App";

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated,
        products: state.shop.products,
        cartItems: state.shop.cartItems,
        isOrderAccepted: state.shop.isOrderAccepted,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loadProducts: (data) => dispatch({
            type: 'SHOP/SAVE_DATA',
            payload: {
                data,
            }
        }),
        logout: () => dispatch({
            type: 'USER/LOGOUT',
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);