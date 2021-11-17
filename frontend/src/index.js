import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import App from './App';

import usersReducer from "./store/reducers/usersReducer";
import history from "./history";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    users: usersReducer,
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Router history={history}>
        <Provider store={store}>
            <ToastContainer/>
            <App />
        </Provider>
    </Router>
);

ReactDOM.render(app, document.getElementById('root'));