                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        /*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';

const app = global.server = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended: true}));

//
// Register API middleware
// -----------------------------------------------------------------------------
require('./api/mongo-session')(app);
require('./api/passport')(app);
require('./api/passport-twitter')(app);
require('./api/strings')(app);
require('./api/dining')(app);
app.use('/api/content', require('./api/content'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
    try {
        let statusCode = 200;
        const data = {title: '', description: '', css: '', body: ''};
        const css = [];
        const context = {
            onInsertCss: value => css.push(value),
            onSetTitle: value => data.title = value,
            onSetMeta: (key, value) => data[key] = value,
            onPageNotFound: () => statusCode = 404,
        };

        await Router.dispatch({path: req.path, context}, (state, component) => {
            data.body = ReactDOM.renderToString(component);
            data.css = css.join('');
        });

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(statusCode).send('<!doctype html>\n' + html);
    } catch (err) {
        next(err);
    }
});

//
// Launch the server
// -----------------------------------------------------------------------------

app.listen(app.get('port'), () => {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + app.get('port'));
    if (process.send) {
        process.send('online');
    }
});
