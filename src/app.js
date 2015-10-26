import 'bootstrap/dist/css/bootstrap.min.css';
import Immutable from 'immutable';

// React imports
import React from 'react';
import ReactDOM from 'react-dom';

// react-router imports
import Router from 'react-router';
import routes from 'routes';
import {createHistory} from 'history';

// Redux imports
import {Provider} from 'react-redux';

// App imports
import configureStore from 'store/configureStore';

let initialState = window.__INITIAL_STATE__; //eslint-disable-line

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
// TODO: We may want to use `redux-immutable` instead.
Object
  .keys(initialState)
  .forEach(key => {
      initialState[key] = Immutable.fromJS(initialState[key]);
  });

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router history={createHistory()}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
