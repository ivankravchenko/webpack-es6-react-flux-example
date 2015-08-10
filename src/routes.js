import React from 'react';
import Router from 'react-router';
const {Route, DefaultRoute, NotFoundRoute} = Router;

import HomePage from 'components/pages/HomePage';
import AboutPage from 'components/pages/AboutPage';
import NotFoundPage from 'components/pages/NotFoundPage';

export default (
    <Route>
        <DefaultRoute name="home" handler={HomePage}/>
        <Route name="about" handler={AboutPage}/>
        <NotFoundRoute handler={NotFoundPage} />
    </Route>
);
