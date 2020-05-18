import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/containers/App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware} from 'redux'
import reducer from './reducers';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import {
    BrowserRouter as Router,
} from "react-router-dom";

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();