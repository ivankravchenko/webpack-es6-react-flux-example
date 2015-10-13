import 'purecss';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import routes from 'routes';
import {createHistory} from 'history';

ReactDOM.render((<Router history={createHistory()}>{routes}</Router>), document.getElementById('app'));
