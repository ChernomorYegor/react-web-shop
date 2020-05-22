import update from 'immutability-helper';

const initialState = {
    products: [],
    cartItems: [],
    userFullName: '',
    userAddress: '',
    orders: [],
    isOrderAccepted: false,
};

function shopReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOP/SAVE_DATA':
            return update(state, {
                products: {
                    $push: action.payload.data,
                }
            });
        case 'SHOP/ADD_TOD_CART':
            if (!action.payload.id || state.cartItems.includes(action.payload.id)) {
                return state;
            }

            return update(state, {
                cartItems: {
                    $push: [action.payload.id],
                },
                $merge:
                    {
                        isOrderAccepted: false,
                    }
            });
        case 'SHOP/REMOVE_FROM_CART':
            const fromState = state.cartItems.slice();

            let indexToRemove;
            fromState.forEach((item, index) => {
                if (item === action.payload.id) {
                    indexToRemove = index;
                }
            });

            fromState.splice(indexToRemove, 1);

            return update(state, {
                $merge:
                    {
                        cartItems: fromState,
                    }
            });
        case 'SHOP/FULL_NAME_CHANGED':
            return update(state, {
                $merge:
                    {
                        userFullName: action.payload.value,
                    }
            });
        case 'SHOP/ADDRESS_CHANGED':
            return update(state, {
                $merge:
                    {
                        userAddress: action.payload.value,
                    }
            });
        case 'SHOP/SUBMIT_ORDER':
            return update(state, {
                orders: {
                    $push: [{
                        id: state.orders.length + 1,
                        address: state.userAddress,
                        fullName: state.userFullName,
                        order: state.cartItems,
                    }],
                },
                $merge:
                    {
                        cartItems: initialState.cartItems,
                        userFullName: initialState.userFullName,
                        userAddress: initialState.userAddress,
                        isOrderAccepted: true,
                    }
            });
        default:
            return state
    }
}

export default shopReducer;