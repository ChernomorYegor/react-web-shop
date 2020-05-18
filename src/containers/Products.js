import {connect} from 'react-redux';
import Products from "./../components/Products";

const mapStateToProps = state => {
    return {
        products: state.shop.products,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => dispatch({
            type: 'SHOP/ADD_TOD_CART',
            payload: {
                id,
            }
        }),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products);