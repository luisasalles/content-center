"use strict";

const model = require('../models/users-model.js');
const bcrypt = require('bcryptjs');

exports.addUser = (req, res) => {


    const saveUser = function(user) {
        model.UserDAO.insert(user, (status) => {
            if (status)
                res.render('login');
            else
                res.render('content-center');
        });
    };

    const hash = bcrypt.hashSync(req.body.password, 10);

    const user = new model.Users(
        req.body.name,
        req.body.email,
        hash
    );
    console.log(user);

    saveUser(user);

};