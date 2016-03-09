import { getUserModel } from '../model/getUserModel';
import { Router } from 'express';
const mongoAuth = require('./../.auth/mongodb.json');
let User = null;

getUserModel(mongoAuth).then(pUser => {
    console.log('-----------------retrieved user class:', pUser);
    User = pUser;
}, err => {
    console.log('---------------- error retrieving user class: ', err, mongoAuth);
});

export default app => {

    let router = new Router();

    router.post('/twitter', (req, res) => {

        if (!req.body && req.body.id && req.body.screenName && req.body.tweets) {
            res.status(400).send({error: 'no id'});
        } else if (!req.user) {
            res.status(400).send({error: 'not logged in'});
        } else {
            User.findByProvider(req.user.provider, req.user.id)
              .then(user => user.eatTwitterUser(req.body.id, req.body.screenName, req.body.tweets))
              .then(result => res.send(result), err => res.status(400).send(err));
        }
    });

    router.get('/stomach', (req, res) => {
        if (!req.user) {
            res.status(400).send({error: 'not logged in'});
        } else {
            User.findByProvider(req.user.provider, req.user.id)
              .then(user => {
                  console.log('******************** stomach --- gotten user:', user);

                  user.stomach()
                    .then(stomach => res.send(stomach));
              });
        }
    });

    app.use('/dining', router);
};
