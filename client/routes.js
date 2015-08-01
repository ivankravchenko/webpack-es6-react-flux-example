import React from "react"
import Router from 'react-router';
const { Route, DefaultRoute, NotFoundRoute } = Router

import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import NotFoundPage from "./components/NotFoundPage";

export default (
	<Route>
		<DefaultRoute name="home" handler={HomePage}/>
		<Route name="about" handler={AboutPage}/>
		<NotFoundRoute handler={NotFoundPage} />
	</Route>
)
