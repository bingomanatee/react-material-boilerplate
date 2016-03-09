import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import FuelSavingsPage from './containers/FuelSavingsPage';
import IndexPage from './containers/IndexPage/IndexPage';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage} />
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
