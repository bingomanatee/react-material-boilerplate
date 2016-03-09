import { Router } from 'express';
import {getStringModel } from './../model/stringModel';
import {getMarkdownModel } from './../model/markdownModel';
import mongoAuth from '../.auth/mongodb.json';

/**
 * RE
 * @param app
 */
module.exports = app => {
    var router = new Router();

    let StringModel = null;
    let MarkdownModel = null;

    let gsmPromise = new Promise((resolve, reject) => {
        getStringModel(mongoAuth)
          .then(lStringModel => {
              resolve(lStringModel);
          }, reject);
    });

    let mmPromise = new Promise((resolve, reject) => {
        getMarkdownModel(mongoAuth)
          .then(lMarkdownModel => {
              resolve(lMarkdownModel);
          }, reject);
    });

    gsmPromise.then(model => StringModel = model, err => console.log('cannot get StringModel', err));
    mmPromise.then(model => MarkdownModel = model, err => console.log('cannot get MarkdownModel', err));

    router.get('/:lang', (req, res) => {
        if (!req.params.lang) {
            return res.status(400).send(new Error('no languages specified'));
        }
        new Promise((resolve, reject) => {
            if (StringModel) {
                resolve(StringModel);
            }
            gsmPromise.then(resolve, reject);
        }).then(pStringModel => {
            pStringModel.find({locales: req.params.lang}, (err, terms) => {
                res.send(terms.reduce((out, term) => {
                    if (!out[term.component]) {
                        out[term.component] = {};
                    }
                    out[term.component][term.key] = term.content;
                    return out;
                }, {}));
            });
        }, err => res.status(400).send(err));
    });

    app.use('/api/strings', router);

    var mdRouter = new Router();

    mdRouter.get('/:comp/:locales/:filename', (req, res) => {
        if (!req.params.locales) {
            return res.status(400).send(new Error('no locales specified'));
        }
        if (!req.params.comp) {
            return res.status(400).send(new Error('no component specified'));
        }
        if (!req.params.filename) {
            return res.status(400).send(new Error('no filename specified'));
        }
        new Promise((resolve, reject) => {
            if (MarkdownModel) {
                resolve(MarkdownModel);
            }
            gsmPromise.then(resolve, reject);
        }).then(pMarkdownModel => {
            let search = {
                locales: req.params.locales,
                filename: req.params.filename,
                component: req.params.comp
            };

            console.log('searching for ', search);
            pMarkdownModel.findOne(search,
              (err, record) => {
                  res.send(record);
              });

        }, err => res.status(400).send(err));
    });

    app.use('/api/md', mdRouter);
};
