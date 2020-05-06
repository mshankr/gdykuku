import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import reduxThunk from 'redux-thunk';

import { Provider }  from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import axios from 'axios'
window.axios = axios;

        // 1st argument: all the reducers in our app
        // 2nd argument: provides initial state of app
        // 3rd argument: hook up any middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
