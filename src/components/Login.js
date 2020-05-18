import React from 'react';
import PropTypes from 'prop-types';
import {
    useHistory,
    useLocation
} from "react-router-dom";

function Login({login, loginError, password, passwordError, onLoginChanged, onPasswordChanged, onSubmit}) {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    function submit(e) {
        e.preventDefault();
        onSubmit();
        history.replace(from);
    }

    return (
        <div>
            {from.pathname !== "/" && <p>You must log in to view the page at {from.pathname}</p>}
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="exampleInputUsername">Username {loginError && <span className="text-danger">{loginError}</span>}</label>
                    <input
                        value={login}
                        type="text"
                        className="form-control"
                        id="exampleInputUsername"
                        placeholder="Enter username"
                        onChange={onLoginChanged}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword">Password {passwordError && <span className="text-danger">{passwordError}</span>}</label>
                    <input
                        value={password}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword"
                        placeholder="Enter Password"
                        onChange={onPasswordChanged}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

Login.propTypes = {
    login: PropTypes.string.isRequired,
    loginError: PropTypes.string,
    password: PropTypes.string.isRequired,
    passwordError: PropTypes.string,
    onLoginChanged: PropTypes.func.isRequired,
    onPasswordChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Login;