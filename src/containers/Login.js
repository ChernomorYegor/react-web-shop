import {connect} from 'react-redux';
import Login from "../components/Login";

const mapStateToProps = state => {
    return {
        login: state.user.userLogin,
        loginError: state.user.userLoginError,
        password: state.user.userPassword,
        passwordError: state.user.userPasswordError,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onLoginChanged: (e) => dispatch({
            type: 'USER/LOGIN_CHANGED',
            payload: {
                value: e.target.value,
            }
        }),
        onPasswordChanged: (e) => dispatch({
            type: 'USER/PASSWORD_CHANGED',
            payload: {
                value: e.target.value,
            }
        }),
        onSubmit: () => dispatch({
            type: 'USER/SUBMIT_LOGIN_FORM',
        }),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);