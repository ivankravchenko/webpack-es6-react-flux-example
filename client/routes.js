import React from 'react';
import Router from 'react-router';
const {Route, RouteHandler, DefaultRoute, NotFoundRoute} = Router;


const RootRoute = React.createClass({
    displayName: 'RouteHandler',
    render() {
        return <RouteHandler/>;
    }
});
import HomePage from 'components/HomePage';
import AboutPage from 'components/AboutPage';
import NotFoundPage from 'components/NotFoundPage';

export default (
    <Route handler={RootRoute}>
        <DefaultRoute name="home" handler={HomePage}/>
        <Route name="about" handler={AboutPage}/>
        <NotFoundRoute handler={NotFoundPage} />
    </Route>
);
