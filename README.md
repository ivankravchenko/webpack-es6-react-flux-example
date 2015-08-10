# commerce-myaccount

Proof of concept for a fully JS-based isomorphic modern stack, with the following technologies:

- [React](https://facebook.github.io/react/) for the UI
- [Alt](http://alt.js.org/) for a [Flux architecture](https://facebook.github.io/flux/docs/overview.html) with unidirectional data flow
- [Express](http://koajs.com/) as the backend server for file serving and React pre-rendering
- [webpack](http://webpack.github.io/) to compile and bundle everything together, hot reload included
- [PostCSS](https://github.com/postcss/postcss) and [cssnext](http://cssnext.io/) with [Pure.css](http://purecss.io/) for a forward-thinking CSS solution
- [Babel](https://babeljs.io/) for classy ES6/7+ code throughout
- [Mocha](http://mochajs.org/) with [jsdom](https://www.npmjs.com/package/node-jsdom) for DOM-rendered Unit/Component tests
- [ESLint](http://eslint.org/) and [CSSLint](https://github.com/CSSLint/csslint) for linting


## Project Goals

- Experiment with a modern, cutting-edge JS-based tech stack
- Potential rearchitecture starting point for MYACC
- Adopt a component-based mentality for all UI elements via React, and a Flux-based approach to data flows (uni-directional)
- Favor leveraging existing/proven open source solutions over reinventing the wheel


## TODO

- (8/10/15) Got server-side-rendering with CSS imports and hot-module-replacement working, but now the tests need to be run through Webpack/bootstrapped slightly differently before they'll work again.
- Need to persist the user's logged in state and store it on the server (can stub/fake a data-store for now by just persisting on the session)
- Integrate [Passportjs](http://passportjs.org/) for authentication (also handles SSO)
- Fully optimized production builds (vs staging and developer builds)
- JS/JSX ESLinter is in place, need to also add CSSLint
- Once Mocha testing is back in place, would also like to add code coverage (e.g. [BlanketJS](http://blanketjs.org/))
- Automated E2E tests with [Nightwatch.js](http://nightwatchjs.org/)
- API endpoints (either embedded in this repo or as a separate micro-service)
- Create a Style Guide that enumerates all the different React components on one page to act as a library for developers to pull elements from and act as a living Style Guide for designers. Ideally, this Style Guide will be automatically created via some node script that can generate it on the fly.
- Git commit hooks to run tests and linters.


---

# Development

## Getting started

0. Install dependencies: `npm install`
1. Build and start dev server: `npm run dev`
2. Navigate to [http://localhost:8080](http://localhost:8080) to view the app.

> NOTE: You also need `nodemon` installed globally. If you don't already have it (or if you're not sure), run: `npm install -g nodemon`.

## Testing

Once: `npm run test`

Or, for TDD: `npm run watch-test`

> *Testing is currently broken. Working on it!*

## Linting
 
`npm run lint`

## Dev Guide

#### React Components
  - Favor composition over inheritence
  - Use decorators and [higher order components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
  - Each component should have its own stylesheet, named after the component, e.g. `TodosView.css`
  - All the class names in a component must come from the local stylesheet
  - To reuse styles, use mixins and define new classes in the local stylesheet

#### Component Types
There are 3 component types:

0. Pages
1. Views
2. Elements

> A **page** is composed of one or more **views**, and a view is composed of one or more **elements**. 

For example, the `<MemberCenterPage/>` may be composed of a `<NavigationView/>` and `<ProfileView/>`. The `<NavigationView/>` will be composed of a number of `<Link/>` elements.

Depending on the needs of the app, as it grows in complexity, we may need to introduce other types (such as _layout_ components), but for now, we will strive to keep it simple.

### General Conventions

- In general, name React components with JSX code with a `.jsx` extension. If there's no JSX markup (such as a Flux Action or Store), use a normal `.js` extension.
- Favor ES6 syntax over traditional ES5 syntax.
- Keep a clear separation of concerns with separate ["smart" and "dumb" components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).
- Keep a generally flat folder structure. For example:
  - Pages: /components/pages/MemberCenterPage.jsx
  - Views: /components/views/ProfileView.jsx
  - Elements: /components/elements/TextBox.jsx
  - Element Stylesheet: /components/elements/TextBox.css 
- Favor ES6 syntax over traditional ES5 syntax.

 
 
## Further learning/useful links

- [Dumb vs Smart Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [Example GIST](https://gist.github.com/chantastic/fc9e3853464dffdb1e3c)
- [Why Compositions over Mixins](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
- [Flux Implementations Compared](http://pixelhunter.me/post/110248593059/flux-solutions-compared-by-example)
- [React Style Guide Patterns](https://reactjsnews.com/react-style-guide-patterns-i-like/)
- [ES6 React/JSX Coding Standards](https://github.com/jrskerritt/react-coding-standards)


The end.


