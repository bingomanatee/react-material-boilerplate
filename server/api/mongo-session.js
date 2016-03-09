const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const assert = require('assert');
const auth = require('./../.auth/mongodb.json');
import contextUrl from './../model/contextUrl';

var store = new MongoDBStore(
  {
      uri: contextUrl(auth),
      collection: 'mySessions'
  });

// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});

export default app => {
    app.use(session({
        secret: 'This is a secret',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: store
    }));

    app.get('/session', (req, res) => res.send(req.session));
};
