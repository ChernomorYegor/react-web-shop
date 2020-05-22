import update from 'immutability-helper';

const initialState = {
    userLogin: '',
    userLoginError: '',
    userPassword: '',
    userPasswordError: '',
    users: [{
        id: 1,
        username: 'vasya',
        password: 'aysav',
    }, {
        id: 2,
        username: 'petya',
        password: 'aytep',
    }],
    authenticated: false,
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER/LOGIN_CHANGED':
            return update(state, {
                $merge:
                    {
                        userLogin: action.payload.value,
                        userLoginError: '',
                    }
            });
        case 'USER/PASSWORD_CHANGED':
            return update(state, {
                $merge:
                    {
                        userPassword: action.payload.value,
                        userPasswordError: '',
                    }
            });
        case 'USER/SUBMIT_LOGIN_FORM':
            if (!state.userLogin.trim()) {
                return update(state, {
                    $merge:
                        {
                            userLogin: '',
                            userLoginError: 'cannot be empty',
                        }
                });
            }
            if (state.userPassword.length < 5) {
                return update(state, {
                    $merge:
                        {
                            userLoginError: '',
                            userPasswordError: 'must have at least 5 characters',
                        }
                });
            }
            if (!state.userPassword.trim()) {
                return update(state, {
                    $merge:
                        {
                            userLoginError: '',
                            userPasswordError: 'cannot be empty',
                        }
                });
            }
            else {
                let isLoginCorrect = 'incorrect or';
                let isPasswordCorrect = 'incorrect';
                let authenticated = false;

                initialState.users.forEach((user) => {
                    if (user.username === state.userLogin && user.password === state.userPassword) {
                        isLoginCorrect = 'login correct';
                        isPasswordCorrect = 'password correct';
                        authenticated = true;
                    }
                });

                return update(state, {
                    $merge:
                        {
                            authenticated,
                            userLogin: '',
                            userLoginError: isLoginCorrect,
                            userPassword: '',
                            userPasswordError: isPasswordCorrect,
                        }
                });
            }
        case 'USER/LOGOUT':
            return update(state, {
                $merge:
                    {
                        userLoginError: initialState.userLoginError,
                        userPasswordError: initialState.userPasswordError,
                        authenticated: false,
                    }
            });
        default:
            return state
    }
}

export default userReducer;