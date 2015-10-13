import React from 'react';
import {Route, IndexRoute} from 'react-router';

import HomePage from 'components/pages/HomePage';
import AboutPage from 'components/pages/AboutPage';
import NotFoundPage from 'components/pages/NotFoundPage';

export default (
    <Route path="/">
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
