"use strict";

const dbConf = require('../conf/config.json').db;
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(dbConf.url, { useUnifiedTopology: true });

exports.colls = {};

exports.connect = (connectionReady) => {
    client.connect((err) => {
        if (err === null) {
            let db = client.db(dbConf.db);
            exports.colls.users = db.collection(dbConf.colls.users);
            exports.colls.sequences = db.collection(dbConf.colls.sequences);
            exports.colls.codemail = db.collection(dbConf.colls.codemail);
            exports.colls.courses = db.collection(dbConf.colls.courses);
            exports.colls.cupons = db.collection(dbConf.colls.cupons);
            connectionReady();
        } else {
            console.log('Failed to connect to the db');
            console.log(err.stack);
        }
    });
}

exports.disconnect = (disconnected) => {
    if (client !== null && client.isConnected()) {
        client.close(() => {
            if (disconnected !== undefined)
                disconnected();
        });
    }
}